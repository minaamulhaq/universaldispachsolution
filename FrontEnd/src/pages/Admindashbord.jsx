// AdminDashboard.jsx
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Admindashboard() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/admin" || location.pathname === "/admin/") {
            navigate("/admin/user");
        }
    }, [location.pathname, navigate]);
    return (
        <div className="flex h-[89vh]">
            <div className="w-1/6 bg-gray-200 p-4">
                <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
                <ul className="space-y-2">
                    <li><button className="w-full text-left" onClick={() => navigate("/admin/user")}>Users</button></li>
                    <li><button className="w-full text-left" onClick={() => navigate("/admin/contact")}>Contacts</button></li>
                    <li><button className="w-full text-left" onClick={() => navigate("/admin/services")}>Services</button></li>
                </ul>
            </div>
            <div className="w-5/6 p-4 overflow-auto">
                <Outlet />
            </div>
        </div>
    );
}

// AdminUser.jsx



