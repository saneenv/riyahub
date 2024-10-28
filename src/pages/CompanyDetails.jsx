import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import NavbarMob from '../components/NavbarMob';
import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import call from '../images/viewprofile/call.png';
import wa from '../images/viewprofile/Whatsapp.png';



function CompanyDetails() {
    const location = useLocation();
    const employeeId = location.state?.employeeId;

    console.log("Received employeeId:", employeeId);

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const [employeeData, setEmployeeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch employee data when component mounts
    useEffect(() => {
        fetch(`${apiBaseUrl}/employee/${employeeId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Employee not found');
                }
                return response.json();
            })
            .then((data) => {
                setEmployeeData(data.employee);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [employeeId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='min-h-screen flex flex-col'>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>
            <div className='lg:px-12 px-3 py-12 w-full h-auto gap-6 flex flex-col min-h-screen'>
                <div className='div w-full flex flex-col gap-3'>
                    <div className='flex lg:flex-row flex-col h-[56px] border-2 border-[#E3EAF1] w-full rounded-[10px]'>
                        <div className='lg:w-[30%] w-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3 items-center'>
                            
                            <span className='text-[#B3B3B3] text-xl font-[500] font-[display]'>Company Name</span>
                        </div>
                        <div className='lg:w-[70%] w-full  flex px-5 items-center'>
                            {employeeData?.company_name || 'No mobile number available'}
                        </div>
                    </div>
                    <div className='flex lg:flex-row flex-col h-[56px] border-2 border-[#E3EAF1] w-full rounded-[10px]'>
                        <div className='lg:w-[30%] w-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3 items-center'>
                            
                            <span className='text-[#B3B3B3] text-xl font-[500] font-[display]'>Email</span>
                        </div>
                        <div className='lg:w-[70%] w-full  flex px-5 items-center'>
                            {employeeData?.email || 'No mobile number available'}
                        </div>
                    </div>
                    <div className='flex lg:flex-row flex-col h-[56px] border-2 border-[#E3EAF1] w-full rounded-[10px]'>
                        <div className='lg:w-[30%] w-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3 items-center'>
                            <img src={call} alt="call" />
                            <span className='text-[#B3B3B3] text-xl font-[500] font-[display]'>Mobile Number</span>
                        </div>
                        <div className='lg:w-[70%] w-full  flex px-5 items-center'>
                            {employeeData?.mobile_number || 'No mobile number available'}
                        </div>
                    </div>
                    <div className='flex lg:flex-row flex-col h-[56px] border-2 border-[#E3EAF1] w-full rounded-[10px]'>
                        <div className='lg:w-[30%] w-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3 items-center'>
                            <img src={wa} alt="Whatsapp" />
                            <span className='text-[#B3B3B3] text-xl font-[500] font-[display]'>Whatsapp Number</span>
                        </div>
                        <div className='lg:w-[70%] w-full flex px-5 items-center'>
                            {employeeData?.whatsapp_number || 'No Whatsapp number available'}
                        </div>
                    </div>
                    <div className='flex lg:flex-row flex-col h-[56px] border-2 border-[#E3EAF1] w-full rounded-[10px]'>
                        <div className='lg:w-[30%] w-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3 items-center'>
                            <span className='text-[#B3B3B3] text-xl font-[500] font-[display]'>Company District</span>
                        </div>
                        <div className='lg:w-[70%] w-full flex px-5 items-center'>
                            {employeeData?.company_district || 'No district available'}
                        </div>
                    </div>
                    <div className='flex lg:flex-row flex-col h-[56px] border-2 border-[#E3EAF1] w-full rounded-[10px]'>
                        <div className='lg:w-[30%] w-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3 items-center'>
                            <span className='text-[#B3B3B3] text-xl font-[500] font-[display]'>Address</span>
                        </div>
                        <div className='lg:w-[70%] w-full flex px-5 items-center'>
                            {employeeData?.address || 'No address available'}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CompanyDetails