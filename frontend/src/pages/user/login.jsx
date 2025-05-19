import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/userService";
import './authPages.css';

const Login = () => {

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            localStorage.removeItem('userId');
            const response = await loginUser(formData);
            console.log("Login API response:", response);
            if (response) {
                localStorage.setItem('token', response.token);
                // localStorage.setItem('userId', response.userId);
                localStorage.setItem('userName', response.userName);
                // setMessage("Login successful!");
                navigate('/dashboard');
            } else {
                setMessage(response?.error || "Login failed.");
            }
        } catch (error) {
            console.error('Login error:', error);
            setMessage('An error occurred during login.');
        }
    }
    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <input type="email" name="email" placeholder="Enter email address" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange} required />
                <button type="submit">Login</button>
                <div className="create-acc">
                    <p> Don't have an account? <Link to="/register" className="creatacc-text">Create Account</Link></p>
                </div>
            </form>
            {message && <p className="error-msg">{message}</p>}
        </div>
    )
}
export default Login;