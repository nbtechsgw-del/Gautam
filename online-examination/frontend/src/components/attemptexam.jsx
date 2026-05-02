import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./attemptexam.module.css";

function AttemptExam() {

    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const submittedRef = useRef(false);

    const [exam, setExam] = useState(null);
    const [answers, setAnswers] = useState({});
    const [currentQ, setCurrentQ] = useState(0);
    const [time, setTime] = useState(300);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/user/exams/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            setExam(res.data);
        });
    }, []);

    useEffect(() => {
        if (submittedRef.current) return;

        const timer = setInterval(() => {
            setTime(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleAnswer = (qid, option) => {
        setAnswers(prev => ({ ...prev, [qid]: option }));
    };

    const handleSubmit = async () => {
        if (submittedRef.current) return;
        submittedRef.current = true;

        try {
            const res = await axios.post(
                "http://localhost:8080/api/user/results/submit",
                {
                    examId: id,
                    answers: answers
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            navigate("/user/result", { state: res.data });

        } catch (err) {
            console.error(err);
        }
    };

    if (!exam) return <h2>Loading...</h2>;

    const q = exam.questions[currentQ];

    
    return (
        <div className={styles.adminWrapper}>
            <div className={`${styles.examContainerGlass} ${time < 60 ? styles.timerWarning : ""}`}>

                {/* HEADER */}
                <header className={styles.examHeaderGlass}>
                    <div className={styles.examTitleArea}>
                        <span className={styles.examTag}>Live Exam</span>
                        <h1>{exam.title}</h1>
                    </div>

                    <div className={`${styles.glassTimer} ${time < 60 ? styles.pulse : ""}`}>
                        <span className={styles.timerIcon}>⏳</span>
                        {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
                    </div>
                </header>

                <div className={styles.examMainLayout}>

                    {/* LEFT */}
                    <main className={styles.questionWorkspace}>
                        <div className={styles.questionCardGlass}>
                            <div className={styles.qBadge}>
                                Question {currentQ + 1} of {exam.questions.length}
                            </div>

                            <h2 className={styles.qText}>{q.question}</h2>

                            <div className={styles.optionsContainer}>
                                {["A", "B", "C", "D"].map(opt => (
                                    <label
                                        key={opt}
                                        className={`${styles.optionGlass} ${
                                            answers[q.id] === opt ? styles.selected : ""
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name={q.id}
                                            checked={answers[q.id] === opt}
                                            onChange={() => handleAnswer(q.id, opt)}
                                        />
                                        <span className={styles.optLetter}>{opt}</span>
                                        <span className={styles.optText}>{q[`option${opt}`]}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <footer className={styles.qNavigationBtns}>
                            <button
                                className={styles.glassNavBtn}
                                disabled={currentQ === 0}
                                onClick={() => setCurrentQ(currentQ - 1)}
                            >
                                ← Previous
                            </button>

                            <div className={styles.qProgressDots}>
                                {exam.questions.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`${styles.dot} ${
                                            i === currentQ ? styles.active : ""
                                        } ${
                                            answers[exam.questions[i].id] ? styles.filled : ""
                                        }`}
                                    />
                                ))}
                            </div>

                            <button
                                className={`${styles.glassNavBtn} ${styles.primary}`}
                                onClick={() =>
                                    currentQ === exam.questions.length - 1
                                        ? handleSubmit()
                                        : setCurrentQ(currentQ + 1)
                                }
                            >
                                {currentQ === exam.questions.length - 1
                                    ? "Finish Exam"
                                    : "Next Question →"}
                            </button>
                        </footer>
                    </main>

                    {/* RIGHT */}
                    <aside className={styles.examSidebarGlass}>
                        <h3>Question Map</h3>

                        <div className={styles.questionGridScroll}>
                            {exam.questions.map((qItem, index) => (
                                <button
                                    key={index}
                                    className={`${styles.gridNum} ${
                                        currentQ === index ? styles.current : ""
                                    } ${
                                        answers[qItem.id] ? styles.answered : ""
                                    }`}
                                    onClick={() => setCurrentQ(index)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>

                        <div className={styles.sidebarFooter}>
                            <div className={styles.legend}>
                                <div className={styles.lItem}>
                                    <span className={`${styles.dot} ${styles.filled}`}></span> Answered
                                </div>
                                <div className={styles.lItem}>
                                    <span className={styles.dot}></span> Pending
                                </div>
                            </div>

                            <button
                                className={`${styles.glassBtn} ${styles.danger} ${styles.fullWidth}`}
                                onClick={handleSubmit}
                                disabled={submittedRef.current}
                            >
                                Final Submission
                            </button>
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
}

export default AttemptExam;