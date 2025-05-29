"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DetailRootPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/"); // 또는 /list, /questions 등
  }, [router]);

  return null;
}
