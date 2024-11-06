import React, { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive';
import NavbarMob from '../components/NavbarMob';
import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';


function Privacy() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='min-h-screen flex flex-col'>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>

            <div className='lg:px-12 px-3 lg:py-12 py-3 flex flex-col min-h-screen gap-8'>

                <div className='w-full flex justify-center items-center text-[#E22E37] text-3xl font-[700] font-display'>Privacy Policy</div>

                <div className='w-full flex flex-col gap-10'>
                    <div className='flex flex-col w-full gap-4 text-left'>
                        <span className='text-xl font-[700] font-display'>Introduction</span>
                        <span className='text-lg font-[400] font-display'>Welcome to RIYA HUB JOBS . We are
                            committed to protecting your privacy and
                            ensuring your personal information is handled responsibly.
                            This Privacy Policy outlines how we collect, use, and safeguard your information.</span>
                    </div>



                    <div className='flex flex-col w-full gap-4 text-left'>
                        <span className='text-xl font-[700] font-display'>Information We Collect</span>
                        <span className='text-lg font-[400] font-display'>We collect various types of information, including:
                        </span>
                        <div className='text-lg font-[400] font-display flex flex-col gap-6'>
                            <div className='flex lg:flex-row flex-col'>

                                <span className='font-[600]'>. Personal Information</span> :Name, email address, phone number,
                                resume, and other contact details you provide during registration.

                            </div>

                            <div className='flex lg:flex-row flex-col'>

                                <span className='font-[600]'>. Profile Information</span> :  Details about your education,
                                work experience, skills, and job preferences.

                            </div>

                            <div className='flex lg:flex-row flex-col'>

                                <span className='font-[600]'>. Usage Data:</span> : Information on how you interact with our platform,
                                including IP address, browser type, and access times.

                            </div>

                            <div className='flex lg:flex-row flex-col'>

                                <span className='font-[600]'>. Cookies</span> : We use cookies to enhance user
                                experience and analyze site traffic.

                            </div>


                        </div>

                    </div>


                    <div className='flex flex-col w-full gap-4 text-left'>
                        <span className='text-xl font-[700] font-display'> How We Use Your Information</span>
                        <span className='text-lg font-[400] font-display'>We may use your information for the following purposes:
                        </span>
                        <div className='text-lg font-[500] font-display flex flex-col gap-6'>
                            <div className='flex flex-row'>

                                <span className='font-[600]'>. </span>&nbsp; To create and manage your account.

                            </div>

                            <div className='flex flex-row'>

                                <span className='font-[600]'>. </span>&nbsp; To facilitate job applications and connect you with employers.

                            </div>

                            <div className='flex flex-row'>

                                <span className='font-[600]'>. </span>&nbsp; To send you job alerts and updates about our services.

                            </div>

                            <div className='flex flex-row'>

                                <span className='font-[600]'>. </span>&nbsp; To improve our website and services based on user feedback.

                            </div>

                            <div className='flex flex-row'>

                                <span className='font-[600]'>. </span>&nbsp; To comply with legal obligations and protect our rights.

                            </div>


                        </div>

                    </div>


                    <div className='flex flex-col w-full gap-4 text-left'>
                        <span className='text-xl font-[700] font-display'> Sharing Your Information</span>
                        <span className='text-lg font-[400] font-display'>We do not sell or rent your personal information.
                            We may share your information with:
                        </span>
                        <div className='text-lg font-[500] font-display flex flex-col gap-6'>
                            <div className='flex flex-row'>

                                <span className='font-[600]'>. </span>&nbsp; Employers who are seeking candidates for job openings.

                            </div>

                            <div className='flex flex-row'>

                                <span className='font-[600]'>. </span>&nbsp; Third-party service providers who
                                assist us in operating our website and services.

                            </div>

                            <div className='flex flex-row'>

                                <span className='font-[600]'>. </span>&nbsp; Authorities if required by law.

                            </div>



                        </div>

                    </div>


                    <div className='flex flex-col w-full gap-4 text-left'>
                        <span className='text-xl font-[700] font-display'> Your Rights</span>
                        <span className='text-lg font-[400] font-display'>You have the right to:
                        </span>
                        <div className='text-lg font-[500] font-display flex flex-col gap-6'>
                            <div className='flex flex-row'>

                                <span className='font-[600]'>. </span>&nbsp; Access your personal information.

                            </div>

                            <div className='flex flex-row'>

                                <span className='font-[600]'>. </span>&nbsp; Request corrections to your personal information.

                            </div>

                            <div className='flex flex-row'>

                                <span className='font-[600]'>. </span>&nbsp; Request deletion of your personal information.

                            </div>

                            <div className='flex flex-row'>

                                <span className='font-[600]'>. </span>&nbsp; Opt-out of receiving marketing communications.

                            </div>



                        </div>

                    </div>


                    <div className='flex flex-col w-full gap-4 text-left'>
                    <span className='text-xl font-[700] font-display'>Contact Us</span>
                        <span className='text-xl font-[600] font-display'>RIYA HUB JOBS</span>
                        <div className='text-lg font-[400] font-display flex flex-col gap-6'>
                            <div className='flex flex-row'>

                                Email : <span className='font-[600]'>&nbsp;Riyahubjobs@gmail.com</span>

                            </div>

                            <div className='flex flex-row'>

                                Number :  <span className='font-[600]'>&nbsp;+91 9988774455</span>

                            </div>






                        </div>
                    </div>


                </div>

            </div>

            <Footer />
        </div>
    )
}

export default Privacy