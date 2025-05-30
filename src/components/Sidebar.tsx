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
          <Link href="" className="block hover:underline">
            질문 등록
          </Link>
        </li>
        <li>
          <Link
            href="/mypage"
            className="block hover:underline"
            onClick={() => alert("마이페이지")}
          >
            마이페이지
          </Link>
        </li>
      </ul>
    </nav>
  );
}
