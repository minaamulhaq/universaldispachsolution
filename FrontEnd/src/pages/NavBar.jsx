import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isLoggedIn } = useAuth();
    return (
        <nav className=" bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center px-0.5">
                {/* Logo Section */}
                <div className="text-2xl font-bold">Your Logo</div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-white text-2xl" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? "✖" : "☰"}
                </button>

                {/* Navigation Links */}
                <ul className={`md:flex space-x-6 md:static absolute top-16 right-0 w-[50%] bg-blue-500 md:bg-transparent md:w-auto flex-col md:flex-row md:items-center ${isOpen ? "flex" : "hidden"}`}>
                    <li>
                        <Link to="/" className="block text-white font-bold py-2 px-4 md:inline hover:text-blue-700">Home</Link>
                    </li>
                    <li>
                        <Link to="/services" className="block text-white font-bold py-2 px-4 md:inline hover:text-blue-700 hover:bg-red-700">Services</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="block text-white font-bold py-2 px-4 md:inline hover:text-blue-700 hover:bg-red-700">Contact</Link>
                    </li>
                    <li>
                        <Link to="/about" className="block text-white font-bold py-2 px-4 md:inline hover:text-blue-700 hover:bg-red-700">About</Link>
                    </li>
                    {!isLoggedIn ? <>
                        <li>
                            <Link to="/login" className="block text-white font-bold py-2 px-4 md:inline hover:text-blue-700 hover:bg-red-700">Login</Link>
                        </li>
                        <li>
                            <Link to="/register" className="block text-white font-bold py-2 px-4 md:inline hover:text-blue-700 hover:bg-red-700">Register</Link>
                        </li>
                    </> :

                        <li>
                            <button className="bg-red-600 px-5 py-1 rounded-md">
                                <Link to="/logout" className="text-white font-bold hover:text-blue-500">Logout</Link> </button>
                        </li>

                    }


                </ul>

            </div>
        </nav >
    );
};

export default NavBar;
