import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';


const Login = () => {
    const { API } = useAuth();
    const URL = `${API}/api/auth/login`;
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const Navigate = useNavigate();
    const { storeTokeninLS } = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                console.log("Login Successfully :", data);
                Navigate("/");
                const token = data.token;
                storeTokeninLS(token);

                // Handle successful registration (e.g., redirect or show a success message)
            } else {
                console.error("Registration failed:", data.message);
                alert(data.message);
                // Handle registration failure (e.g., show an error message)
            }

            setFormData({
                // Reset form data after successful registration
                name: "",
                phone: "",
                email: "",
                password: "",
            });

        } catch (error) {
            console.error("Error during registration:", error);
            // Handle network or other errors

        }
        // You can send formData.email and formData.password to your backend here
        console.log('Login Data:', formData);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
