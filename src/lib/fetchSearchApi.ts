import axios from "axios";

interface Question {
  id: number;
  title: string;
  nickname: string;
  created: string;
  content: string;
  answerCount: number;
}

const fetchSearchApi = async (
  title: string
): Promise<Question[] | null> => {
  try {
    const response = await axios.get(
      "https://3.27.167.79:8080/api/questions",
      {
        params: {
          keyword: title,
        },
      }
    );
    const data: Question[] = response.data;
    return data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};

export default fetchSearchApi;
