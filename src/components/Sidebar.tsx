"use client";
import Link from "next/link";

export default function SideBar() {
  return (
    <nav className="p-4">
      <ul className="flex flex-col gap-3">
        <li>
          <Link href="/main" className="block hover:underline">
            메인
          </Link>
        </li>
        <li>
          <Link href="/write" className="block hover:underline">
            질문 등록
          </Link>
        </li>
      </ul>
    </nav>
  );
}
