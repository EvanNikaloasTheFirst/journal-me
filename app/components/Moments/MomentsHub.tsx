"use client";

import { useEffect, useState } from "react";
import { fetchMoments, deleteMoment } from "@/lib/Moments/moment";
import { Moment } from "@/app/components/Models/Moment";
import { groupMomentsByYearMonth } from "@/lib/Moments/moment";

const monthNames = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function MomentsHub() {
  const [moments, setMoments] = useState<Moment[]>([]);
  const [openYears, setOpenYears] = useState<Record<string, boolean>>({});
  const [openMonths, setOpenMonths] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchMoments().then(setMoments);
  }, []);

  const grouped = groupMomentsByYearMonth(moments);

  const toggleYear = (year: string) => {
    setOpenYears((prev) => ({ ...prev, [year]: !prev[year] }));
  };

  const toggleMonth = (year: string, month: string) => {
    const key = `${year}-${month}`;
    setOpenMonths((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Delete this moment? This cannot be undone."
    );

    if (!confirmed) return;

    // Optimistic update
    setMoments((prev) => prev.filter((m) => m._id !== id));

    try {
      await deleteMoment(id);
    } catch (err) {
      alert("Failed to delete moment.");
      // rollback if needed
      fetchMoments().then(setMoments);
    }
  };

  return (
    <div className="space-y-4">
      {Object.entries(grouped)
        .sort(([a], [b]) => Number(b) - Number(a))
        .map(([year, months]) => (
          <div
            key={year}
            className="border border-black/20 rounded-md bg-[#faf9f7]"
          >
            {/* YEAR HEADER */}
            <button
              onClick={() => toggleYear(year)}
              className="w-full flex justify-between items-center px-4 py-3 font-handwriting text-[18px] hover:bg-black/5"
            >
              {year}
              <span className="text-xs opacity-60">
                {openYears[year] ? "–" : "+"}
              </span>
            </button>

            {openYears[year] && (
              <div className="px-4 pb-4 space-y-3">
                {Object.entries(months)
                  .sort(([a], [b]) => Number(b) - Number(a))
                  .map(([month, items]) => {
                    const monthKey = `${year}-${month}`;
                    return (
                      <div key={monthKey}>
                        {/* MONTH HEADER */}
                        <button
                          onClick={() => toggleMonth(year, month)}
                          className="w-full flex justify-between items-center text-sm uppercase tracking-wide opacity-70 py-2"
                        >
                          {monthNames[Number(month)]}
                          <span>
                            {openMonths[monthKey] ? "–" : "+"}
                          </span>
                        </button>

                        {openMonths[monthKey] && (
                          <div className="ml-3 space-y-2">
                            {items
                              .sort((a, b) => b.day - a.day)
                              .map((moment) => (
                                <div
                                  key={moment._id}
                                  className="flex justify-between items-start bg-[#fdfcf9] border border-black/20 rounded-md px-3 py-2 text-sm"
                                >
                                  <div>
                                    <span className="opacity-50 mr-2">
                                      {moment.day}.
                                    </span>
                                    {moment.text}
                                  </div>

                                  {/* DELETE */}
                                  <button
                                    onClick={() =>
                                      handleDelete(moment._id)
                                    }
                                    className="text-xs opacity-40 hover:opacity-80 ml-3"
                                    title="Delete moment"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
