import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import NavbarMob from './NavbarMob';
import Navbar from './Navbar';
import Footer from './Footer';
import Navbar2 from './Navbar2';

function CanApplied() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const employeeId = sessionStorage.getItem('employeeId');
    const customerName = sessionStorage.getItem('customerName');
    console.log(customerName);

    const [packageSelections, setPackageSelections] = useState([]);
    const [jobDetails, setJobDetails] = useState([]);
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    // Fetch package selections from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}/getPackageSelectionsByCustomerName/${customerName}`);
                const result = await response.json();

                if (result.message === "Data retrieved successfully") {
                    setPackageSelections(result.data);
                } else {
                    console.error("Error: ", result.message);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (customerName) {
            fetchData();
        }
    }, [customerName, apiBaseUrl]);

    // Fetch job details for each jobId and display under its respective jobId
    useEffect(() => {
        const fetchJobDetails = async (jobId) => {
            try {
                const response = await fetch(`${apiBaseUrl}/getjobposts/${jobId}`);
                const result = await response.json();

                if (result) {
                    setJobDetails(prevState => {
                        // Only add job details if it's not already in the state
                        if (!prevState.some(job => job.job_id === result.job_id)) {
                            return [...prevState, result];
                        }
                        return prevState;
                    });
                } else {
                    console.error("Error fetching job details.");
                }
            } catch (error) {
                console.error("Error fetching job details:", error);
            }
        };

        // Fetch job details for each job in packageSelections
        packageSelections.forEach(item => {
            if (item.jobId) {
                fetchJobDetails(item.jobId);
            }
        });
    }, [packageSelections]);

    // Create a set of jobIds with valid details from the second API
    const validJobIds = new Set(jobDetails.map(job => job.job_id));

    return (
        <div className='flex flex-col min-h-screen'>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>
            <div className='flex lg:px-12 px-3 py-12 flex-col min-h-screen bg-[#eeebeb]'>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {packageSelections
                        .filter(item => validJobIds.has(item.jobId))  // Only display items with valid job details
                        .map((item) => (
                            <div key={item.id} className="bg-white rounded-lg shadow-lg p-6">
                                {jobDetails.map((job) => {
                                    if (job.job_id === item.jobId) {
                                        return (
                                            <div key={job.job_id} className="mt-4">
                                                <h3 className="font-[700] font-display">
                                                    <strong>Job ID:</strong> {job.manualJobID && job.manualJobID !== "0" ? job.manualJobID : job.job_id}
                                                </h3>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CanApplied;
