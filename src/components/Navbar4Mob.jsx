import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar4Mob() {
  const navigate = useNavigate();

  const jobpost = () => {
    navigate('/jobpost');
  };

  const postedjob = () => {
    navigate('/postedjob');
  };

  const viewProfile3 = () => {
    navigate('/viewprofile');
  };

  const appliedCandidates = () => {
    navigate('/appliedcan');
  };

  return (
    <div className="w-full bg-white p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center">
        <button
          className="text-sm font-semibold text-[#D22D3A] py-3 rounded-lg bg-[#FEE2E2] hover:bg-[#D22D3A] hover:text-white transition duration-300"
          onClick={jobpost}
        >
          Post Job
        </button>
        <button
          className="text-sm font-semibold text-[#D22D3A] py-3 rounded-lg bg-[#FEE2E2] hover:bg-[#D22D3A] hover:text-white transition duration-300"
          onClick={postedjob}
        >
          View Posted Jobs
        </button>
        <button
          className="text-sm font-semibold text-[#D22D3A] py-3 rounded-lg bg-[#FEE2E2] hover:bg-[#D22D3A] hover:text-white transition duration-300"
          onClick={appliedCandidates}
        >
          Applied Candidates
        </button>
        <button
          className="text-sm font-semibold text-[#D22D3A] py-3 rounded-lg bg-[#FEE2E2] hover:bg-[#D22D3A] hover:text-white transition duration-300"
          onClick={viewProfile3}
        >
          View Profile
        </button>
      </div>
    </div>
  );
}

export default Navbar4Mob;
