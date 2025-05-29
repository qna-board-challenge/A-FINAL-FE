"use client";

import { useState } from "react";
import Question from "@/components/Question";
import Link from "next/link";

interface Question {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  commentCount: number;
}

export default function Main() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "comments">(
    "latest"
  );

  const questions: Question[] = [
    {
      id: 1,
      title: "Next.js에서 라우팅은 어떻게 처리하나요?",
      author: "홍길동",
      createdAt: "2025-05-28",
      commentCount: 3,
    },
    {
      id: 2,
      title: "React 상태 관리 도구 추천",
      author: "이몽룡",
      createdAt: "2025-05-27",
      commentCount: 5,
    },
  ];

  const filtered = questions
    .filter((q) => q.title.includes(search))
    .sort((a, b) =>
      sortBy === "latest"
        ? b.createdAt.localeCompare(a.createdAt)
        : b.commentCount - a.commentCount
    );

  return (
    <div className="max-w-[80%] mx-auto">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="제목 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <Link
          href="/ask"
          className="px-4 py-2 bg-gray-600 text-white rounded"
        >
          글쓰기
        </Link>
      </div>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setSortBy("latest")}
          className={`px-3 py-1 rounded ${
            sortBy === "latest"
              ? "bg-gray-600 text-white"
              : "bg-gray-200"
          }`}
        >
          최신순
        </button>
        <button
          onClick={() => setSortBy("comments")}
          className={`px-3 py-1 rounded ${
            sortBy === "comments"
              ? "bg-gray-600 text-white"
              : "bg-gray-200"
          }`}
        >
          댓글순
        </button>
      </div>

      <ul className="space-y-4">
        {filtered.map((q) => (
          <Question key={q.id} {...q} />
        ))}
      </ul>
    </div>
  );
}
