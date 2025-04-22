import React from "react";
import { useAuth } from "../store/auth";

const Servicespage = () => {
    const { Services } = useAuth();
    console.log(Services);
    return (
        <div className="px-4 sm:px-6 lg:px-20 py-6">
            <h1 className="text-2xl font-bold mb-6 text-center">Our Services</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 justify-center">
                {Services.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow-md overflow-hidden p-4 flex flex-col items-start w-full max-w-sm mx-auto"
                    >
                        <img
                            src="https://miro.medium.com/v2/resize:fit:4800/format:webp/1*V-Jp13LvtVc2IiY2fp4qYw.jpeg"
                            alt={item.service}
                            className="w-full h-40 object-cover rounded-xl mb-4"
                        />
                        <h2 className="text-xl font-bold text-left mb-1">{item.service}</h2>
                        <p className="text-sm text-gray-600 mb-2">Price: {item.price}</p>
                        <p className="text-sm text-gray-700 mb-1">{item.description}</p>
                        <p className="text-xs text-gray-500">Provider: {item.provider}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Servicespage;
