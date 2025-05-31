"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import QuestionDetail from "../components/QuestionDetail";
import CommentList from "../components/comment/CommentList";
import axios from "axios";

export default function DetailPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState<any>(null);
  const [comments, setComments] = useState([]);

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
      .catch((err) => {
        const errorMessage =
          err.response?.data?.message || "질문을 불러오는 데 실패했습니다.";
        alert(errorMessage);
        console.error(err);
      });
  };

  const fetchComments = () => {
    axios
      .get(`http://3.27.167.79:8080/api/questions/${id}/comments`)
      .then((res) => {
        const data = res.data.map((c: any) => ({
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
          updatedAt: question.updatedAt,
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
