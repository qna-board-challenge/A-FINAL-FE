import { Suspense } from "react";
import WriteForm from "./components/WriteForm";

export default function Page() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <WriteForm />
    </Suspense>
  );
}
