import EditDeleteButton from "./EditDeleteButton";

interface DetailType {
  question: {
    title: string;
    content: string;
    nickname: string;
    createdAt: string;
    updatedAt?: string;
  };
  questionId: string;
}

export default function QuestionDetail({ question, questionId }: DetailType) {
  return (
    <section className="mb-10 border-b pb-6">
      {/* 제목 */}
      <h2 className="text-lg font-semibold mb-1">
        <span className="font-bold">Q.</span> {question.title}
      </h2>

      {/* 작성자 정보 + 버튼을 한 줄로 */}
      <div className="flex justify-between items-center text-sm text-gray-500 border-b pb-2">
        <p>
          written by {question.nickname} at {question.createdAt}
          {question.updatedAt != null && (
            <span> | updated at {question.updatedAt}</span>
          )}
        </p>
        <div className="flex gap-2">
          <EditDeleteButton questionId={questionId} />
        </div>
      </div>

      {/* 본문 */}
      <p className="text-base leading-relaxed mt-8 mb-4 px-2 text-gray-800 whitespace-pre-wrap">
        {question.content}
      </p>
    </section>
  );
}
