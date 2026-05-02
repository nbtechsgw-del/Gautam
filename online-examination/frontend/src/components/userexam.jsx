import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./userexam.module.css";

function UserExams() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/user/exams", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setExams(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.examContainer}>
      {/* --- NEW NAVIGATION HEADER --- */}
      <div className={styles.topNav}>
        <button 
          className={styles.backBtn} 
          onClick={() => navigate("/user")}
        >
          ← Back to Dashboard
        </button>
      </div>

      <h2 className={styles.examTitle}>📚 Available Exams</h2>

      <div className={styles.examGrid}>
        {exams.length > 0 ? (
          exams.map((exam) => (
            <div className={styles.examCard} key={exam.id}>
              <div className={styles.cardHeader}>
                <span className={styles.qCount}>{exam.questions?.length || 0} Questions</span>
              </div>
              <h3>{exam.title}</h3>
              <p>Test your knowledge and improve your score</p>

              <button
                className={styles.startBtn}
                onClick={() => navigate(`/exam/${exam.id}`)}
              >
                Start Exam
              </button>
            </div>
          ))
        ) : (
          <div className={styles.noExamBox}>
            <p className={styles.noExam}>No exams available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserExams;