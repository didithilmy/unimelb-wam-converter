"use client";

import dynamic from "next/dynamic";
import React, { useMemo } from "react";

const PdfDocument = dynamic(() => import("@/components/PdfDocument"), {
  ssr: false,
});

export default function CreatePdf() {
  const terms = useMemo(() => {
    try {
      const jsonStr = localStorage.getItem("data") ?? "[]";
      return JSON.parse(jsonStr);
    } catch {
      return [];
    }
  }, []);

  return <PdfDocument terms={terms} />;
}
