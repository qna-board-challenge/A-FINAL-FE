"use client";

import { useState } from "react";
import CommentItem from "./CommentItem";
import CommentModal from "./CommentModal"; // 작성, 수정 합친 모달

interface Comment {
  id: number;
  content: string;
  nickname: string;
  created: string;
  updated?: string | null;
}

interface Props {
  comments: Comment[];
  questionId: string;
  onRefresh: () => void;
}

export default function CommentList({
  comments,
  questionId,
  onRefresh,
}: Props) {
  const [showWriteModal, setShowWriteModal] = useState(false); // 모달 여닫는 state

  return (
    <section className="mt-10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">답변 {comments.length}개</h3>
        <button
          onClick={() => setShowWriteModal(true)}
          className="px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          답변 등록
        </button>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            questionId={questionId}
            onRefresh={onRefresh}
          />
        ))}
      </div>

      {showWriteModal && (
        <CommentModal
          mode="write"
          questionId={questionId}
          onClose={() => setShowWriteModal(false)}
          onSubmitSuccess={() => {
            setShowWriteModal(false);
            onRefresh();
          }}
        />
      )}
    </section>
  );
}
