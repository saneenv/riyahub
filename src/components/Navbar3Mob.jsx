import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar3Mob() {
  const navigate = useNavigate();

  const staffId = sessionStorage.getItem('employeeId');
  const [staffData, setStaffData] = useState(null);
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await fetch(
          `${apiBaseUrl}/fetchstaff?staffId=${encodeURIComponent(staffId)}`
        ); // Use fetch with query parameter
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

  const deleteprofilescan = () => {
    navigate('/deleteprofilescan');
  };

  const enablejobpost = () => {
    navigate('/enablejobpost');
  };

  return (
    <div className="w-full bg-white p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-center">
        <span
          className="text-sm font-[600] font-display text-[#D22D3A] py-2 rounded-lg bg-[#FEE2E2] hover:bg-[#D22D3A] hover:text-white cursor-pointer"
          onClick={jobpost}
        >
          Post Job
        </span>
        <span
          className="text-sm font-[600] font-display text-[#D22D3A] py-2 rounded-lg bg-[#FEE2E2] hover:bg-[#D22D3A] hover:text-white cursor-pointer"
          onClick={postedjob}
        >
          View Posted Jobs
        </span>
        <span
          className="text-sm font-[600] font-display text-[#D22D3A] py-2 rounded-lg bg-[#FEE2E2] hover:bg-[#D22D3A] hover:text-white cursor-pointer"
          onClick={appliedCandidates}
        >
          Applied Candidates
        </span>
        <span
          className="text-sm font-[600] font-display text-[#D22D3A] py-2 rounded-lg bg-[#FEE2E2] hover:bg-[#D22D3A] hover:text-white cursor-pointer"
          onClick={viewProfile3}
        >
          View Profile
        </span>
        {staffData && staffData.specialPower === 'on' && (
          <span
            className="text-sm font-[600] font-display text-[#D22D3A] py-2 rounded-lg bg-[#FEE2E2] hover:bg-[#D22D3A] hover:text-white cursor-pointer"
            onClick={enablePage}
          >
            Enable Package
          </span>
        )}
          <span
            className="text-sm font-[600] font-display text-[#D22D3A] py-2 rounded-lg bg-[#FEE2E2] hover:bg-[#D22D3A] hover:text-white cursor-pointer"
            onClick={enablejobpost}
          >
            Enable Job Post
          </span>
        <span
          className="text-sm font-[600] font-display text-[#D22D3A] py-2 rounded-lg bg-[#FEE2E2] hover:bg-[#D22D3A] hover:text-white cursor-pointer"
          onClick={deleteprofiles}
        >
          Employee Profiles
        </span>
        <span
          className="text-sm font-[600] font-display text-[#D22D3A] py-2 rounded-lg bg-[#FEE2E2] hover:bg-[#D22D3A] hover:text-white cursor-pointer"
          onClick={deleteprofilescan}
        >
          Candidate Profiles
        </span>
      </div>
    </div>
  );
}

export default Navbar3Mob;
