import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../services/userService";
import "./authPages.css";

const Register = () => {
    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        //validations
        if (formData.name.trim().length <= 2) {
            setMessage("Full name must be more than 2 characters.");
            return;
        }

        if (formData.password.length < 6) {
            setMessage("Password must be at least 6 characters long.");
            return;
        }
        try {
            const response = await registerUser(formData);
            if (response && response.message) {
                setMessage("Registration successful");
            } else {
                setMessage(response?.error || "Registration failed.");
            }
        }
        catch (error) {
            console.error("Registration error:", error);
            setMessage("An error occured");
        }
    }

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <input type="text" name="name" placeholder="Enter full name" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Enter email address" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange} required />
                <button type="submit">Register</button>
                <div className="create-acc">
                    <p> Have an account? <Link to="/login" className="login-text">Login</Link></p>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}
export default Register;