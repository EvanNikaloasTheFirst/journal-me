"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Bookmark from "./Bookmark";

export default function BookmarkBlock() {
  const { data: session, status } = useSession();

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <div className="hidden md:absolute md:-top-3 md:left-6 md:right-6 md:flex md:items-center md:justify-between z-10">
        {/* Left bookmarks */}
        <div className="flex gap-2">
          <Bookmark label="Home" path="dashboard" color="bg-lime-100" />
          <Bookmark label="Habits" path="habits" />
          <Bookmark label="Goals" path="goals" color="bg-pink-300" />
          <Bookmark label="Journal" path="journal" color="bg-yellow-200" />
          {/* <Bookmark label="Settings" path="setting" color="bg-yellow-200" /> */}
        </div>

        {/* User */}
        {status === "authenticated" && (
          <div className="relative">
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="
                px-3 py-2
                bg-blue-200
                font-handwriting
                text-[11px]
                border border-black/40
                rounded-b-sm
                shadow-sm
              "
            >
              {"Log Out"}
            </button>
          </div>
        )}
      </div>

      {/* ================= MOBILE (SIDE TABS) ================= */}
      <div
        className="
          md:hidden
          fixed
          left-0
          top-1/2
          -translate-y-1/2
          flex
          flex-col
          gap-2
          z-20
        "
      >
        <RotatedBookmark label="Home" path="dashboard" color="bg-lime-100" />
        <RotatedBookmark label="Habits" path="habits" />
        <RotatedBookmark label="Goals" path="goals" color="bg-pink-300" />
        <RotatedBookmark label="Journal" path="journal" color="bg-yellow-200" />
        {/* <RotatedBookmark label="Settings" path="setting" color="bg-yellow-200" /> */}

        {status === "authenticated" && (
            <RotatedBookmark label="Logout" path="logout" color="bg-red-200" />

        )}
      </div>
    </>
  );
}


function RotatedBookmark({
  label,
  path,
  color,
}: {
  label: string;
  path: string;
  color?: string;
}) {
  return (
    <div className="origin-left -rotate-270 translate-x-[30px]">
      <Bookmark label={label} path={path} color={color} />
    </div>
  );
}
