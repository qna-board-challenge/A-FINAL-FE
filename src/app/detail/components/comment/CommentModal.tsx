"use client";

import { useState } from "react";
import axios from "axios";

interface Props {
  mode: "write" | "edit";
  questionId: string;
  commentId?: string;
  defaultNickname?: string;
  defaultContent?: string;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

export default function CommentModal({
  mode,
  questionId,
  commentId,
  defaultNickname = "",
  defaultContent = "",
  onClose,
  onSubmitSuccess,
}: Props) {
  const [form, setForm] = useState({
    nickname: defaultNickname,
    password: "",
    content: defaultContent,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("전송 데이터:", form);

    try {
      //모드로 작성, 수정 구분
      if (mode === "edit") {
        await axios.put(
          `http://3.27.167.79:8080/api/questions/${questionId}/comments/${commentId}`,
          form
        );
        alert("수정 완료!");
        onSubmitSuccess();
        onClose();
      } else {
        await axios.post(
          `http://3.27.167.79:8080/api/questions/${questionId}/comments`,
          form
        );
        alert("등록 완료!");
        onSubmitSuccess();
        onClose();
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        (mode === "edit"
          ? "수정에 실패하였습니다. 다시 시도해주세요."
          : "등록에 실패하였습니다. 다시 시도해주세요.");
      alert(errorMessage);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">
          {mode === "edit" ? "답변 수정" : "답변 등록"}
        </h3>
        <form onSubmit={handleSubmit}>
          <textarea
            name="content"
            placeholder="답변 내용을 입력하세요."
            rows={4}
            value={form.content}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded mb-3"
            required
          />
          <div className="flex gap-3 mb-3">
            <input
              name="nickname"
              placeholder="닉네임"
              value={form.nickname}
              onChange={handleChange}
              readOnly={mode === "edit"}
              className={`w-1/2 border px-3 py-2 rounded ${
                mode === "edit" ? "bg-gray-100 text-gray-500" : ""
              }`}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="비밀번호"
              value={form.password}
              onChange={handleChange}
              className="w-1/2 border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-500 text-white"
            >
              {mode === "edit" ? "수정" : "등록"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
