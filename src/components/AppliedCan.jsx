import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import NavbarMob from './NavbarMob';
import Navbar from './Navbar';
import Footer from './Footer';
import Navbar2 from './Navbar2';

function AppliedCan() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const employeeId = sessionStorage.getItem('employeeId');
    const customerName = sessionStorage.getItem('customerName');
    const [jobDetails, setJobDetails] = useState({});
    const [packageSelections, setPackageSelections] = useState([]);
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    // Fetch data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}/getPackageSelections/${employeeId}`);
                const result = await response.json();
                if (result.message === "Data retrieved successfully") {
                    setPackageSelections(result.data);
                    result.data.forEach(item => fetchJobDetails(item.jobId));
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [employeeId]);

    // Function to fetch job details based on jobId
    const fetchJobDetails = async (jobId) => {
        try {
            const response = await fetch(`${apiBaseUrl}/getjobposts/${jobId}`);
            const result = await response.json();
            setJobDetails(prevDetails => ({ ...prevDetails, [jobId]: result }));
        } catch (error) {
            console.error("Error fetching job details:", error);
        }
    };

    return (
        <div className='flex flex-col min-h-screen'>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>
            <div className='flex lg:px-12 px-3 py-12 flex-col min-h-screen bg-[#eeebeb]'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packageSelections.map((item) => {
                        const jobDetail = jobDetails[item.jobId];
                        return (
                            <div key={item.id} className="bg-white rounded-lg shadow-lg p-6 text-left">
                                <h2 className="text-lg font-bold mb-2 font-display">{item.customerName}</h2><br/>
                                {jobDetail ? (
                                    <>
                                        <p className="text-gray-600 font-display"><span className='font-[600]'>Job ID :</span> {jobDetail.manualJobID && jobDetail.manualJobID !== "0" ? jobDetail.manualJobID : jobDetail.job_id}</p>
                                       
                                    </>
                                ) : (
                                    <p>Loading job details...</p>
                                )}
                                <p className="text-gray-500 font-display"><span className='font-[600]'>Mobile Number :</span>  {item.mobileNumber}</p>
                                <p className="text-gray-500 font-display"><span className='font-[600]'>Whatsapp Number :</span>  {item.whatsappNumber}</p>
                                <p className="text-gray-500 font-display"><span className='font-[600]'>Email :</span>  {item.Email}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AppliedCan;
