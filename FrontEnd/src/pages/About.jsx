import React from "react";
import { useNavigate } from "react-router-dom";
import aboutImg from "../assets/home.png"; // Replace with your actual image path

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-16 py-12">
            {/* Text Section */}
            <div className="w-full md:w-1/2 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Why Choose Us?</h2>
                <p className="text-gray-600 mb-4">
                    At Universal Dispatch Solutions, we provide reliable and innovative IT services tailored to your business needs. With a team of skilled professionals, we deliver high-quality solutions that help you grow and stay ahead in the digital world.
                </p>
                <p className="text-gray-600 mb-4">
                    We focus on customer satisfaction, fast delivery, and long-term support. Whether you're a startup or an established company, we are here to help you succeed with modern technology and smart strategies.
                </p>
                <p className="text-gray-600 mb-4">
                    What sets us apart is our commitment to excellence. We don’t just offer services—we build partnerships. We take the time to understand your goals, challenges, and audience to create solutions that bring real value to your business.
                </p>
                <p className="text-gray-600 mb-6">
                    From web development to software solutions, digital marketing to technical support, our wide range of services is designed to meet your every need under one roof. Choose us for trust, transparency, and technology that makes a difference.
                </p>
                <div className="flex justify-center md:justify-start gap-4">
                    <button
                        onClick={() => navigate("/contact")}
                        className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition duration-300 cursor-pointer"
                    >
                        Contact Us
                    </button>
                    <button
                        className="border border-blue-600 text-blue-600 px-6 py-2 rounded-xl hover:bg-blue-50 transition duration-300 cursor-pointer not-last:"
                        onClick={() => navigate("/services")}
                    >
                        Learn More
                    </button>
                </div>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2">
                <img src={aboutImg} alt="About Us" className="w-full h-auto rounded-2xl drop-shadow-black" />
            </div>
        </div>
    );
};

export default About;
