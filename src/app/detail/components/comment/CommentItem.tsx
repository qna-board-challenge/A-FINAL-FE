"use client";

import { useState } from "react";
import CommentEditDeleteButton from "./CommentEditButton";
import CommentModal from "./CommentModal";

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
  const [showEditModal, setShowEditModal] = useState(false); //수정 모달 여닫는 state

  return (
    <div className="p-4 border rounded bg-white shadow-sm">
      <p className="font-bold mb-1">A.</p>
      <p className="text-sm text-gray-500 mb-2">
        written by {comment.nickname} at {comment.created}
        {comment.updated != null && ` | updated at ${comment.updated}`}
      </p>
      <p className="whitespace-pre-wrap text-gray-800 mb-2">
        {comment.content}
      </p>

      <div className="flex justify-end">
        <CommentEditDeleteButton
          questionId={questionId}
          commentId={comment.id.toString()}
          onAfterDelete={onRefresh}
          onEdit={() => setShowEditModal(true)}
        />
      </div>

      {/* 수정 모달 */}
      {showEditModal && (
        <CommentModal
          mode="edit"
          questionId={questionId}
          commentId={comment.id.toString()}
          defaultNickname={comment.nickname}
          defaultContent={comment.content}
          onClose={() => setShowEditModal(false)}
          onSubmitSuccess={() => {
            setShowEditModal(false);
            onRefresh();
          }}
        />
      )}
    </div>
  );
}
