import React from 'react'
import Footer from '../components/Footer';
import Navbar2 from '../components/Navbar2';
import Navbar from '../components/Navbar'
import NavbarMob from '../components/NavbarMob';
import { useMediaQuery } from 'react-responsive';



function Services() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return (
        <div className='min-h-screen flex flex-col '>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>

            <div className='lg:px-12 px-3 py-12 flex flex-col gap-8'>
                <span className='text-4xl font-[700] font-display text-[#E22E37]'>Services</span>
                <span className='text-lg font-[400] font-display'>Welcome to RIYA HUB JOBS , where we connect talent with opportunity.
                    Our platform offers a comprehensive suite of services designed to help job seekers
                    and employers thrive in a dynamic job market.</span>

                <div className='flex flex-col gap-5'>
                    <span className='text-2xl font-[500] font-display  text-left'>For Job Seekers</span>
                    <span className='text-lg font-[400] font-display text-left'>Whether you're a recent graduate or a seasoned professional,
                        we provide a range of tools to help you land your next job.</span>

                    <span className='text-2xl font-[500] font-display  text-left'>1. Job Search</span>
                    <span className='text-lg font-[500] font-display text-left'>. Browse thousands of job
                        listings across various industries, locations, and job types.</span>
                    <span className='text-lg font-[500] font-display text-left'>. Customize your search with filters like
                        salary range, experience level, job function, and more.</span>
                    <span className='text-lg font-[500] font-display text-left'>. Stay updated with real-time alerts
                        for new job postings that match your profile.</span>



              


                    <span className='text-2xl font-[500] font-display  text-left'>2. Job Matching & Recommendations</span>
                    <span className='text-lg font-[500] font-display text-left'>. Our advanced algorithm suggests jobs based on your skills,
                        experience, and preferences.</span>
                    <span className='text-lg font-[500] font-display text-left'>. Receive personalized job alerts to keep you informed of the best
                        opportunities for you.</span>


                



                    <span className='text-2xl font-[500] font-display  text-left'>3. Job Alerts</span>
                    <span className='text-lg font-[500] font-display text-left'>. Never miss an opportunity! Set up job alerts and receive
                        notifications for positions that match your qualifications.</span>
                    <span className='text-lg font-[500] font-display text-left'>. Customize alert preferences to suit your career goals.</span>
          
                </div>


                <div className='flex flex-col gap-5'>
                    <span className='text-2xl font-[500] font-display  text-left'>For Employers</span>
                    <span className='text-lg font-[400] font-display text-left'>Find the best talent with ease. Our platform offers
                        flexible and powerful tools to streamline your recruitment process.</span>

                    <span className='text-2xl font-[500] font-display  text-left'>1. Job Posting</span>
                    <span className='text-lg font-[500] font-display text-left'>. Post your job openings and reach a wide
                        audience of qualified candidates.</span>
                    <span className='text-lg font-[500] font-display text-left'>. Customize your listings with detailed job descriptions,
                        required skills, and other criteria.</span>
                    <span className='text-lg font-[500] font-display text-left'>. Manage multiple job postings from a
                        single dashboard.</span>



    



                    <span className='text-2xl font-[500] font-display  text-left'>2. Candidate Search & Database</span>
                    <span className='text-lg font-[500] font-display text-left'>. Search through a vast pool of pre-screened candidates
                        using advanced filters.</span>
                    <span className='text-lg font-[500] font-display text-left'>. Access resumes and profiles to find the best
                        matches for your open roles.</span>


                
                </div>



                <div className='flex flex-col gap-5'>
                    <span className='text-2xl font-[500] font-display  text-left'>Why Choose Us?</span>

                    <span className='text-lg font-[500] font-display text-left'>. Whether you're looking for your next career move
                        or seeking top talent for your team, RIYA HUB JOBS is here to help.</span>
                    <span className='text-lg font-[500] font-display text-left'>. For Job Seekers:&nbsp; 
                        <span className='text-[#E22E37]'>Sign up now</span> and
                        start applying for jobs today.</span>
                    <span className='text-lg font-[500] font-display text-left'>. For Employers:&nbsp; 
                        <span className='text-[#E22E37]'>Post a job</span>  and connect
                        with the best candidates in no time.</span>
                </div>



                <div className='flex flex-col gap-5 pt-12'>
                 
                    <span className='text-lg font-[500] font-display text-left'>. If you need help or have any questions, 
                        feel free to contact us. We’re here to support your journey!</span>
                  
                </div>



            </div>

            <div className='mt-12'>
                <Footer />
            </div>

        </div>

    )
}

export default Services