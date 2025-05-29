"use client";

import Link from "next/link";

interface Question {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  commentCount: number;
}

export default function Question({
  id,
  title,
  author,
  createdAt,
  commentCount,
}: Question) {
  return (
    <li className="flex flex-col p-4 border rounded shadow hover:bg-gray-50">
      <Link href={`/questions/${id}`}>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <div className="flex gap-2 text-sm text-gray-600">
          <span>{author}</span>
          <span>{createdAt}</span>
          <span className="flex-1 text-right">
            댓글 {commentCount}
          </span>
        </div>
      </Link>
    </li>
  );
}
