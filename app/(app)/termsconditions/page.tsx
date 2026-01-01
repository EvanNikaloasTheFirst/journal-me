"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function PrivacyPage() {
  const { status } = useSession();
  const router = useRouter();

  const handleBack = () => {
    if (status === "authenticated") {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* BACK BUTTON */}
      <button
        onClick={handleBack}
        className="
          mb-6
          text-[12px]
          font-handwriting
          px-3 py-1
          border border-black/40
          rounded-sm
          bg-[#fffdf5]
          shadow-[2px_3px_0_rgba(0,0,0,0.15)]
          hover:translate-y-[1px]
        "
      >
        ← Back
      </button>

      <h1 className="font-handwriting text-[22px] mb-6 border-b border-black/20 pb-2">
        Privacy & Your Data
      </h1>

      <p className="text-[13px] mb-6 opacity-80">
        This page explains what data we store, why we store it, and the rights
        you have over your data. We aim to keep things simple, transparent,
        and fully under your control.
      </p>

      {/* WHAT WE COLLECT */}
      <section className="mb-6">
        <h2 className="font-handwriting text-[16px] mb-2">
          What data we collect
        </h2>
        <ul className="text-[13px] list-disc pl-5 space-y-1 opacity-80">
          <li>Email address, name, and profile image from Google Sign-In</li>
          <li>Journals, habits, moments, and goals you create in the app</li>
          <li>Timestamps related to your activity (created / updated dates)</li>
        </ul>
      </section>

      {/* WHY */}
      <section className="mb-6">
        <h2 className="font-handwriting text-[16px] mb-2">
          Why we collect it
        </h2>
        <p className="text-[13px] opacity-80">
          Your data is used only to provide the core functionality of the app —
          such as saving your journals, tracking habits, and showing your
          progress over time. We do not sell or share your data.
        </p>
      </section>

      {/* WHAT WE DON'T DO */}
      <section className="mb-6">
        <h2 className="font-handwriting text-[16px] mb-2">
          What we do not do
        </h2>
        <ul className="text-[13px] list-disc pl-5 space-y-1 opacity-80">
          <li>We do not sell your data</li>
          <li>We do not use your data for advertising</li>
          <li>We do not track you across other websites</li>
          <li>We do not store passwords (Google handles authentication)</li>
        </ul>
      </section>

      {/* YOUR RIGHTS */}
      <section className="mb-6">
        <h2 className="font-handwriting text-[16px] mb-2">
          Your rights
        </h2>
        <ul className="text-[13px] list-disc pl-5 space-y-1 opacity-80">
          <li>Access your data at any time</li>
          <li>Delete your account and all associated data</li>
          <li>Stop using the app at any time</li>
        </ul>
      </section>

      {/* DELETION */}
      <section className="mb-6">
        <h2 className="font-handwriting text-[16px] mb-2">
          Deleting your account
        </h2>
        <p className="text-[13px] opacity-80">
          When you delete your account, all personal data associated with it —
          including journals, habits, moments, and goals — is permanently
          removed from our database.
        </p>

      </section>

      {/* CONTACT */}
      <section>
        <h2 className="font-handwriting text-[16px] mb-2">
          Questions
        </h2>
        <p className="text-[13px] opacity-80">
          If you have any questions about your data or privacy, you can contact
          us through the app or via the email associated with your account.
        </p>
        <p>evangeloscodes@gmail.com</p>
      </section>
    </div>
  );
}
