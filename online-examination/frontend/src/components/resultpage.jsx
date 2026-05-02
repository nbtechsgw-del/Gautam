import { useLocation, useNavigate } from "react-router-dom";
import styles from "./resultpage.module.css";

function ResultPage() {

  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state;

  if (!result) return <h2>No result data</h2>;

  return (
    <div className={styles.resultContainer}>
      <div className={styles.resultCard}>
        
        <button
          className={styles.backArrow}
          onClick={() => navigate("/admin")}
        >
          ←Dashboard
        </button>

        <h2>Exam Result</h2>

        <p><strong>Exam:</strong> {result.examTitle}</p>

        <p className={styles.score}>
          Score: {result.score}
        </p>

        <button
          className={styles.backBtn}
          onClick={() => navigate("/user/results")}
        >
          View All Results
        </button>

        <button
          className={styles.homeBtn}
          onClick={() => navigate("/user")}
        >
          Back
        </button>

      </div>
    </div>
  );
}

export default ResultPage;