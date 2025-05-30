import { useState } from "react";
import PasswordModal from "../PasswordModal";
import axios from "axios";

interface Props {
  questionId: string;
  commentId: string;
  onAfterDelete?: () => void; //삭제 후 콜백 (댓글 리스트 새로고침)
  onEdit?: () => void;
}

export default function CommentEditButton({
  questionId,
  commentId,
  onAfterDelete,
  onEdit,
}: Props) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (password: string) => {
    axios
      .delete(
        `http://3.27.167.79:8080/api/questions/${questionId}/comments/${commentId}?password=${password}`
      )
      .then(() => {
        alert("답변이 삭제되었습니다.");
        onAfterDelete?.(); // 필요시 콜백 실행
      })
      .catch((err) => {
        const message =
          err.response?.data?.message ||
          "답변 삭제에 실패했습니다. 다시 시도해주세요.";
        alert(message);
        console.error(err);
      });
  };

  return (
    <>
      <button
        className="px-3 py-1 text-xs bg-sky-200 text-black rounded hover:bg-sky-400"
        onClick={onEdit}
      >
        수정
      </button>
      <button
        className="px-3 py-1 text-xs bg-red-200 text-black rounded hover:bg-red-400"
        onClick={() => setShowModal(true)}
      >
        삭제
      </button>

      {showModal && (
        <PasswordModal
          onClose={() => setShowModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}
