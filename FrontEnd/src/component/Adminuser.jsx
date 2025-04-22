import React, { useEffect, useState } from "react";

export default function AdminUser() {

    const Token = localStorage.getItem("token");
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);

    // Delete user from local state only
    const handleDelete = (_id) => {
        setUsers(users.filter(user => user._id !== _id));
    };

    // Set user to be edited
    const handleEditClick = (user) => {
        setEditUser(user);
    };

    // Update editUser state as fields change
    const handleEditChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditUser((prevUser) => ({
            ...prevUser,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Save edited user to local state only
    const handleSave = () => {
        setUsers(users.map((user) => (user._id === editUser._id ? editUser : user)));
        setEditUser(null);
    };

    // GET data from backend
    const userData = async () => {
        try {
            const response = await fetch("http://localhost:3000/admin/user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Token}`
                },
            });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        userData();
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Users</h2>
            <table className="w-full border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Phone</th>
                        <th className="border px-4 py-2">Admin</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{user.phone}</td>
                            <td className="border px-4 py-2">{user.isAdmin ? "Yes" : "No"}</td>
                            <td className="border px-4 py-2 space-x-2  justify-center items-center">
                                <button
                                    className="bg-blue-500 text-white px-2 py-1 rounded"
                                    onClick={() => handleEditClick(user)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => handleDelete(user._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editUser && (
                <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">Edit User</h3>
                        <label className="block mb-2">
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={editUser.name}
                                onChange={handleEditChange}
                                className="w-full p-2 border rounded"
                            />
                        </label>
                        <label className="block mb-2">
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={editUser.email}
                                onChange={handleEditChange}
                                className="w-full p-2 border rounded"
                            />
                        </label>
                        <label className="block mb-2">
                            Phone:
                            <input
                                type="text"
                                name="phone"
                                value={editUser.phone}
                                onChange={handleEditChange}
                                className="w-full p-2 border rounded"
                            />
                        </label>
                        <label className="block mb-4">
                            <input
                                type="checkbox"
                                name="isAdmin"
                                checked={editUser.isAdmin}
                                onChange={handleEditChange}
                                className="mr-2"
                            />
                            Is Admin
                        </label>
                        <div className="flex justify-end space-x-2">
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded"
                                onClick={() => setEditUser(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
