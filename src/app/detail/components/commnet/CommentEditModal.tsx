"use client";

import { useState } from "react";
import axios from "axios";

interface Props {
  questionId: string;
  commentId: string;
  originalContent: string;
  onClose: () => void;
  onUpdate: () => void;
}

export default function CommentEditModal({
  questionId,
  commentId,
  originalContent,
  onClose,
  onUpdate,
}: Props) {
  const [content, setContent] = useState(originalContent);
  const [password, setPassword] = useState("");

  const handleUpdate = () => {
    axios
      .put(
        `http://3.27.167.79:8080/api/questions/${questionId}/comments/${commentId}`,
        {
          content,
          password,
        }
      )
      .then(() => {
        alert("수정 완료!");
        onUpdate();
      })
      .catch((err) => {
        const message =
          err.response?.data?.message ||
          "수정에 실패했습니다. 다시 시도해주세요.";
        alert(message);
        console.error(err);
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">답변 수정</h3>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full border px-3 py-2 rounded mb-3"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-3"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300">
            취소
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 rounded bg-blue-500 text-white"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
