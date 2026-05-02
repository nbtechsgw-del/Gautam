import styles from "./userdashboard.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalExams: 0,
    completedExams: 0,
    avgScore: 0
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    fetchUser();
    fetchStats();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
    } catch (err) {
      console.error("User fetch error:", err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/users/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(res.data);
    } catch (err) {
      console.error("Stats fetch error:", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className={styles.adminWrapper}>
      <div className={styles.glassContainer}>
        
        <header className={styles.glassHeader}>
          <div className={styles.logoSection}>
            <div className={`${styles.logoDot} ${styles.studentDot}`}></div>
            <h1>Student<span>Portal</span></h1>
          </div>

          <button className={styles.logoutGlass} onClick={handleLogout}>
            Logout
          </button>
        </header>

        <div className={styles.dashboardGrid}>

          {/* Sidebar */}
          <aside className={styles.glassSidebar}>
            <div className={styles.userInfoBrief}>
              <div className={styles.avatarLarge}>
                {user?.firstName?.charAt(0) || "S"}
              </div>
              <p>Welcome back,</p>
              <h3>{user ? user.firstName : "Student"}</h3>
            </div>

            <ul>
              <li onClick={() => navigate("/user/exams")}>📝 Attempt Exam</li>
              <li onClick={() => navigate("/user/results")}>📊 View Results</li>
            </ul>
          </aside>

          {/* Main Content */}
          <main className={styles.glassMain}>
            <section className={styles.heroSection}>
              <h2>Your Performance</h2>
              <p>Keep track of your academic progress and upcoming tests.</p>
            </section>

            <div className={styles.metricsContainer}>
              
              <div className={styles.metricBox}>
                <span>Available</span>
                <strong>{stats.totalExams}</strong>
                <small>New Exams</small>
              </div>

              <div className={`${styles.metricBox} ${styles.highlighted}`}>
                <span>Completed</span>
                <strong>{stats.completedExams}</strong>
                <small>Total Attempts</small>
              </div>

              <div className={styles.metricBox}>
                <span>Avg. Score</span>
                <strong>{stats.avgScore}%</strong>

                <div className={styles.progressBarMini}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${stats.avgScore}%` }}
                  ></div>
                </div>
              </div>

            </div>

            <div className={styles.quickActionZone}>
              <button
                className={`${styles.glassBtn} ${styles.primary}`}
                onClick={() => navigate("/user/exams")}
              >
                Start New Exam Now
              </button>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;