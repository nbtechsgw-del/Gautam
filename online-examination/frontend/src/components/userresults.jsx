import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./userresults.module.css";

function UserResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    console.log("starting fetching api");
    if (!userId) {
      console.error("UserId not found!");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(
        `http://localhost:8080/api/user/results/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResults(res.data);

    } catch (err) {
      console.error("Error fetching results:", err);
      setError("Failed to load results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchResults();
  };

  return (
    <div className={styles.resultContainer}>
      <h2>📊 My Exam Results</h2>

      <div className={styles.header}>
        <button 
          className={styles.backArrow} 
          onClick={() => navigate("/user")}
        >
          ← Dashboard
        </button>

        <button 
          className={styles.refreshBtn} 
          onClick={handleRefresh}
        >
          Refresh
        </button>
      </div>

      {/* ⏳ Loading */}
      {loading && <p>Loading results...</p>}

      {/* ❌ Error */}
      {error && <p className={styles.error}>{error}</p>}

      {/* 📭 Empty State */}
      {!loading && results.length === 0 && (
        <p>No results found</p>
      )}

      {/* 📋 Table */}
      {!loading && results.length > 0 && (
        <table className={styles.resultTable}>
          <thead>
            <tr>
              <th>Exam</th>
              <th>Score</th>
              <th>Total</th>
              <th>Percentage</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {results.map((r) => {
              const total = r.totalQuestions || 1;
              const percent = (r.score / total) * 100;

              return (
                <tr key={r.id}>
                  <td>{r.examTitle}</td>
                  <td>{r.score}</td>
                  <td>{total}</td>
                  <td>{percent.toFixed(2)}%</td>
                  <td>
                    <span
                      className={
                        percent >= 40
                          ? styles.pass
                          : styles.fail
                      }
                    >
                      {percent >= 40 ? "Pass" : "Fail"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserResults;