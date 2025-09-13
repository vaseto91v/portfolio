"use client";
import React from "react";

export function SectionTitle({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <h2 id={id} className="text-xl md:text-2xl font-semibold tracking-tight">
      {children}
    </h2>
  );
}
