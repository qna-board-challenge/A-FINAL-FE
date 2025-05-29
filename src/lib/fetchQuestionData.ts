import axios from "axios";

const fetchQuestionData = async () => {
  try {
    const response = await axios.get(
      "http://3.27.167.79:8080/api/questions"
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error("error", error);
  }
};

export default fetchQuestionData;
