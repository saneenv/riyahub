import React,{useState} from 'react'
import logo from '../images/navbar/logo.png'
import smallloc from '../images/navbar/smallloc.png'


function NavbarMob() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Function to toggle sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className='w-full h-[180px]  flex flex-col px-3 gap-3'>
            <div className='w-full flex flex-row gap-3 mt-3 justify-between items-center '>
                <img src={logo} alt="logo" className='w-[45%] h-[80%]' />
                <span className='text-base font-[500] font-[display] text-[#E22E37]'>Login</span>
                <span className='text-base font-[500] font-[display] text-[#E22E37]'>Register</span>
                <button onClick={toggleSidebar} className="text-gray-700 hover:text-blue-500 focus:outline-none">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
            <div className='w-full h-[40px] border-2 border-[gray] rounded-[5px]'>
                <input placeholder='Search Job...' className='w-full h-full px-2 rounded-[5px]' />
            </div>
            <div className='w-full flex flex-row h-[40px] border-2 border-[gray] rounded-[5px]'>
                <input placeholder='Search Location...' className='w-[70%] h-full px-2 ' />
                <div className='w-[30%] bg-[#E22E37] h-full flex justify-center items-center text-[white] text-base font-[700] font-[display] cursor-pointer'>Find Job</div>
            </div>
             {/* Sidebar Component */}
             {isSidebarOpen && (
                <>
                {/* Background Blur */}
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-[2px] z-40"
                    onClick={toggleSidebar}  // Clicking outside the sidebar will close it
                ></div>
                <div className={`fixed top-0 left-0 w-[250px] h-full bg-[#0D2D3E] text-white z-50 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <button onClick={toggleSidebar} className="text-white w-full p-2 flex justify-end items-end mt-2">
                        <div className='border-2 border-[white] px-1 bg-[#E22E37] hover:bg-gray-700'>X</div>
                    </button>
                    <ul className='mt-5'>
                        <li className='p-4 hover:bg-gray-700 cursor-pointer'>Home</li>
                        <li className='p-4 hover:bg-gray-700 cursor-pointer'>Job By Categories</li>
                        <li className='p-4 hover:bg-gray-700 cursor-pointer'>Find Jobs</li>
                        <li className='p-4 hover:bg-gray-700 cursor-pointer'>Job By District</li>
                        <li className='p-4 hover:bg-gray-700 cursor-pointer'>Services</li>
                        <li className='p-4 hover:bg-gray-700 cursor-pointer'>Contact Us</li>
                    </ul>
                    <div className='w-[full] h-[8%] flex justify-center items-center mt-5'>
                        <div className='w-[60%] h-full border-2 border-[#E22E37] bg-[white] rounded-[5px] flex flex-row gap-4 cursor-pointer justify-center items-center'>
                        <img src={smallloc} alt="smalllocation" />
                        <span className='text-base font-[600] font-[display] text-[black]'>Kerala</span>
                        </div>
                     
                </div>
                </div>
                </>
            )}
        </div>
    )
}

export default NavbarMob
