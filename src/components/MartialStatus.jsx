import React, { useEffect, useState } from 'react';
import NavbarMob from './NavbarMob';
import Navbar from './Navbar';
import Navbar2 from './Navbar2';
import Footer from './Footer';
import { useMediaQuery } from 'react-responsive';
import Navbar2Mob from './Navbar2Mob';

function MartialStatus() {
  const [candidates, setCandidates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;


  useEffect(() => {
    // Fetch data from the API using fetch
    fetch(`${apiBaseUrl}/getAllCandidates`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => setCandidates(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  // Filter candidates based on search query
  const filteredCandidates = candidates.filter(candidate => {
    const lowerCaseSearch = searchQuery.toLowerCase();
    return (
      candidate.Name.toLowerCase().includes(lowerCaseSearch) ||
      candidate.CandidateID.toString().includes(lowerCaseSearch) ||
      candidate.MaritalStatus.toLowerCase().includes(lowerCaseSearch) ||
      candidate.District.toLowerCase().includes(lowerCaseSearch)
    );
  });

  return (
    <div className='flex flex-col min-h-screen'>
    {isMobile ? <NavbarMob /> : <Navbar />}
    <div className='md:flex hidden'>
        <Navbar2 />
    </div>
    <div className='md:hidden flex flex-col'>
            <Navbar2Mob />
            </div>

      {/* Search Bar */}
      <div className="flex justify-center items-center pt-6 pb-2 lg:px-12 px-3 space-x-4 bg-[#d4d4d4]">
        <input
          type="text"
          placeholder="Search by Name, ID, Marital Status, or Address..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Content */}
      <div className="flex justify-center items-center py-12 lg:px-12 px-3 bg-[#d4d4d4]">
        <div className="w-full max-w-8xl">
          {/* <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 font-display">
            Marital Status of Candidates
          </h1> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredCandidates.length > 0 ? (
              filteredCandidates.map(candidate => (
                <div
                  key={candidate.CandidateID}
                  className="bg-[white] rounded-lg shadow-lg p-6 border border-gray-200 transition transform hover:scale-105 hover:shadow-xl text-left "
                >
                  <h2 className="text-xl font-bold text-gray-700 mb-2">
                    {candidate.Name}
                  </h2>
                  <p className="text-gray-600 font-display"><strong>Age:</strong> {candidate.Age}</p>

                  <p className="text-gray-600 font-display"><strong>ID:</strong> {candidate.CandidateID}</p>
                  <p className="text-gray-600 font-display"><strong>Phone:</strong> {candidate.Mobile}</p>
                  <p className="text-gray-600 font-display"><strong>Address:</strong> {candidate.District}</p>
                  <p className="text-gray-600 font-display"><strong>Near Big Town:</strong> {candidate.bigTown}</p>
                  <p className="text-gray-600 font-display"><strong>Exact Location:</strong> {candidate.exactLocation}</p>

                  <p className="text-gray-600 font-display"><strong>Marital Status:</strong> {candidate.MaritalStatus}</p>
                  <p className="text-gray-600 font-display"><strong>Father/Hus No:</strong> {candidate.famNumber}</p>

                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 font-display">No candidates found</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default MartialStatus;
