// src/components/Header.tsx

import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full px-6 py-4 bg-white shadow-md flex justify-center items-center overflow-x-auto">
      <Link
        href="/main"
        className="text-2xl font-bold text-gray-700"
      >
        QnA Board
      </Link>
    </header>
  );
}
