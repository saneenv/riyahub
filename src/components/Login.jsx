import React from 'react'
import { useMediaQuery } from 'react-responsive';
import NavbarMob from './NavbarMob';
import Navbar from './Navbar';
import Footer from './Footer';
import logo from '../images/login/logo.png'
import Navbar2 from './Navbar2';
import { useNavigate } from 'react-router-dom';



function Login() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const navigate = useNavigate();
    const verify = () => {
        navigate('/verify');
      };
    return (
        <div className='flex flex-col min-h-screen'>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>
            <div className=' flex justify-center items-center bg-[#0D2D3E] py-7'>
                <div className='lg:w-[30%] w-[90%] h-[70%] bg-[white]  flex flex-col items-center  gap-6 py-12 lg:rounded-[20px] rounded-[5px]'>
                    <div className='flex flex-col justify-center items-center gap-3'>
                        <span className='text-2xl font-[600] font-[display]'>Login</span>
                        <span className='text-base font-[400] font-[display]'>Log In to Continue Your Job Search Journey</span>
                    </div>
                    <div className='w-full h-auto gap-3 flex flex-col mt-5'>
                        <div className='h-[56px] w-full px-12 ' >
                            <input type="text" className='border-2 border-[#000000] w-full h-full rounded-[12px] px-3 ' placeholder='Enter your Mobile Number' />
                        </div>
                        <div className='h-[56px] w-full px-12 ' >
                              <div className='w-full h-full bg-[#E22E37]  rounded-[28px] flex justify-center items-center text-[white] text-base font-[600] font-[display] cursor-pointer' onClick={verify}>
                              SUBMIT
                              </div>
                        </div>
                        <span className='text-base font-[400] font-[display] text-[#8B8B8B]'>or</span>
                        <span><span className='font-[400] text-base font-[display] text-[#8B8B8B]'>Not a Member?</span><span className='font-[400] text-base font-[display] text-[#E22E37] cursor-pointer'> Free Register Here</span></span>
                    </div>
                    <img src={logo} alt="logo" />
                    
                    


                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Login
