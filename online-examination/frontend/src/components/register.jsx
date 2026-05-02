import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

function Register() {
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const response = await fetch("http://localhost:8080/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setFormData({ userName: "", email: "", password: "", phoneNumber: "", address: "" });
                setTimeout(() => navigate("/"), 1500);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError("Server error! Please try again later.");
        }
    };

    return (
        <div className="register-page">
            <div className="register-card">
                <div className="register-header">
                    <h2>Create Account</h2>
                    <p>Join us to get started with your journey</p>
                </div>

                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="userName"
                            placeholder="johndoe123"
                            value={formData.userName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-row">
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
                        <div className="input-group">
                            <label>Phone Number</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="123-456-7890"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Address</label>
                        <textarea
                            name="address"
                            placeholder="Enter your full address"
                            value={formData.address}
                            onChange={handleChange}
                            rows="3"
                        />
                    </div>

                    <button type="submit" className="register-btn">Create Account</button>

                    {message && <div className="alert success">{message}</div>}
                    {error && <div className="alert error">{error}</div>}
                </form>

                <div className="register-footer">
                    <p>Already have an account? <span onClick={() => navigate("/")}>Sign In</span></p>
                </div>
            </div>
        </div>
    );
}

export default Register;