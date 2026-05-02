import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"; 
import { jwtDecode } from "jwt-decode";

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const response = await fetch("http://localhost:8080/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                const token = data.data.token;
                const decoded = jwtDecode(token);
                const role = decoded.role;

                localStorage.setItem("userId", data.data.userId);
                localStorage.setItem("token", token);
                localStorage.setItem("role", role);

                if (role === "ADMIN") navigate("/admin");
                else navigate("/user");

                setMessage("Login successful!");
            } else {
                setError(data.message || "Invalid credentials");
            }
        } catch (err) {
            setError("Unable to connect to server.");
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <h2>Welcome Back</h2>
                    <p>Please enter your details to sign in</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="name@company.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn">Sign In</button>

                    {message && <div className="alert success">{message}</div>}
                    {error && <div className="alert error">{error}</div>}
                </form>

                <div className="login-footer">
                    <p>Don't have an account? <span onClick={() => navigate("/register")}>Register here</span></p>
                </div>
            </div>
        </div>
    );
}

export default Login;