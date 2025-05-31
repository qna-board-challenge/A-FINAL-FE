"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import React from "react";

interface FormType {
  title: string;
  nickname: string;
  password: string;
  content: string;
}

export default function Write() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [form, setForm] = useState<FormType>({
    title: "",
    nickname: "",
    password: "",
    content: "",
  });

  useEffect(() => {
    if (id) {
      // 수정 모드 → 데이터 불러오기
      axios
        .get(`http://3.27.167.79:8080/api/questions/${id}`)
        .then((res) => {
          const { title, nickname, content } = res.data;
          setForm({
            title,
            nickname,
            password: "",
            content,
          });
        })
        .catch(() => {
          alert("기존 글 정보를 불러오지 못했습니다.");
        });
    } else {
      //수정 상태에서 사이드바 작성 질문 등록으로 넘어가면 form 초기화 추가
      setForm({
        title: "",
        nickname: "",
        password: "",
        content: "",
      });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("전송 데이터:", form);

    try {
      if (id) {
        await axios.put(`http://3.27.167.79:8080/api/questions/${id}`, form);
        alert("수정 완료!");
        router.push(`/detail/${id}`); // 수정 → 해당 글로 이동
      } else {
        await axios.post("http://3.27.167.79:8080/api/questions", form);
        alert("작성 완료!");
        router.push("/main"); // 작성 → 메인 목록으로 이동
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.message ||
          (id
            ? "수정에 실패하였습니다. 다시 시도해주세요."
            : "작성에 실패하였습니다. 다시 시도해주세요.");
        alert(errorMessage);
      } else if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("알 수 없는 에러가 발생했습니다.");
      }
    }
  };

  return (
    <main className="min-h-screen p-10 w-full max-w-2xl mx-auto bg-white">
      <h1 className="text-3xl font-semibold mb-8">
        {id ? "Edit Your Question" : "Ask a Question"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="제목을 작성하세요."
          className="w-full border-b border-gray-400 px-4 py-3 focus:outline-none"
          required
        />

        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="내용을 입력하세요."
          rows={10}
          className="w-full border border-gray-400 px-4 py-3 rounded-md resize-none focus:outline-none"
          required
        />

        <div className="space-y-3">
          {!id ? (
            <input
              name="nickname"
              value={form.nickname}
              onChange={handleChange}
              placeholder="닉네임"
              className="block w-1/3 border border-gray-400 px-4 py-3 rounded-md focus:outline-none"
              required
            />
          ) : (
            <input
              name="nickname"
              value={form.nickname}
              readOnly
              className="block w-1/3 border border-gray-300 px-4 py-3 rounded-md bg-gray-100 text-gray-500 focus:outline-none"
            />
          )}

          {/* password + button 한 줄 정렬을 위해 한번 더 감싸줌 */}
          <div className="flex items-center justify-between w-full gap-4">
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="비밀번호"
              className="w-1/3 border border-gray-400 px-4 py-3 rounded-md focus:outline-none"
              required
            />

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-5 py-3 bg-sky-300 text-black rounded hover:bg-sky-500 h-full"
              >
                {id ? "UPDATE" : "POST"}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (id) {
                    router.push(`/detail/${id}`);
                  } else {
                    router.push("/main");
                  }
                }}
                className="px-5 py-3 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 h-full"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
