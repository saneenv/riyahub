import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar2 from '../components/Navbar2';
import { useMediaQuery } from 'react-responsive';
import Navbar from '../components/Navbar';
import NavbarMob from '../components/NavbarMob';

function EnableStaff() {
  const [staffData, setStaffData] = useState([]);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const [searchQuery, setSearchQuery] = useState({
    companyName: '',
    mobileNumber: '',
    email: '',
    address: '',
    customerType: '',
  });
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  // Fetch staff data from the new API
  useEffect(() => {
    fetch(`${apiBaseUrl}/fetchallstaff`)
      .then((response) => response.json())
      .then((data) => setStaffData(data))
      .catch((error) => console.error('Error fetching staff data:', error));
  }, [apiBaseUrl]);

  // Filter staff data based on the search query
  const filteredStaffData = staffData.filter((staff) =>
    Object.keys(searchQuery).every((key) =>
      staff[key]?.toString().toLowerCase().includes(searchQuery[key].toLowerCase())
    )
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      [name]: value,
    }));
  };

  // Toggle power status
  const handleTogglePower = async (companyName, currentPower) => {
    const newPowerStatus = currentPower === 'off' ? 'on' : 'off';

    // Optimistically update the local state
    setStaffData((prevStaff) =>
      prevStaff.map((staff) =>
        staff.companyName === companyName ? { ...staff, power: newPowerStatus } : staff
      )
    );

    try {
      const response = await fetch(`${apiBaseUrl}/updatepower`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName,
          power: newPowerStatus,
        }),
      });

      const result = await response.json();
      if (result.success) {
        console.log('Power status updated successfully');
      } else {
        console.error('Failed to update power status:', result.message);
      }
    } catch (error) {
      console.error('Error updating power status:', error);
    }
  };


  const handleTogglePower2 = async (companyName, currentPower) => {
    const newPowerStatus = currentPower === 'off' ? 'on' : 'off';
    console.log('Toggling SpecialPower:', { companyName, newPowerStatus }); // Debug log
  
    setStaffData((prevStaff) =>
      prevStaff.map((staff) =>
        staff.companyName === companyName ? { ...staff, specialPower: newPowerStatus } : staff
      )
    );
  
    try {
      const response = await fetch(`${apiBaseUrl}/updatespecialpower`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName,
          specialPower: newPowerStatus,
        }),
      });
  
      const result = await response.json();
      if (result.success) {
        console.log('SpecialPower status updated successfully');
      } else {
        console.error('Failed to update SpecialPower status:', result.message);
      }
    } catch (error) {
      console.error('Error updating SpecialPower status:', error);
    }
  };
  

  return (
    <div className='min-h-screen flex flex-col'>
      {isMobile ? <NavbarMob /> : <Navbar />}
      <div className='md:flex hidden'>
        <Navbar2 />
      </div>

      <div className='flex flex-col gap-8 px-3 mt-12 pb-12 sm:px-6 lg:px-12'>
        <h1 className='text-xl font-bold text-center text-gray-800'>Enable Staff</h1>

  

        {/* Table displaying staff data */}
        <div className='overflow-x-auto'>
          <table className='table-auto w-full border-collapse bg-gray-50'>
            <thead>
              <tr className='bg-blue-600 text-white'>
                <th className='border p-2'>Staff Name</th>
                <th className='border p-2'>Mobile Number</th>
                <th className='border p-2'>Staff Type</th>
                <th className='border p-2'>Enable Job Post</th>
                <th className='border p-2'>Enable Package</th>

              </tr>
            </thead>
            <tbody>
              {filteredStaffData.map((staff) => (
                <tr
                  key={staff.companyName}
                  className='hover:bg-gray-100 transition duration-200'
                >
                  <td className='border p-2'>{staff.companyName}</td>
                  <td className='border p-2'>{staff.mobileNumber}</td>
                  <td className='border p-2'>{staff.customerType}</td>
                  <td className='border p-2 text-center'>
                    <button
                      className={`${
                        staff.power === 'on' ? 'bg-green-500' : 'bg-red-500'
                      } text-white px-4 py-2 rounded-lg`}
                      onClick={() => handleTogglePower(staff.companyName, staff.power)}
                    >
                      {staff.power === 'on' ? 'On' : 'Off'}
                    </button>
                  </td>

                  <td className='border p-2 text-center'>
                    <button
                      className={`${
                        staff.specialPower === 'on' ? 'bg-green-500' : 'bg-red-500'
                      } text-white px-4 py-2 rounded-lg`}
                      onClick={() => handleTogglePower2(staff.companyName, staff.specialPower)}
                    >
                      {staff.specialPower === 'on' ? 'On' : 'Off'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className='mt-12'>
        <Footer />
      </div>
    </div>
  );
}

export default EnableStaff;
