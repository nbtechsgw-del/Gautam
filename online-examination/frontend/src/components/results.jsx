import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./results.module.css";
import { useNavigate } from "react-router-dom";

function Results() {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchResults = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/results", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div className={styles.adminWrapper}>
      <div className={`${styles.glassContainer} ${styles.wider}`}>
        
        <header className={styles.glassHeader}>
          <button 
            className={styles.backArrow} 
            onClick={() => navigate("/admin")}
          >
            ←
          </button>

          <div className={styles.logoSection}>
            <h1>Exam<span>Results</span></h1>
          </div>

          <div className={styles.searchPill}>
            <span className={styles.searchIcon}>🔍</span>
            <input type="text" placeholder="Search by student or exam..." />
          </div>
        </header>

        <main className={styles.resultsContent}>
          <div className={styles.tableHeaderInfo}>
            <p>Showing {results.length} total entries</p>
          </div>

          <div className={styles.glassTableWrapper}>
            <table className={styles.glassTable}>
              
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Student Name</th>
                  <th>Exam Title</th>
                  <th className={styles.center}>Score</th>
                  <th className={styles.center}>Status</th>
                </tr>
              </thead>

              <tbody>
                {results.length > 0 ? (
                  results.map((r, index) => (
                    <tr key={index} className={styles.glassTr}>
                      
                      <td className={styles.rankCell}>
                        #{index + 1}
                      </td>

                      <td className={styles.userCell}>
                        <div className={styles.avatarMini}>
                          {r.userName.charAt(0)}
                        </div>
                        {r.userName}
                      </td>

                      <td className={styles.examCell}>
                        {r.examTitle}
                      </td>

                      <td className={`${styles.scoreCell} ${styles.center}`}>
                        <span className={styles.scoreValue}>
                          {r.score}
                        </span>
                      </td>

                      <td className={styles.center}>
                        <div
                          className={`${styles.statusIndicator} ${
                            r.score >= 50 ? styles.pass : styles.fail
                          }`}
                        >
                          {r.score >= 50 ? "Qualified" : "Below Avg"}
                        </div>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className={styles.emptyState}>
                      No results found yet.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </main>

      </div>
    </div>
  );
}

export default Results;