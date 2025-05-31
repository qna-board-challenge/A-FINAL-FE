"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import QuestionDetail from "../components/QuestionDetail";
import CommentList from "../components/comment/CommentList";
import axios from "axios";

type Question = {
  id: number;
  title: string;
  content: string;
  nickname: string;
  createdAt: string;
  updatedAt: string | null;
};

type Comment = {
  id: number;
  content: string;
  nickname: string;
  created: string;
  updated?: string;
};

export default function DetailPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState<Question | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchQuestionDetail = () => {
    axios
      .get(`http://3.27.167.79:8080/api/questions/${id}`)
      .then((res) => {
        const {
          title,
          content,
          nickname,
          created,
          updated,
          id: qid,
        } = res.data;

        setQuestion({
          title,
          content,
          nickname,
          createdAt: created.slice(0, 10),
          updatedAt: updated ? updated.slice(0, 10) : null,
          id: qid,
        });
      })
      .catch((err: unknown) => {
        console.error(err);
        if (axios.isAxiosError(err)) {
          const errorMessage =
            err.response?.data?.message || "질문을 불러오는 데 실패했습니다.";
          alert(errorMessage);
        } else if (err instanceof Error) {
          alert(err.message);
        } else {
          alert("알 수 없는 에러가 발생했습니다.");
        }
      });
  };

  const fetchComments = () => {
    axios
      .get(`http://3.27.167.79:8080/api/questions/${id}/comments`)
      .then((res) => {
        const data: Comment[] = res.data.map((c: Comment) => ({
          ...c,
          created: c.created.slice(0, 10),
          updated: c.updated?.slice(0, 10),
        }));
        setComments(data);
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.message || "댓글을 불러오는 데 실패했습니다.";
        alert(errorMessage);
        console.error(err);
      });
  };

  useEffect(() => {
    if (id) {
      fetchQuestionDetail();
      fetchComments();
    }
  }, [id]);

  if (!question) return <p className="text-center mt-10">로딩 중...</p>;

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <QuestionDetail
        question={{
          title: question.title,
          content: question.content,
          nickname: question.nickname,
          createdAt: question.createdAt,
          updatedAt: question.updatedAt ?? "", // null이면 빈 문자열로 대체
        }}
        questionId={question.id.toString()}
      />
      <CommentList
        comments={comments}
        questionId={question.id.toString()}
        onRefresh={fetchComments}
      />
    </main>
  );
}
