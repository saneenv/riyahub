import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import NavbarMob from './NavbarMob';
import Navbar from './Navbar';
import Footer from './Footer';
import Navbar2 from './Navbar2';

function DeleteProfiles() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [candidates, setCandidates] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [candidateSearch, setCandidateSearch] = useState('');
    const [employeeSearch, setEmployeeSearch] = useState('');
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

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

    const handleDeleteCandidate = (candidateID) => {
        const confirmDelete = window.confirm("Are you sure you want to delete your profile?");
        if (!confirmDelete) return;

        fetch(`${apiBaseUrl}/deleteCandidate/${candidateID}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setCandidates(candidates.filter(candidate => candidate.CandidateID !== candidateID));
                } else {
                    console.error('Error deleting candidate:', data.message);
                }
            })
            .catch((error) => {
                console.error('Error deleting candidate:', error);
            });
    };

    const handleDeleteEmployee = (employeeID) => {
        const confirmDelete = window.confirm("Are you sure you want to delete your profile?");
        if (!confirmDelete) return;

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
    };

    const filteredCandidates = candidates.filter(candidate =>
        candidate.Name.toLowerCase().includes(candidateSearch.toLowerCase()) ||
        candidate.CandidateID.toString().includes(candidateSearch)
    );

    const filteredEmployees = employees.filter(employee =>
        employee.company_name.toLowerCase().includes(employeeSearch.toLowerCase()) ||
        employee.id.toString().includes(employeeSearch)
    );

    

    const handleBlockProfile = (blockedId, mobileNumber, profileType) => {
        const confirmBlock = window.confirm("Are you sure you want to block this profile?");
        if (!confirmBlock) return;
    
        // Updated payload keys to match backend expectations
        const payload = {
            blockedId,
            profileType,
            mobileNumber
        };
    
        fetch(`${apiBaseUrl}/blockProfile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert("Profile blocked successfully.");
            } else {
                console.error('Error blocking profile:', data.message);
            }
        })
        .catch((error) => {
            console.error('Error blocking profile:', error);
        });
    };
    

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>

            <div className='flex flex-col lg:px-12 px-3 py-10 space-y-8'>
                {/* Employees Section */}
                <div className="bg-[#d4d4d4] shadow-md rounded-lg p-6">
                    <h2 className="text-3xl font-semibold text-center  mb-6 font-display">Employers</h2>
                    <input
                        type="text"
                        placeholder="Search by name or ID"
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
                                    <div className="mt-4 flex justify-between">
                                        <button
                                            onClick={() => handleBlockProfile(employee.id, employee.mobile_number, "employee")}
                                            className="text-red-500 hover:text-red-700 font-semibold font-display"
                                        >
                                            Block
                                        </button>

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

                {/* Candidates Section */}
                <div className="bg-[#d4d4d4] shadow-md rounded-lg p-6">
                    <h2 className="text-3xl font-semibold text-center  mb-6 font-display">Candidates</h2>
                    <input
                        type="text"
                        placeholder="Search by name or ID"
                        value={candidateSearch}
                        onChange={(e) => setCandidateSearch(e.target.value)}
                        className="mb-4 w-full p-2 border rounded"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredCandidates.map((candidate) => (
                            <div key={candidate.CandidateID} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <div className="p-4 text-left">
                                    <h3 className="font-bold text-xl text-gray-800 font-display">{candidate.Name}</h3>
                                    <p className="text-gray-600 font-display">ID: {candidate.CandidateID}</p>
                                    <p className="text-gray-600 font-display">District: {candidate.District}</p>
                                    <p className="text-gray-600 font-display">Email: {candidate.Email}</p>
                                    <p className="text-gray-600 font-display">Mobile Number: {candidate.Mobile}</p>
                                    <div className="mt-4 flex justify-between">
                                        <button
                                            onClick={() => handleBlockProfile(candidate.CandidateID, candidate.Mobile, "candidate")}
                                            className="text-red-500 hover:text-red-700 font-semibold font-display"
                                        >
                                            Block
                                        </button>

                                        <button
                                            onClick={() => handleDeleteCandidate(candidate.CandidateID)}
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
