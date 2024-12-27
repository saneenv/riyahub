import React, { useState, useEffect } from 'react';
import NavbarMob from '../components/NavbarMob';
import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import { useMediaQuery } from 'react-responsive';
import Navbar2Mob from '../components/Navbar2Mob';

function EnablePackage() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    // State for customers and search query
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch customer data from the API
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}/getCandidates`);
                const data = await response.json();

                if (data.success) {
                    const currentDate = new Date();

                    const customerNames = data.candidates.map(candidate => {
                        const selectionDate = new Date(candidate.SelectionDate);
                        let selectedPlan = candidate.SelectedPlan;

                        // Reset selectedPlan based on expiration dates
                        if (selectedPlan === '300' && (currentDate - selectionDate) / (1000 * 60 * 60 * 24) >= 30) {
                            selectedPlan = null; // Reset if 30 days passed
                        } else if (selectedPlan === '500' && (currentDate - selectionDate) / (1000 * 60 * 60 * 24) >= 90) {
                            selectedPlan = null; // Reset if 90 days passed
                        } else if (selectedPlan === '600' && (currentDate - selectionDate) / (1000 * 60 * 60 * 24) >= 60) {
                            selectedPlan = null; // Reset if 60 days passed for 600 plan
                        } else if (selectedPlan === '800' && (currentDate - selectionDate) / (1000 * 60 * 60 * 24) >= 120) {
                            selectedPlan = null; // Reset if 120 days passed for 800 plan
                        }

                        return {
                            id: candidate.CandidateID,
                            name: candidate.Name,
                            selectedPlan, // Store the potentially updated selected plan
                        };
                    });

                    setCustomers(customerNames);
                }
            } catch (error) {
                console.error("Error fetching customer data:", error);
            }
        };

        fetchCustomers();
    }, []);

    // Filtered customers based on search term
    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.id.toString().includes(searchTerm)
    );
    

    // Function to handle checkbox changes
    const handleCheckboxChange = async (customerId, plan) => {
        // Determine the selected plan based on the checkbox clicked
        const selectedPlan = plan === '300' ? '300' : (plan === '500' ? '500' : (plan === '600' ? '600' : (plan === '800' ? '800' : null)));


        // Make a request to update the selected plan
        try {
            const response = await fetch(`${apiBaseUrl}/updateSelectedPlan`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: customerId, selectedPlan }),
            });

            const data = await response.json();
            if (data.success) {
                alert(`Plan ${selectedPlan} added to ${customers.find(customer => customer.id === customerId).name}`);
                window.location.reload();
            } else {
                console.error("Error updating selected plan:", data.message);
            }
        } catch (error) {
            console.error("Error sending update request:", error);
        }
    };

    return (
        <div className='min-h-screen flex flex-col'>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>
            <div className='md:hidden flex flex-col'>
            <Navbar2Mob />
            </div>

            <div className='lg:px-12 px-3 py-12 flex bg-[#eeebeb] w-full flex-col min-h-screen'>
                <input
                    type="text"
                    placeholder="Search by Candidate Id or Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded"
                />
                <table className='w-full bg-white border border-gray-200'>
                    <thead>
                        <tr className='bg-gray-100'>
                            <th className='lg:p-4 p-1 border lg:text-base text-xs'>ID</th>

                            <th className='lg:p-4 p-1 border lg:text-base text-xs font-display'>Customer Name</th>
                            <th className='lg:p-4 p-1 border lg:text-base text-xs font-display'>300 Plan</th>
                            <th className='lg:p-4 p-1 border lg:text-base text-xs font-display'>500 Plan</th>
                            <th className='lg:p-4 p-1 border lg:text-base text-xs font-display'>500 Plan (TVM/EKM)</th>
                            <th className='lg:p-4 p-1 border lg:text-base text-xs font-display'>800 Plan (TVM/EKM)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map(customer => (
                            <tr key={customer.id} className='text-center'>
                                <td className='lg:p-4 p-1 border font-display lg:text-base text-xs'>{customer.id}</td>

                                <td className='lg:p-4 p-1 border font-display lg:text-base text-xs'>{customer.name}</td>
                                <td className='lg:p-4 p-1 border'>
                                    <input
                                        type="checkbox"
                                        name={`300plan-${customer.id}`}
                                        checked={customer.selectedPlan === '300'} // Check if selected
                                        onChange={() => {
                                            // Uncheck the other plan if this one is checked
                                            if (customer.selectedPlan === '300') {
                                                handleCheckboxChange(customer.id, null); // Uncheck
                                            } else {
                                                handleCheckboxChange(customer.id, '300'); // Check 300
                                            }
                                        }}
                                    />
                                </td>
                                <td className='lg:p-4 p-1 border '>
                                    <input
                                        type="checkbox"
                                        name={`500plan-${customer.id}`}
                                        checked={customer.selectedPlan === '500'} // Check if selected
                                        onChange={() => {
                                            // Uncheck the other plan if this one is checked
                                            if (customer.selectedPlan === '500') {
                                                handleCheckboxChange(customer.id, null); // Uncheck
                                            } else {
                                                handleCheckboxChange(customer.id, '500'); // Check 500
                                            }
                                        }}
                                    />
                                </td>
                                <td className='lg:p-4 p-1 border'>
                                    <input
                                        type="checkbox"
                                        name={`600plan-${customer.id}`}
                                        checked={customer.selectedPlan === '600'} // Check if selected
                                        onChange={() => {
                                            // Uncheck the other plan if this one is checked
                                            if (customer.selectedPlan === '600') {
                                                handleCheckboxChange(customer.id, null); // Uncheck
                                            } else {
                                                handleCheckboxChange(customer.id, '600'); // Check 600
                                            }
                                        }}
                                    />
                                </td>
                                <td className='lg:p-4 p-1 border'>
                                    <input
                                        type="checkbox"
                                        name={`800plan-${customer.id}`}
                                        checked={customer.selectedPlan === '800'} // Check if selected
                                        onChange={() => {
                                            // Uncheck the other plan if this one is checked
                                            if (customer.selectedPlan === '800') {
                                                handleCheckboxChange(customer.id, null); // Uncheck
                                            } else {
                                                handleCheckboxChange(customer.id, '800'); // Check 800
                                            }
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Footer />
        </div>
    );
}

export default EnablePackage;
