import React from 'react';
import { useNavigate } from 'react-router-dom';

function CandidateOpt({ closeOptions }) {
    const navigate = useNavigate();
    const companyName = sessionStorage.getItem('customerName');
    const employeeId = sessionStorage.getItem('employeeId');

    // const home = () => {
    //     navigate('/home'); 
    //   };

    const matchjob = () => {
        navigate('/matchingjobs');
    };

    const canapplied = () => {
        navigate('/canapplied');
    };

    const viewProfile = () => {
        navigate('/viewcandidate');
    };

    const packages = () => {
        navigate('/packages');
    };

    const login = () => {
        // Remove session storage items
        sessionStorage.removeItem('employeeId');
        sessionStorage.removeItem('customerName');
        sessionStorage.removeItem('customerType');
        sessionStorage.removeItem('preferredJob');
        sessionStorage.removeItem('preferredLocation');
        sessionStorage.removeItem('jobType');
        sessionStorage.removeItem('preferredLocation');
        sessionStorage.removeItem('gender');
        sessionStorage.removeItem('mobileNumber');
        sessionStorage.removeItem('whatsappNumber');



        // Navigate to login page
        navigate('/login');
    };

   


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-[90%] max-w-md rounded-lg shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold font-display">Candidate Options</h2>
                    <button onClick={closeOptions} className="text-gray-500 hover:text-red-500 text-2xl">&times;</button>
                </div>
                <ul className="space-y-4">
                    {/* <li className="p-3 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-center" onClick={home}>Home</li> */}
                    <li className="p-3 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-center text-lg font-[400] font-display" onClick={matchjob}>Matching Jobs</li>
                    <li className="p-3 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-center text-lg font-[400] font-display" onClick={canapplied}>Applied Jobs</li>
                    {/* <li className="p-3 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-center">Viewed Jobs</li> */}
                    <li className="p-3 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-center text-lg font-[400] font-display" onClick={packages}>Packages</li>
                    <li className="p-3 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-center text-lg font-[400] font-display" onClick={viewProfile}>View Profile</li>
                    <li className="p-3 bg-gray-100 hover:bg-[#E22E37] hover:text-[white] rounded cursor-pointer text-center text-lg font-[400] font-display" onClick={login}>Logout</li>
                </ul>
            </div>
        </div>
    );
}

export default CandidateOpt;
