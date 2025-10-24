"use client";

import { useSearchParams } from "next/navigation";

export default function FilePage() {
  const link = useSearchParams().get("link");
}
