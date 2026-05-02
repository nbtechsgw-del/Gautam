import { useEffect, useState } from "react";
import axios from "axios";
// 1. Updated import to use CSS Modules
import styles from "./createexam.module.css";
import { useNavigate } from "react-router-dom";

function CreateExam() {
  const [examData, setExamData] = useState({
    title: "",
    duration: ""
  });

  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/questions", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setQuestions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleChange = (e) => {
    setExamData({
      ...examData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckbox = (id) => {
    if (selectedQuestions.includes(id)) {
      setSelectedQuestions(selectedQuestions.filter(q => q !== id));
    } else {
      setSelectedQuestions([...selectedQuestions, id]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: examData.title,
      duration: parseInt(examData.duration),
      questionIds: selectedQuestions
    };

    try {
      await axios.post(
        "http://localhost:8080/api/admin/exams",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage("Exam created successfully ✅");
      setExamData({ title: "", duration: "" });
      setSelectedQuestions([]);
      navigate("/admin");
    } catch (err) {
      setMessage("Error creating exam ❌");
    }
  };

  return (
    // 2. Updated classNames to use styles object
    <div className={styles["exam-container"]}>
      <h2>Create Exam</h2>
      <button onClick={() => navigate("/admin")}>Back to Admin Panel</button>

      <form onSubmit={handleSubmit} className={styles["exam-form1"]}>
        <input
          name="title"
          type="text"
          placeholder="Exam Title"
          value={examData.title}
          onChange={handleChange}
          required
        />

        <input
          name="duration"
          type="number"
          placeholder="Duration (minutes)"
          value={examData.duration}
          onChange={handleChange}
          required
        />

        <h3>Select Questions</h3>

        <div className={styles["question-list"]}>
          {questions.map((q) => (
            <div key={q.id} className={styles["question-item"]}>
              <input
                type="checkbox"
                checked={selectedQuestions.includes(q.id)}
                onChange={() => handleCheckbox(q.id)}
              />
              <span>{q.question}</span>
            </div>
          ))}
        </div>

        <button type="submit">Create Exam</button>
      </form>

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}

export default CreateExam;