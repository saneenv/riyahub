import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function StaffOptions({ closeOptions }) {
  const navigate = useNavigate();
  const staffId = sessionStorage.getItem('employeeId');
  const [staffData, setStaffData] = useState(null);
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;



  // Fetch staff data from API
  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/fetchstaff?staffId=${encodeURIComponent(staffId)}`); // Use fetch with query parameter
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); // Parse JSON response
        setStaffData(data);
      } catch (err) {
        console.error('Error fetching staff data:', err);
        setError('Unable to fetch staff data.');
      } finally {
        setLoading(false);
      }
    };

    if (staffId) {
      fetchStaffData();
    }
  }, [staffId, apiBaseUrl]);




  // const home = () => {
  //     navigate('/home'); 
  //   };

  const jobpost = () => {
    navigate('/jobpost');
  };

  const postedjob = () => {
    navigate('/postedjob');
  };

  const viewProfile3 = () => {
    navigate('/viewstaff');
  };

  const enablePage = () => {
    navigate('/enablepackage');
  };

  const appliedCandidates = () => {
    navigate('/appliedcan');
  };



  const deleteprofiles = () => {
    navigate('/deleteprofiles');
  };



  const enablejobpost = () => {
    navigate('/enablejobpost');
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
          <h2 className="text-xl font-semibold font-display">Staff Options</h2>
          <button onClick={closeOptions} className="text-gray-500 hover:text-red-500 text-2xl">&times;</button>
        </div>
        <ul className="space-y-4">
          {/* <li className="p-3 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-center" onClick={home}>Home</li> */}
          <li className="p-3 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-center text-lg font-[400] font-display" onClick={jobpost}>Post Job</li>
          <li className="p-3 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-center text-lg font-[400] font-display" onClick={postedjob}>View Posted Jobs</li>
          {/* <li className="p-3 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-center">Search Candidates</li> */}
          {/* <li className="p-3 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-center">Selected Candidates</li> */}
          <li className="p-3 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-center text-lg font-[400] font-display" onClick={appliedCandidates}>Applied Candidates</li>

          <li className="p-3 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-center text-lg font-[400] font-display" onClick={viewProfile3}>View Profile</li>
          {staffData && staffData.specialPower === 'on' && (
            <li className="p-3 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-center text-lg font-[400] font-display" onClick={enablePage}>Enable Package</li>
          )}
          {staffData && staffData.power === 'on' && (
            <li
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-center text-lg font-[400] font-display"
              onClick={enablejobpost}
            >
              Enable Job Post
            </li>
          )}

          <li className="p-3 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-center text-lg font-[400] font-display" onClick={deleteprofiles}>Delete Profiles</li>


          <li className="p-3 bg-gray-100 hover:bg-[#E22E37] hover:text-[white] rounded cursor-pointer text-center text-lg font-[400] font-display" onClick={login}>Logout</li>
        </ul>
      </div>
    </div>
  );
}

export default StaffOptions;
