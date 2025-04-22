// AdminContact.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
export default function AdminContact() {
    const { API } = useAuth()
    const Token = localStorage.getItem("token");
    const [contactsData, setContactsData] = useState([]);
    const fetchContacts = async () => {
        try {
            const response = await fetch(`${API}/admin/contact`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Token}`
                },
            });
            const data = await response.json();
            setContactsData(data);
            //console.log(data);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    useEffect(() => {

        fetchContacts();
    }, [])

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Contacts</h2>
            <table className="w-full border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Mobile</th>
                        <th className="border px-4 py-2">Message</th>
                    </tr>
                </thead>
                <tbody>
                    {contactsData.map(contact => (
                        <tr key={contact._id}>
                            <td className="border px-4 py-2">{contact.name}</td>
                            <td className="border px-4 py-2">{contact.email}</td>
                            <td className="border px-4 py-2">{contact.phone}</td>
                            <td className="border px-4 py-2">{contact.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}