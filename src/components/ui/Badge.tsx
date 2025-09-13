"use client";
import React from "react";

export function Badge({
  children,
  isDark,
}: {
  children: React.ReactNode;
  isDark: boolean;
}) {
  return (
    <span
      className={`rounded-full ring-1 px-3 py-1 text-sm ${
        isDark
          ? "ring-zinc-700 text-zinc-100 bg-zinc-900/60"
          : "ring-zinc-300 text-zinc-800 bg-zinc-50/60"
      }`}
    >
      {children}
    </span>
  );
}
