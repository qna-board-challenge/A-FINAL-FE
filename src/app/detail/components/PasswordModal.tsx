// components/Detail/PasswordModal.tsx
import { useState } from "react";

export default function PasswordModal({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: (password: string) => void;
}) {
  const [password, setPassword] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg space-y-4 w-80">
        <h2 className="text-lg font-semibold">비밀번호를 입력하세요</h2>
        <input
          type="password"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            취소
          </button>
          <button
            onClick={() => onConfirm(password)}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
