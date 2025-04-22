import React from 'react';
import homeimg from '../assets/home.png';
import { useNavigate } from 'react-router-dom';


function Home() {
    const Navigate = useNavigate();
    return (
        <div className='md:flex  gap-1.5 mx-[7%] block'>

            <div className='md:w-[60%] flex flex-col  items-start justify-center'>
                <h1 className='text-4xl font-bold  text-start mt-10'>Universal Dispatch Solutions!</h1>
                <p className='text-lg  text-justify mt-5 mx-auto border-r-0 border-solid'>At Universal Dispatch Solutions, we specialize in providing comprehensive software services tailored to meet your business needs. From custom software development to innovative solutions, we ensure your success in the ever-evolving digital landscape. Explore our portfolio and see how we can help streamline and elevate your business operations.</p>
                <div className='flex justify-center mt-10 gap-4'>
                    <button className='bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-700' onClick={() => { Navigate("/services") }} >Services</button>
                    <button className='border-black border-2 cursor-pointer text-black px-4 py-2 rounded-md hover:bg-blue-700' onClick={() => { Navigate("\contact") }}>Contact us</button>
                </div>
            </div>
            <div>
                <img src={homeimg} alt="not found" className='items-center justify-center  drop-shadow-[0_70px_70px_rgba(0,0,0,0.30)] animate-wiggle' />
            </div>
        </div>
    )
}

export default Home
