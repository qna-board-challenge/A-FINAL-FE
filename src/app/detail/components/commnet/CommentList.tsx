import CommentItem from "./CommentItem";
import axios from "axios";
import { useState, useEffect } from "react";

interface Comment {
  id: number;
  content: string;
  nickname: string;
  created: string;
  updated?: string | null;
}

export default function CommentList({ questionId }: { questionId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = () => {
    axios
      .get(`http://3.27.167.79:8080/api/questions/${questionId}/comments`)
      .then((res) => {
        const data = res.data.map((c: any) => ({
          ...c,
          created: c.created.slice(0, 10),
          updated: c.updated?.slice(0, 10),
        }));
        setComments(data);
      });
  };

  useEffect(() => {
    fetchComments();
  }, [questionId]);

  return (
    <section className="mt-10">
      <h3 className="text-lg font-semibold mb-4">답변 {comments.length}개</h3>
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            questionId={questionId}
            onRefresh={fetchComments} //리스트 리렌더링용 콜백 전달
          />
        ))}
      </div>
    </section>
  );
}
