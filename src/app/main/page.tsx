"use client";

import { useEffect, useState } from "react";
import Question from "@/components/Question";
import Link from "next/link";
import fetchQuestionData from "@/lib/fetchQuestionData";

interface Question {
  id: number;
  title: string;
  nickname: string;
  created: string;
  content: string;
  answerCount: number;
}

export default function Main() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "comments">(
    "latest"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [questionList, setQuestionList] = useState<Question[]>(
    []
  );
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      let data = await fetchQuestionData();
      data = data.map((q: Question) => ({
        // 날짜 형식 변경
        ...q,
        created: q.created.split("T")[0],
      }));
      setQuestionList(data);
    };
    fetchData();
  }, []);

  // 검색어에 따라 필터링 및 정렬
  const filtered = questionList
    .filter((q) => q.title.includes(search)) // 제목에 검색어 포함 여부 확인
    .sort(
      (a, b) =>
        sortBy === "latest"
          ? b.created.localeCompare(a.created) // 최신순으로 정렬
          : b.answerCount - a.answerCount // 댓글순으로 정렬
    );

  // 총 페이지 수 계산
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  // 현재 페이지에 해당하는 데이터 추출
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 페이지 변경 핸들러 함수
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="max-w-[80%] mx-auto">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="제목 검색"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // 검색 시 1페이지로 초기화
          }}
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
          onClick={() => {
            setSortBy("latest");
            setCurrentPage(1); // 정렬 변경 시 1페이지로 초기화
          }}
          className={`px-3 py-1 rounded ${
            sortBy === "latest"
              ? "bg-gray-600 text-white"
              : "bg-gray-200"
          }`}
        >
          최신순
        </button>
        <button
          onClick={() => {
            setSortBy("comments");
            setCurrentPage(1); // 정렬 변경 시 1페이지로 초기화
          }}
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
        {paginated.map((q) => (
          <Question key={q.id} {...q} />
        ))}
      </ul>

      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          이전
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-gray-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          다음
        </button>
      </div>
    </div>
  );
}
