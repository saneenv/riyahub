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
    const [customPlanDays, setCustomPlanDays] = useState({}); // Object to hold custom days for each customer

    // Fetch customer data from the API
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}/getCandidatesplan`);
                const data = await response.json();

                if (data.success) {
                    const currentDate = new Date();

                    const customerNames = data.candidates.map(candidate => {
                        const selectionDate = new Date(candidate.SelectionDate);
                        let selectedPlan = candidate.SelectedPlan;

                        // Reset selectedPlan based on expiration dates
                        if (selectedPlan === '300' && (currentDate - selectionDate) / (1000 * 60 * 60 * 24) >= 30) {
                            selectedPlan = null;
                        } else if (selectedPlan === '500' && (currentDate - selectionDate) / (1000 * 60 * 60 * 24) >= 90) {
                            selectedPlan = null;
                        } else if (selectedPlan === '600' && (currentDate - selectionDate) / (1000 * 60 * 60 * 24) >= 60) {
                            selectedPlan = null;
                        } else if (selectedPlan === '800' && (currentDate - selectionDate) / (1000 * 60 * 60 * 24) >= 120) {
                            selectedPlan = null;
                        }

                        return {
                            id: candidate.CandidateID,
                            name: candidate.Name,
                            Mobile: candidate.Mobile,
                            selectedPlan,
                            planDays: candidate.PlanDays || null // Get PlanDays if it exists, else null
                        };
                    });

                    // Set customers state
                    setCustomers(customerNames);

                    // Set initial customPlanDays state based on PlanDays value
                    const initialCustomPlanDays = customerNames.reduce((acc, customer) => {
                        if (customer.planDays) {
                            acc[customer.id] = customer.planDays;
                        }
                        return acc;
                    }, {});
                    setCustomPlanDays(initialCustomPlanDays); // Set initial custom plan days state
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
        customer.id.toString().includes(searchTerm) ||
        customer.Mobile.toString().includes(searchTerm)

    );

    // Function to handle checkbox changes
    const handleCheckboxChange = async (customerId, plan, days = null) => {
        const parsedDays = days ? parseInt(days, 10) : null;
        if (plan === '0' && (isNaN(parsedDays) || parsedDays <= 0)) {
            alert('Please enter a valid number of days for the custom plan.');
            return;
        }

        const selectedPlan = plan === '300' ? '300' :
            (plan === '500' ? '500' :
                (plan === '600' ? '600' :
                    (plan === '800' ? '800' :
                        (plan === '0' ? '0' : null))));

        const customSelectedPlan = (plan === '0' && parsedDays) ? { plan: '0', days: parsedDays } : { plan: selectedPlan };

        try {
            const response = await fetch(`${apiBaseUrl}/updateSelectedPlan`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: customerId,
                    selectedPlan: customSelectedPlan.plan,
                    days: customSelectedPlan.days
                }),
            });

            const data = await response.json();
            if (data.success) {
                alert(`Plan ${customSelectedPlan.plan} added to ${customers.find(customer => customer.id === customerId).name}`);
                window.location.reload(); // Refresh page after successful update
            } else {
                console.error("Error updating selected plan:", data.message);
            }
        } catch (error) {
            console.error("Error sending update request:", error);
        }
    };

    const handleCustomPlanInputChange = (customerId, value) => {
        const numericValue = value ? parseInt(value, 10) : '';
        setCustomPlanDays(prevState => ({
            ...prevState,
            [customerId]: numericValue,
        }));
    };
    


    return (
        <div className="min-h-screen flex flex-col">
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className="md:flex hidden">
                <Navbar2 />
            </div>
            <div className="md:hidden flex flex-col">
                <Navbar2Mob />
            </div>

            <div className="lg:px-12 px-3 py-12 flex bg-[#eeebeb] w-full flex-col min-h-screen">
                <input
                    type="text"
                    placeholder="Search by Candidate Id, Name or Number"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded"
                />
                <table className="w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="lg:p-4 p-1 border lg:text-base text-xs">ID</th>
                            <th className="lg:p-4 p-1 border lg:text-base text-xs font-display">Customer Name</th>
                            <th className="lg:p-4 p-1 border lg:text-base text-xs font-display">Mobile Number</th>
                            <th className="lg:p-4 p-1 border lg:text-base text-xs font-display">300 Plan</th>
                            <th className="lg:p-4 p-1 border lg:text-base text-xs font-display">500 Plan</th>
                            <th className="lg:p-4 p-1 border lg:text-base text-xs font-display">500 Plan (TVM/EKM)</th>
                            <th className="lg:p-4 p-1 border lg:text-base text-xs font-display">800 Plan (TVM/EKM)</th>
                            <th className="lg:p-4 p-1 border lg:text-base text-xs font-display">Custom Plan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map(customer => (
                            <tr key={customer.id} className="text-center">
                                <td className="lg:p-4 p-1 border font-display lg:text-base text-xs">{customer.id}</td>
                                <td className="lg:p-4 p-1 border font-display lg:text-base text-xs">{customer.name}</td>
                                <td className="lg:p-4 p-1 border font-display lg:text-base text-xs">{customer.Mobile}</td>

                                <td className="lg:p-4 p-1 border">
                                    <input
                                        type="checkbox"
                                        name={`300plan-${customer.id}`}
                                        checked={customer.selectedPlan === '300'}
                                        onChange={() => handleCheckboxChange(customer.id, '300')}
                                    />
                                </td>
                                <td className="lg:p-4 p-1 border">
                                    <input
                                        type="checkbox"
                                        name={`500plan-${customer.id}`}
                                        checked={customer.selectedPlan === '500'}
                                        onChange={() => handleCheckboxChange(customer.id, '500')}
                                    />
                                </td>
                                <td className="lg:p-4 p-1 border">
                                    <input
                                        type="checkbox"
                                        name={`600plan-${customer.id}`}
                                        checked={customer.selectedPlan === '600'}
                                        onChange={() => handleCheckboxChange(customer.id, '600')}
                                    />
                                </td>
                                <td className="lg:p-4 p-1 border">
                                    <input
                                        type="checkbox"
                                        name={`800plan-${customer.id}`}
                                        checked={customer.selectedPlan === '800'}
                                        onChange={() => handleCheckboxChange(customer.id, '800')}
                                    />
                                </td>
                                <td className="lg:p-4 p-1 border">
                                    <input
                                        type="number"
                                        value={customPlanDays[customer.id] || ''}
                                        onChange={(e) => handleCustomPlanInputChange(customer.id, e.target.value)}
                                         placeholder="Custom Days"
                                        className="p-1 border"
                                    />

                                    <button
                                        onClick={() => handleCheckboxChange(customer.id, '0', customPlanDays[customer.id])}
                                        className="ml-2 p-2 bg-blue-500 text-white rounded"
                                    >
                                        Set Custom Plan
                                    </button>
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
