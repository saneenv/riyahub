import React from 'react'
import logo from '../images/footer/footerlogo.png'
import polygon from '../images/footer/Polygon.png'
import { useNavigate } from 'react-router-dom'

function Footer() {
    const navigate= useNavigate();
    const customerType = sessionStorage.getItem('customerType');
// console.log(customerType);

    const empreg = () => {
        navigate('/empreg');
      };
      const canreg = () => {
        navigate('/canreg');
      };
     
      const jobpost = () => {
        navigate('/jobpost');
      };

      const login = () => {
        navigate('/login');
      };

      const homePage = () => {
        navigate('/home');
      };

      const staffregpage = () => {
        navigate('/staffreg');
      };

      const aboutus = () => {
        navigate('/about');
      };

      const termsandconditons = () => {
        navigate('/terms');
      };

      const privacypolicy = () => {
        navigate('/privacy');
      };


    return (
        <div className='flex flex-col'>
            <div className='h-auto w-full bg-[#3D3B3B] flex lg:flex-row flex-col lg:p-12 p-3 lg:gap-0 gap-5'>
                <div className='h-min-h-screen w-[30%] flex justify-center items-center'>
                    <img src={logo} alt="logo" />
                </div>
                <div className='h-[100%] w-[70%] flex lg:flex-row flex-col justify-center items-start lg:gap-[15%] gap-8'>
                    <div className='flex flex-col lg:gap-6 gap-3'>
                        <span className='text-base font-[500] font-display text-[white]'>COMPANY</span>
                        <span className='flex flex-row justify-start items-center gap-1 '>
                            <img src={polygon} alt="polygon" className='w-[10%] h-[10%]' />
                            <span className='text-sm font-[400] font-display text-[white] cursor-pointer' onClick={homePage}>Home</span>
                        </span>
                        <span className='flex flex-row justify-start items-center gap-1 '>
                            <img src={polygon} alt="polygon" className='w-[10%] h-[10%]' />
                            <span className='text-sm font-[400] font-display text-[white] cursor-pointer' onClick={aboutus}>About Us</span>
                        </span>
                        <span className='flex flex-row justify-start items-center gap-1 '>
                            <img src={polygon} alt="polygon" className='w-[10%] h-[10%]' />
                            <span className='text-sm font-[400] font-display text-[white] cursor-pointer' onClick={staffregpage}>Staff Reg</span>
                        </span>
                      
                    </div>

                    <div className='flex flex-col lg:gap-6 gap-3'>
                        <span className='text-base font-[500] font-display text-[white]'>FOR EMPLOYER</span>
                        <span className='flex flex-row justify-start items-center gap-1 '>
                            <img src={polygon} alt="polygon" className='w-[6%] h-[6%]' />
                            <span className='text-sm font-[400] font-display text-[white] cursor-pointer' onClick={empreg}>Registration</span>
                        </span>
                        {/* <span className='flex flex-row justify-start items-center gap-1 '>
                            <img src={polygon} alt="polygon" className='w-[6%] h-[6%]' />
                            <span className='text-sm font-[400] font-display text-[white] cursor-pointer' onClick={jobpost} >Job Post</span>
                        </span> */}
                        <span className='flex flex-row justify-start items-center gap-1 '>
                            <img src={polygon} alt="polygon" className='w-[6%] h-[6%]' />
                            <span className='text-sm font-[400] font-display text-[white] cursor-pointer' onClick={login}>Employer Login</span>
                        </span>

                    </div>

                    <div className='flex flex-col lg:gap-6 gap-3'>
                        <span className='text-base font-[500] font-display text-[white]'>FOR CANDIDATE</span>
                        <span className='flex flex-row justify-start items-center gap-1 '>
                            <img src={polygon} alt="polygon" className='w-[6%] h-[6%]' />
                            <span className='text-sm font-[400] font-display text-[white] cursor-pointer' onClick={canreg}>Registration</span>
                        </span>
                        <span className='flex flex-row justify-start items-center gap-1 '>
                            <img src={polygon} alt="polygon" className='w-[6%] h-[6%]' />
                            <span className='text-sm font-[400] font-display text-[white] cursor-pointer' onClick={login}>Candidate Login</span>
                        </span>
                        {/* <span className='flex flex-row justify-start items-center gap-1 '>
                            <img src={polygon} alt="polygon" className='w-[6%] h-[6%]' />
                            <span className='text-sm font-[400] font-display text-[white]'>Find Jobs</span>
                        </span> */}

                    </div>
                </div>
            </div>
            <div className='w-full h-[40px]  flex flex-row lg:px-4 px-1 '>
                <div className='w-[50%] text-start h-full flex  items-center lg:text-sm text-xs font-[400] font-display'>© SherSoft Software Company</div>
                <div className='w-[50%] h-full flex  items-center justify-end flex-row gap-8'>
                    <span className='lg:text-sm text-xs font-[400] font-display cursor-pointer' onClick={termsandconditons}>Terms & Conditions</span>
                    <span className='lg:text-sm text-xs font-[400] font-display cursor-pointer' onClick={privacypolicy}>Privacy Policy</span>
                </div>
            </div>
        </div>

    )
}

export default Footer
