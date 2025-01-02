import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import NavbarMob from './NavbarMob';
import Navbar from './Navbar';
import Footer from './Footer';
import Navbar2 from './Navbar2';
import { useNavigate } from 'react-router-dom';
import Navbar2Mob from './Navbar2Mob';


function AppliedCan() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const employeeId = sessionStorage.getItem('employeeId');
    const customerName = sessionStorage.getItem('customerName');
    const [jobDetails, setJobDetails] = useState({});
    const [packageSelections, setPackageSelections] = useState([]);
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();
    const customerType = sessionStorage.getItem('customerType');
    console.log("customerType :", customerType);


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

    const appliedCandidatesforall = () => {
        navigate('/appliedcanall');
    };

    return (
        <div className='flex flex-col min-h-screen'>
        {isMobile ? <NavbarMob /> : <Navbar />}
        <div className='md:flex hidden'>
            <Navbar2 />
        </div>
        <div className='md:hidden flex flex-col'>
            <Navbar2Mob />
            </div>
        <div className='flex lg:px-12 px-3 py-12 flex-col min-h-screen bg-[#eeebeb]'>
            {(customerType === 'admin' || customerType === 'mainAdmin') && (
                <li className="p-3 bg-gray-100 hover:bg-blue-200 rounded cursor-pointer text-center text-lg font-[400] font-display" onClick={appliedCandidatesforall}>
                    Applied Candidates for Other Jobs
                </li>
            )}
    
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
                {packageSelections.map((item) => {
                    const jobDetail = jobDetails[item.jobId];
    
                    // Only render the div if job details are available
                    return jobDetail ? (
                        <div key={item.id} className="bg-white rounded-lg shadow-lg p-6 text-left">
                            <h2 className="text-lg font-bold mb-2 font-display">{item.customerName}</h2>
                            <p className="text-gray-600 font-display">
                                <span className='font-[600]'>Job ID :</span> 
                                {jobDetail.manualJobID && jobDetail.manualJobID !== "0" ? jobDetail.manualJobID : jobDetail.job_id}
                            </p>
                            <p className="text-gray-500 font-display">
                                <span className='font-[600]'>Mobile Number :</span>  {item.mobileNumber}
                            </p>
                            <p className="text-gray-500 font-display">
                                <span className='font-[600]'>Whatsapp Number :</span>  {item.whatsappNumber}
                            </p>
                            <p className="text-gray-500 font-display">
                                <span className='font-[600]'>Email :</span>  {item.Email}
                            </p>
                        </div>
                    ) : null; // Renders nothing if job details are loading
                })}
            </div>
        </div>
        <Footer />
    </div>
    
    );
}

export default AppliedCan;
