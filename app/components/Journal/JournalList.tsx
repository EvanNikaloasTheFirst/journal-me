import { Journal } from "../Models/Journal";

type Props = {
  entries: Journal[];
  onDelete: (id: string) => void;
  onOpen: (entry: Journal) => void;
};

const MONTH_ORDER = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function JournalList({ entries, onDelete, onOpen }: Props) {
  
  const now = new Date();
  const currentYear = now.getFullYear().toString();
  const currentMonth = now.toLocaleString("default", { month: "long" });

  const grouped = entries.reduce<
    Record<string, Record<string, Journal[]>>
  >((acc, entry) => {
    const date = new Date(entry.createdAt);
    const year = date.getFullYear().toString();
    const month = date.toLocaleString("default", { month: "long" });

    acc[year] ??= {};
    acc[year][month] ??= [];
    acc[year][month].push(entry);

    return acc;
  }, {});

  const sortedYears = Object.keys(grouped).sort(
    (a, b) => Number(b) - Number(a)
  );




  return (
    <div className="rounded-sm p-2 space-y-3  mt-5 border border-black/30
          rounded-md
          shadow-[3px_4px_0px_rgba(0,0,0,0.15)]">
      <h3 className="font-handwriting text-[13px]">
        Past Entries
      </h3>

      {sortedYears.map((year) => {
        const months = Object.keys(grouped[year]).sort(
          (a, b) => MONTH_ORDER.indexOf(a) - MONTH_ORDER.indexOf(b)
        );

        const yearCount = months.reduce(
          (sum, m) => sum + grouped[year][m].length,
          0
        );

        return (
          <details
            key={year}
            open={year === currentYear}
            className="
               rounded-sm p-2
              bg-[linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)]
              bg-[size:100%_24px]
            "
          >
            <summary className="cursor-pointer text-[12px] opacity-80">
              {year} · {yearCount} entries
            </summary>

            <div className="mt-2 space-y-2">
              {months.map((month) => (
                <details
                  key={month}
                  open={year === currentYear && month === currentMonth}
                  className="
                    border border-black/10 rounded-sm p-2
                    bg-[linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)]
                    bg-[size:100%_22px]
                  "
                >
                  <summary className="cursor-pointer text-[11px] opacity-70">
                    {month} · {grouped[year][month].length}
                  </summary>

                  <div className="mt-2 space-y-2">
                    {grouped[year][month].map((entry) => (
                    <div
  key={entry._id}
  onClick={() => onOpen(entry)}
  className="
    cursor-pointer
    border border-black/10 rounded-sm p-2
    hover:bg-black/5
    transition
    bg-[linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)]
    bg-[size:100%_20px]
  "
>

                         <p className="text-[12px] whitespace-pre-wrap">
                    {entry.title.length > 40
                      ? entry.title.slice(0, 40) + "…"
                      : entry.title}
                  </p>
                       <p className="text-[12px] whitespace-pre-wrap">
                    {entry.text.length > 40
                      ? entry.text.slice(0,40) + "…"
                      : entry.text}
                  </p>


                        <div className="flex justify-between items-center mt-1">
                          <span className="text-[9px] opacity-50">
                            {new Date(entry.createdAt).toLocaleString()}
                          </span>

                          <button
                            onClick={() => onDelete(entry._id)}
                            className="text-[10px] underline opacity-70"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </details>
        );
      })}
    </div>
  );
}
