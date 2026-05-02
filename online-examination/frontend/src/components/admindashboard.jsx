import styles from "./admindashboard.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
    const navigate = useNavigate();
    const [counts, setCounts] = useState({ exams: 0, users: 0, results: 0 });
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchCounts();
    }, []);

    const fetchCounts = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/admin/results/counts", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCounts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:8080/api/users/logout", {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            localStorage.removeItem("token");
            navigate("/");
        }
    };

    return (
        <div className={styles.dashboardContainer}>
            
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarBrand}>
                    <h2>EduAdmin</h2>
                </div>

                <nav className={styles.sidebarMenu}>
                    <ul>
                        <li
                            className={styles.active}
                            onClick={() => navigate("/admin/dashboard")}
                        >
                            <span className={styles.icon}>📊</span> Overview
                        </li>

                        <li onClick={() => navigate("/admin/questions")}>
                            <span className={styles.icon}>❓</span> Manage Questions
                        </li>

                        <li onClick={() => navigate("/admin/create-exam")}>
                            <span className={styles.icon}>📝</span> Create Exam
                        </li>

                        <li onClick={() => navigate("/admin/results")}>
                            <span className={styles.icon}>🏆</span> View Results
                        </li>
                    </ul>
                </nav>

                <div className={styles.sidebarFooter}>
                    <button
                        className={styles.logoutBtn}
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                
                <header className={styles.topNav}>
                    <div className={styles.welcomeText}>
                        <h1>Welcome back, Admin 👋</h1>
                        <p>Here’s what’s happening with your exams today.</p>
                    </div>
                </header>

                <section className={styles.statsGrid}>
                    
                    <div className={styles.statCard}>
                        <div className={`${styles.statIcon} ${styles.blue}`}>📚</div>
                        <div className={styles.statInfo}>
                            <h3>Total Exams</h3>
                            <p className={styles.statValue}>{counts.exams}</p>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={`${styles.statIcon} ${styles.purple}`}>👥</div>
                        <div className={styles.statInfo}>
                            <h3>Total Students</h3>
                            <p className={styles.statValue}>{counts.users}</p>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={`${styles.statIcon} ${styles.green}`}>✅</div>
                        <div className={styles.statInfo}>
                            <h3>Results Released</h3>
                            <p className={styles.statValue}>{counts.results}</p>
                        </div>
                    </div>

                </section>

                <section className={styles.recentActivity}>
                    <div className={styles.activityHeader}>
                        <h2>Quick Actions</h2>
                    </div>

                    <div className={styles.actionButtons}>
                        <button onClick={() => navigate("/admin/create-exam")}>
                            + New Exam
                        </button>

                        <button
                            className={styles.secondary}
                            onClick={() => navigate("/admin/questions")}
                        >
                            Add Questions
                        </button>
                    </div>
                </section>

            </main>
        </div>
    );
}

export default AdminDashboard;