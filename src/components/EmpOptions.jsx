import React from 'react';
import { useNavigate } from 'react-router-dom';

function EmpOptions({ closeOptions }) {
  const navigate = useNavigate();


  // const home = () => {
  //     navigate('/home'); 
  //   };

  const jobpost = () => {
    navigate('/jobpost');
  };

  const postedjob = () => {
    navigate('/postedjob');
  };

  const viewProfile = () => {
    navigate('/viewprofile');
  };

  const enablePage = () => {
    navigate('/enablepackage');
  };

  const appliedCandidates = () => {
    navigate('/appliedcan');
  };

  const login = () => {
    // Remove session storage items
    sessionStorage.removeItem('employeeId');
    sessionStorage.removeItem('customerName');
    sessionStorage.removeItem('houseName');
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
          <h2 className="text-xl font-semibold font-display">Employee Options</h2>
          <button onClick={closeOptions} className="text-gray-500 hover:text-red-500 text-2xl">&times;</button>
        </div>
        <ul className="space-y-4">
          {/* <li className="p-3 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-center" onClick={home}>Home</li> */}
          <li className="p-3 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-center text-lg font-[400] font-display" onClick={jobpost}>Post Job</li>
          <li className="p-3 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-center text-lg font-[400] font-display" onClick={postedjob}>View Posted Jobs</li>
          {/* <li className="p-3 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-center">Search Candidates</li> */}
          {/* <li className="p-3 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-center">Selected Candidates</li> */}
          <li className="p-3 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-center text-lg font-[400] font-display" onClick={appliedCandidates}>Applied Candidates</li>
          <li className="p-3 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-center text-lg font-[400] font-display" onClick={viewProfile}>View Profile</li>
          
          <li className="p-3 bg-gray-100 hover:bg-[#E22E37] hover:text-[white] rounded cursor-pointer text-center text-lg font-[400] font-display" onClick={login}>Logout</li>
        </ul>
      </div>
    </div>
  );
}

export default EmpOptions;
