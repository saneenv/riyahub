import React, { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive';
import NavbarMob from './NavbarMob';
import Navbar from './Navbar';
import Navbar2 from './Navbar2';
import Footer from './Footer';
import logo from '../images/login/logo.png'
import men from '../images/regchoose/men.png'
import women from '../images/regchoose/women.png'
import { useNavigate } from 'react-router-dom';

function RegChoose() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const navigate= useNavigate();

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const canreg = () => {
        navigate('/canreg');
      };
      const empreg = () => {
        navigate('/empreg');
      };
    return (
        <div className='flex flex-col min-h-screen'>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>
            <div className=' flex justify-center items-center bg-[black] py-7'>
                <div className='lg:w-[60%] w-[90%] h-[70%] bg-[white]  flex flex-col items-center  gap-6 py-8 lg:rounded-[20px] rounded-[5px]'>
                    <div className='flex flex-col justify-center items-center gap-3'>
                        <span className='text-2xl font-[600] font-display text-[#E22E37]'>Free Registration</span>
                        <span className='text-base font-[400] font-display'>Select Account Category</span>
                    </div>
                    <div className='h-auto w-[90%] lg:gap-[10%] gap-5 flex lg:flex-row flex-col mt-5 lg:px-12 px-5'>
                        <div className='lg:w-[50%] w-[100%] h-full border-2 border-[#E22E37] flex flex-col gap-3 py-3 items-center'>
                            <img src={men} alt="men" />
                            <span className='text-xl font-[600] font-display'>Candidate</span>
                            <div className='w-[50%] h-[31px] bg-[#E22E37] rounded-[5px] flex justify-center items-center text-[white] text-base font-[600] font-display cursor-pointer hover:bg-[black] hover:text-[white]' onClick={canreg}>Register Now</div>
                        </div>
                        <div className='lg:w-[50%] w-[100%] h-full border-2 border-[#E22E37] flex flex-col gap-3 py-3 items-center'>
                            <img src={women} alt="men" />
                            <span className='text-xl font-[600] font-display'>Employer</span>
                            <div className='w-[50%] h-[31px] bg-[#E22E37] rounded-[5px] flex justify-center items-center text-[white] text-base font-[600] font-display cursor-pointer hover:bg-[black] hover:text-[white]' onClick={empreg}>Register Now</div>
                        </div>
                    </div>
                    <img src={logo} alt="logo" className='mt-5' />




                </div>
            </div>
            <Footer />
        </div>
    )
}

export default RegChoose
