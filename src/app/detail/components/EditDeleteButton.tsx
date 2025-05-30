import { useState } from "react";
import { useRouter } from "next/navigation";
import PasswordModal from "./PasswordModal";
import axios from "axios";

export default function EditDeleteButton({
  questionId,
}: {
  questionId: string;
}) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (password: string) => {
    axios
      .delete(
        `http://3.27.167.79:8080/api/questions/${questionId}?password=${password}`
      )
      .then(() => {
        alert("삭제 완료!");
        router.push("/");
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.message ||
          "삭제에 실패했습니다. 다시 시도해주세요.";
        alert(errorMessage);
        console.error(err);
      });
  };

  return (
    <>
      <button
        className="px-4 py-1 text-sm bg-gray-200 text-black rounded hover:bg-gray-600 hover:text-white"
        onClick={() => router.push(`/write?id=${questionId}`)}
      >
        수정
      </button>
      <button
        className="px-4 py-1 text-sm bg-red-300 text-black rounded hover:bg-red-500 "
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
