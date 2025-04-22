import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

function Adminservices() {
    const Token = localStorage.getItem("token");
    const [services, setServices] = useState([]);
    const [editService, setEditService] = useState(null);
    const { API } = useAuth()
    const fetchService = async () => {
        try {
            const response = await fetch(`${API}/admin/services`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Token}`
                },
            });
            const data = await response.json();
            setServices(data);
            //console.log(data);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    useEffect(() => {
        fetchService();
    }, [])


    const handleDelete = async (_id) => {
        try {
            const response = await fetch(`${API}/admin/services/delete/${_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Token}`, // agar token lagta hai
                },
            });

            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setServices(services.filter(service => service._id !== _id));
            }

        } catch (error) {
            console.log("Error deleting service:", error);
        }

    };

    const handleEditClick = (service) => {
        setEditService(service);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditService((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {

        const updatedService = await fetch(`${API}/admin/services/update/${editService._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Token}`
            },
            body: JSON.stringify(editService),
        });
        const data = await updatedService.json();
        console.log(data);
        if (updatedService.ok) {
            setServices(services.map(service => (
                service._id === editService._id ? editService : service
            )));
            setEditService(null);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Services</h2>
            <table className="w-full border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Service</th>
                        <th className="border px-4 py-2">Description</th>
                        <th className="border px-4 py-2">Price</th>
                        <th className="border px-4 py-2">Provider</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{service.service}</td>
                            <td className="border px-4 py-2">{service.description}</td>
                            <td className="border px-4 py-2">{service.price}</td>
                            <td className="border px-4 py-2">{service.provider}</td>
                            <td className="border px-4 py-2">
                                <div className=" flex justify-center items-center space-x-2">
                                    <button
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleEditClick(service)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleDelete(service._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Popup */}
            {editService && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">Edit Service</h3>
                        <label className="block mb-2">
                            Service:
                            <input
                                type="text"
                                name="service"
                                value={editService.service}
                                onChange={handleEditChange}
                                className="w-full p-2 border rounded"
                            />
                        </label>
                        <label className="block mb-2">
                            Description:
                            <textarea
                                name="description"
                                value={editService.description}
                                onChange={handleEditChange}
                                className="w-full p-2 border rounded"
                            />
                        </label>
                        <label className="block mb-2">
                            Price:
                            <input
                                type="text"
                                name="price"
                                value={editService.price}
                                onChange={handleEditChange}
                                className="w-full p-2 border rounded"
                            />
                        </label>
                        <label className="block mb-4">
                            Provider:
                            <input
                                type="text"
                                name="provider"
                                value={editService.provider}
                                onChange={handleEditChange}
                                className="w-full p-2 border rounded"
                            />
                        </label>
                        <div className="flex justify-end space-x-2">
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded"
                                onClick={() => setEditService(null)}
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
export default Adminservices;