"use client";

import Link from "next/link";

interface Question {
  id: number;
  title: string;
  nickname: string;
  created: string;
  content: string;
  answerCount: number;
}

export default function Question({
  id,
  title,
  nickname,
  created,
  content,
  answerCount,
}: Question) {
  return (
    <li className="flex flex-col p-4 border rounded shadow hover:bg-gray-50">
      <Link href={`/questions/${id}`}>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <div className="flex gap-2 text-sm text-gray-600">
          <span>{nickname}</span>
          <span>{created}</span>
          <span className="flex-1 text-right">
            댓글 {answerCount}
          </span>
        </div>
      </Link>
    </li>
  );
}
