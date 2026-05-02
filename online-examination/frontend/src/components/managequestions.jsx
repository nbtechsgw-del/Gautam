import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./managequestions.module.css";
import { useNavigate } from "react-router-dom";

function ManageQuestions() {
  const navigate = useNavigate();
  const [questionData, setQuestionData] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "A"
  });

  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/questions", {
        headers: { Authorization: `Bearer ${token}` }
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
    setQuestionData({ ...questionData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/admin/questions", questionData, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
      });
      setMessage("Question added successfully ✅");
      setQuestionData({
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "A"
      });
      fetchQuestions();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Error adding question ❌");
    }
  };

  const deleteQuestion = async (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await axios.delete(`http://localhost:8080/api/admin/questions/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchQuestions();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className={styles.managePage}>
      <header className={styles.manageHeader}>
        <div className={styles.headerLeft}>
          <button
            className={styles.backBtn}
            onClick={() => navigate("/admin")}
          >
            ← Dashboard
          </button>
          <h1>Question Bank</h1>
        </div>

        <div className={styles.statsBadge}>
          Total Questions: {questions.length}
        </div>
      </header>

      <div className={styles.manageGrid}>
        {/* LEFT COLUMN */}
        <section className={styles.formCard}>
          <h3>Create New Question</h3>

          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>Question Prompt</label>
              <textarea
                name="question"
                placeholder="What is the capital of..."
                value={questionData.question}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.optionsGrid}>
              {["A", "B", "C", "D"].map((opt) => (
                <div className={styles.inputGroup} key={opt}>
                  <label>Option {opt}</label>
                  <input
                    name={`option${opt}`}
                    value={questionData[`option${opt}`]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
            </div>

            <div className={styles.answerSelection}>
              <label>Correct Answer</label>

              <div className={styles.radioGroup}>
                {["A", "B", "C", "D"].map((val) => (
                  <label
                    key={val}
                    className={`${styles.radioLabel} ${
                      questionData.correctAnswer === val
                        ? styles.active
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="correctAnswer"
                      value={val}
                      checked={questionData.correctAnswer === val}
                      onChange={handleChange}
                    />
                    {val}
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Add to Database
            </button>
          </form>

          {message && (
            <div
              className={`${styles.toast} ${
                message.includes("Error")
                  ? styles.error
                  : styles.success
              }`}
            >
              {message}
            </div>
          )}
        </section>

        {/* RIGHT COLUMN */}
        <section className={styles.listCard}>
          <h3>Existing Questions</h3>

          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>Question</th>
                  <th className={styles.center}>Ans</th>
                  <th className={styles.center}>Action</th>
                </tr>
              </thead>

              <tbody>
                {questions.map((q) => (
                  <tr key={q.id}>
                    <td className={styles.qText}>{q.question}</td>

                    <td className={styles.center}>
                      <span className={styles.ansPill}>
                        {q.correctAnswer}
                      </span>
                    </td>

                    <td className={styles.center}>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => deleteQuestion(q.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ManageQuestions;