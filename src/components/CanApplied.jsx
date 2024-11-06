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
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  

    // Fetch data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Update the endpoint to use the correct API for fetching package selections
                const response = await fetch(`${apiBaseUrl}/getPackageSelectionsByCustomerName/${customerName}`);
                const result = await response.json();
    
                if (result.message === "Data retrieved successfully") {
                    setPackageSelections(result.data);
                } else {
                    console.error("Error: ", result.message); // Log any message from the response
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        if (customerName) { // Check if customerName exists before making the fetch call
            fetchData();
        }
    }, [customerName, apiBaseUrl]);
    
    return (
        <div className='flex flex-col min-h-screen'>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>
            <div className='flex lg:px-12 px-3 py-12 flex-col min-h-screen bg-[#eeebeb]'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packageSelections.map((item) => (
                        <div key={item.id} className="bg-white rounded-lg shadow-lg p-6">
                            {/* <h2 className="text-lg font-bold mb-2">{item.customerName}</h2> */}
                            <p className=" font-[700] font-display">Job ID: {item.jobId}</p>
                            {/* <p className="text-gray-500">Mobile Number: {item.mobileNumber}</p>
                            <p className="text-gray-500">Whatsapp Number: {item.whatsappNumber}</p>
                            <p className="text-gray-500">Email: {item.Email}</p> */}

                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CanApplied;
