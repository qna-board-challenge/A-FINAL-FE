"use client";

import axios from "axios";
import { useEffect } from "react";

export default function Question() {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/questions"
      );
      console.log("응답 데이터", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div>글1</div>
      <div>글2</div>
      <div>글3</div>
      <div>글4</div>
    </div>
  );
}
