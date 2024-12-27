import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import NavbarMob from './NavbarMob';
import Navbar from './Navbar';
import Footer from './Footer';
import Navbar2 from './Navbar2';
import Navbar2Mob from './Navbar2Mob';

function AppliedCanAll() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // State for search input
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();

    // Fetch data using fetch API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}/getAllPackageSelections`);
                const result = await response.json();
                if (result.message === "Data fetched successfully") {
                    setData(result.data.reverse()); // Reverse the order of data here
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);

    // Handle search input changes
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filtered data based on search term
    const filteredData = data.filter(item =>
        (!item.employeeId.startsWith('s')) && // Filter out rows with employeeId starting with "s"
        (String(item.employeeId).toLowerCase().includes(searchTerm.toLowerCase()) ||
         String(item.jobId).toLowerCase().includes(searchTerm.toLowerCase()) ||
         String(item.customerName).toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Navigate to /companydetails with employeeId as state
    const handleEmployeeIdClick = (employeeId) => {
        navigate('/companydetails', { state: { employeeId } });
    };

    return (
        <div className='flex flex-col min-h-screen bg-[white]'>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>
            <div className='md:hidden flex flex-col'>
            <Navbar2Mob />
            </div>

            <div className='flex flex-col items-center lg:px-12 px-3 py-12 min-h-screen bg-[#eeebeb]'>
                <h1 className="lg:text-2xl text-xl font-bold text-gray-800 mb-8 font-display">Applied Candidates for Other Jobs</h1>

                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search by Job ID, Employee ID or Candidate Name"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="mb-8 p-2 border border-gray-300 rounded-lg w-full max-w-md"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {filteredData.map((item) => (
                        <div key={item.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-left">
                            <h2 className="text-lg font-bold text-gray-900 mb-2 font-display">{item.customerName}</h2>
                            <p className="text-gray-600 mb-1 font-display"><strong>Job ID:</strong> {item.jobId}</p>
                            <p
                                className="text-blue-600 mb-1 font-display cursor-pointer underline hover:text-[#3333b1]"
                                onClick={() => handleEmployeeIdClick(item.employeeId)}
                            >
                                <strong>Employee ID:</strong> {item.employeeId}
                            </p>
                            <p className="text-gray-600 mb-1 font-display"><strong>Mobile:</strong> {item.mobileNumber}</p>
                            <p className="text-gray-600 mb-1 font-display"><strong>WhatsApp:</strong> {item.whatsappNumber}</p>
                            <p className="text-gray-600 mb-1 font-display"><strong>Email:</strong> {item.Email}</p>
                            <p className="text-gray-600 font-display">
                                <strong>Applied Date:</strong> {new Date(item.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default AppliedCanAll;
