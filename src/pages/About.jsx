import React, { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive';
import NavbarMob from '../components/NavbarMob';
import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';


function About() {
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

                <div className='w-full flex justify-center items-center text-[#E22E37] text-3xl font-[700] font-display'>About Us</div>

                <div className='w-full flex flex-col gap-10'>
                    <div className='flex flex-col w-full gap-4 text-left'>
                        <span className='text-xl font-[700] font-display'>Welcome to RIYA HUB JOBS</span>
                        <span className='text-lg font-[400] font-display'>At RIYA HUB JOBS, we believe that
                            finding the right job should be a seamless
                            and empowering experience. Our mission is
                            to connect talented individuals with exceptional opportunities,
                            bridging the gap between job seekers and employers across various industries.</span>
                    </div>



                    <div className='flex flex-col w-full gap-4 text-left'>
                        <span className='text-xl font-[700] font-display'>Who We Are</span>
                        <span className='text-lg font-[400] font-display'>RIYA HUB JOBS was created with
                            a simple vision: to simplify the job search process.
                            Our team is passionate about helping people find fulfilling careers while assisting
                            companies in building strong, diverse teams.
                        </span>
                    </div>


                    <div className='flex flex-col w-full gap-4 text-left'>
                        <span className='text-xl font-[700] font-display'>What We Offer</span>
                        <div className='text-lg font-[400] font-display flex flex-col gap-6'>
                            <div className='flex lg:flex-row flex-col'>

                                <span className='font-[600]'>. Comprehensive Job Listings</span> : We feature a wide
                                range of job opportunities from top companies,
                                catering to various skills and experience levels.

                            </div>

                            <div className='flex lg:flex-row flex-col'>

                                <span className='font-[600]'>. User-Friendly Platform</span> : Our intuitive interface
                                makes it easy for job seekers to search, filter, and apply for positions that match their interests.

                            </div>

                            <div className='flex lg:flex-row flex-col'>

                                <span className='font-[600]'>. Resources & Support</span> : We provide valuable resources,
                                including resume tips, interview advice, and career development articles, to support your job search journey.

                            </div>

                            <div className='flex lg:flex-row flex-col'>

                                <span className='font-[600]'>. Employer Solutions</span> : We help businesses
                                find the right talent through our targeted job postings and recruitment services.

                            </div>


                        </div>
                    </div>


                    <div className='flex flex-col w-full gap-4 text-left'>
                        <span className='text-xl font-[700] font-display'>Our Value</span>
                        <div className='text-lg font-[400] font-display flex flex-col gap-6'>
                            <div className='flex lg:flex-row flex-col'>

                                <span className='font-[600]'>. Integrity</span> : We operate with transparency and honesty,
                                ensuring a trustworthy experience for both job seekers and employers.

                            </div>

                            <div className='flex lg:flex-row flex-col'>

                                <span className='font-[600]'>. Innovation</span> :  We continuously improve our platform
                                to meet the evolving needs of the job market.

                            </div>

                            <div className='flex lg:flex-row flex-col'>

                                <span className='font-[600]'>. Community</span> :  We foster a supportive environment for
                                job seekers and employers alike, encouraging collaboration and growth.

                            </div>




                        </div>
                    </div>


                    <div className='flex flex-col w-full gap-4 text-left'>
                        <span className='text-xl font-[700] font-display'>Join Us on This Journey</span>
                        <span className='text-lg font-[400] font-display'>Whether you’re a job seeker looking for your next
                            opportunity or an employer seeking
                            the perfect candidate,  RIYA HUB JOBS is here to help.
                            Explore our platform today and take the next step in your career journey!</span>


                        <span className='text-lg font-[400] font-display'>For any questions or feedback,
                            feel free to reach out to us at</span>
                    </div>


                    <div className='flex flex-col w-full gap-4 text-left'>
                        <span className='text-xl font-[700] font-display'>RIYA HUB JOBS</span>
                        <div className='text-lg font-[400] font-display flex flex-col gap-6'>
                            <div className='flex flex-row'>

                             Email : <span className='font-[600]'>&nbsp;riyahub4u@gmail.com</span>

                            </div>

                            <div className='flex flex-row'>

                            Number :  <span className='font-[600]'>&nbsp;+91 9544500746</span>

                            </div>

                     




                        </div>
                    </div>


                </div>

            </div>

            <Footer />
        </div>
    )
}

export default About