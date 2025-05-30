"use client";

import { useState } from "react";
import CommentEditDeleteButton from "./CommentEditButton";
import CommentEditModal from "./CommentEditModal";

interface Props {
  questionId: string;
  comment: {
    id: number;
    content: string;
    nickname: string;
    created: string;
    updated?: string | null;
  };
  onRefresh: () => void; //수정 및 삭제 후 댓글 목록 새로고침용
}

export default function CommentItem({ comment, questionId, onRefresh }: Props) {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div className="p-4 border rounded bg-white shadow-sm">
      <p className="font-bold mb-1">A.</p>
      <p className="text-sm text-gray-500 mb-2">
        written by {comment.nickname} at {comment.created}
        {comment.updated && ` | updated at ${comment.updated}`}
      </p>
      <p className="whitespace-pre-wrap text-gray-800 mb-2">
        {comment.content}
      </p>

      <div className="flex justify-end">
        <CommentEditDeleteButton
          questionId={questionId}
          commentId={comment.id.toString()}
          onAfterDelete={onRefresh}
          onEdit={() => setShowEditModal(true)} //수정 모달 열기
        />
      </div>

      {/* 수정 모달 */}
      {showEditModal && (
        <CommentEditModal
          questionId={questionId}
          commentId={comment.id.toString()}
          originalContent={comment.content}
          onClose={() => setShowEditModal(false)}
          onUpdate={() => {
            setShowEditModal(false);
            onRefresh(); // 수정 후 목록 리렌더링
          }}
        />
      )}
    </div>
  );
}
