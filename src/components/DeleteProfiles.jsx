import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import NavbarMob from './NavbarMob';
import Navbar from './Navbar';
import Footer from './Footer';
import Navbar2 from './Navbar2';
import Navbar2Mob from './Navbar2Mob';

function DeleteProfiles() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [candidates, setCandidates] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [employeeSearch, setEmployeeSearch] = useState('');
    const [blockedProfiles, setBlockedProfiles] = useState([]);

    const navigate = useNavigate();
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const customerType = sessionStorage.getItem('customerType');


    useEffect(() => {
        // Fetch candidates data
        fetch(`${apiBaseUrl}/getAllCandidates`)
            .then((response) => response.json())
            .then((data) => {
                setCandidates(data);
            })
            .catch((error) => {
                console.error('Error fetching candidates:', error);
            });

        // Fetch employees data
        fetch(`${apiBaseUrl}/getAllEmployees`)
            .then((response) => response.json())
            .then((data) => {
                setEmployees(data);
            })
            .catch((error) => {
                console.error('Error fetching employees:', error);
            });


    }, []);

    useEffect(() => {
        fetch(`${apiBaseUrl}/getBlockedProfiles`)
            .then((response) => response.json())
            .then((data) => {
                // normalize keys
                const normalized = data.map(profile => ({
                    blockedId: profile.BlockedId,
                    profileType: profile.ProfileType,
                    mobileNumber: profile.MobileNumber,
                }));
                setBlockedProfiles(normalized);
            })
            .catch((error) => {
                console.error('Error fetching blocked profiles:', error);
            });
    }, []);





    const handleDeleteEmployee = (employeeID) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this employee's profile and all associated job posts?");
        if (!confirmDelete) return;

        // First, delete all job posts associated with the employee
        fetch(`${apiBaseUrl}/jobposts/${employeeID}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((jobPostData) => {
                if (jobPostData.success) {
                    // Proceed to delete the employee's profile after job posts deletion
                    fetch(`${apiBaseUrl}/employee/delete/${employeeID}`, {
                        method: 'DELETE',
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.success) {
                                setEmployees(employees.filter(employee => employee.id !== employeeID));
                            } else {
                                console.error('Error deleting employee:', data.message);
                            }
                        })
                        .catch((error) => {
                            console.error('Error deleting employee:', error);
                        });
                } else {
                    console.error('Error deleting job posts:', jobPostData.message || 'No job posts found for this employee');
                }
            })
            .catch((error) => {
                console.error('Error deleting job posts:', error);
            });
    };



    const filteredEmployees = employees.filter(employee =>
        employee.company_name.toLowerCase().includes(employeeSearch.toLowerCase()) ||
        employee.id.toString().includes(employeeSearch) ||
        employee.mobile_number.toString().includes(employeeSearch) // Added mobile number search
    );



    const handleBlockProfile = (blockedId, mobileNumber, profileType) => {
        const confirmBlock = window.confirm("Are you sure you want to block this profile?");
        if (!confirmBlock) return;

        const payload = { blockedId, profileType, mobileNumber };

        fetch(`${apiBaseUrl}/blockProfile`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert("Profile blocked successfully.");
                    setBlockedProfiles([...blockedProfiles, { blockedId, profileType, mobileNumber }]);
                }

            })
            .catch((error) => {
                console.error('Error blocking profile:', error);
            });
    };

    const handleUnblockProfile = (blockedId, mobileNumber) => {
        const confirmUnblock = window.confirm("Are you sure you want to unblock this profile?");
        if (!confirmUnblock) return;

        fetch(`${apiBaseUrl}/unblockProfile`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ blockedId, mobileNumber }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert("Profile unblocked successfully.");
                    setBlockedProfiles(blockedProfiles.filter(profile =>
                        !(profile.blockedId === blockedId && profile.mobileNumber === mobileNumber)
                    ));

                }
            })
            .catch((error) => {
                console.error('Error unblocking profile:', error);
            });
    };


    const isBlocked = (id, mobile) =>
        blockedProfiles.some(profile =>
            profile.blockedId === id && profile.mobileNumber === mobile
        );




    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>
            <div className='md:hidden flex flex-col'>
                <Navbar2Mob />
            </div>

            <div className='flex flex-col lg:px-12 px-3 py-10 space-y-8'>
                {/* Employees Section */}
                <div className="bg-[#d4d4d4] shadow-md rounded-lg p-6">
                    <h2 className="text-3xl font-semibold text-center  mb-6 font-display">Employers</h2>
                    <input
                        type="text"
                        placeholder="Search by Name, ID or Mobile Number"
                        value={employeeSearch}
                        onChange={(e) => setEmployeeSearch(e.target.value)}
                        className="mb-4 w-full p-2 border rounded"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredEmployees.map((employee) => (
                            <div key={employee.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <div className="p-4 text-left">
                                    <h3 className="font-bold text-xl text-gray-800 font-display">{employee.company_name}</h3>
                                    <p className="text-gray-600 font-display">ID: {employee.id}</p>
                                    <p className="text-gray-600 font-display">District: {employee.company_district}</p>
                                    <p className="text-gray-600 font-display">Email: {employee.email}</p>
                                    <p className="text-gray-600 font-display">Mobile Number: {employee.mobile_number}</p>
                                    {customerType === 'mainAdmin' && (
                                        <p className="text-gray-600 font-display">Password: {employee.password}</p>
                                    )}
                                    <div className="mt-4 flex justify-between">
                                        {isBlocked(employee.id, employee.mobile_number) ? (
                                            <button
                                                onClick={() => handleUnblockProfile(employee.id, employee.mobile_number)}
                                                className="text-green-600 hover:text-green-800 font-semibold font-display"
                                            >
                                                Unblock
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleBlockProfile(employee.id, employee.mobile_number, "employee")}
                                                className="text-red-500 hover:text-red-700 font-semibold font-display"
                                            >
                                                Block
                                            </button>
                                        )}

                                        {customerType === 'mainAdmin' && (
                                            <button
                                                onClick={() => navigate(`/change-password/${employee.id}`)}
                                                className="text-red-500 hover:text-red-700 font-semibold font-display"
                                            >
                                                Change Password
                                            </button>
                                        )}

                                        <button
                                            onClick={() => handleDeleteEmployee(employee.id)}
                                            className="text-red-500 hover:text-red-700 font-semibold font-display"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>

            <Footer />
        </div>
    );
}

export default DeleteProfiles;
