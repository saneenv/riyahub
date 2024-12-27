import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar5Mob() {
  const navigate = useNavigate();

  const selectedPlan = sessionStorage.getItem('selectedPlan');
  console.log('Selected Plan:', selectedPlan);

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

  return (
    <div className="w-full bg-white p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
        <button
          className="text-sm font-semibold text-[#D22D3A] py-3 rounded-lg bg-[#FEE2E2] hover:bg-[#D22D3A] hover:text-white transition duration-300"
          onClick={matchjob}
        >
          Matching Jobs
        </button>
        <button
          className="text-sm font-semibold text-[#D22D3A] py-3 rounded-lg bg-[#FEE2E2] hover:bg-[#D22D3A] hover:text-white transition duration-300"
          onClick={canapplied}
        >
          Applied Jobs
        </button>
        {(selectedPlan === '0' || selectedPlan === 'null' || selectedPlan === '') && (
          <button
            className="text-sm font-semibold text-[#D22D3A] py-3 rounded-lg bg-[#FEE2E2] hover:bg-[#D22D3A] hover:text-white transition duration-300"
            onClick={packages}
          >
            Packages
          </button>
        )}
        <button
          className="text-sm font-semibold text-[#D22D3A] py-3 rounded-lg bg-[#FEE2E2] hover:bg-[#D22D3A] hover:text-white transition duration-300"
          onClick={viewProfile}
        >
          View Profile
        </button>
      </div>
    </div>
  );
}

export default Navbar5Mob;
