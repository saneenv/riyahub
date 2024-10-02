import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const EditEmpReg = () => {
    const employeeId = parseInt(sessionStorage.getItem('employeeId'), 10);
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    console.log(employeeId);
  const [companyName, setCompanyName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [companyCategory, setCompanyCategory] = useState('');
  const [companyDistrict, setCompanyDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // Fetch employee data when the component mounts
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/employee/${employeeId}`);
        const data = await response.json();
        if (data.success) {
          const { company_name, mobile_number, whatsapp_number, email, company_category, company_district, address } = data.employee;
          setCompanyName(company_name);
          setMobileNumber(mobile_number);
          setWhatsappNumber(whatsapp_number);
          setEmail(email);
          setCompanyCategory(company_category);
          setCompanyDistrict(company_district);
          setAddress(address);
        }
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  const handleUpdate = async () => {
    setIsLoading(true);
    const updatedData = {
      companyName, // Use the exact keys as in the backend
      mobileNumber,
      whatsappNumber,
      email,
      companyCategory,
      companyDistrict,
      address,
      password: password ? password : undefined, // Only send password if provided
    };

    try {
      const response = await fetch(`${apiBaseUrl}/employee/update/${employeeId}`, { // Updated endpoint
        method: 'POST', // Change to POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();
      if (result.success) {
        alert('Employee updated successfully');
        setCompanyName('');
        setMobileNumber('');
        setWhatsappNumber('');
        setEmail('');
        setCompanyCategory('');
        setCompanyDistrict(''); // Clear district
        setAddress('');
        setPassword('');
        navigate('/viewprofile');
      } else {
        alert('Failed to update employee: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    } finally {
      setIsLoading(false);
    }
};


  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex justify-center items-center bg-[#0D2D3E] min-h-screen'>
        <div className='lg:w-[80%] w-[90%] h-[70%] bg-[white] flex flex-col items-center gap-12 py-12 lg:rounded-[20px] rounded-[5px]'>
          <span className='text-2xl font-[700] font-[display]'>Update Employee</span>
          <div className='grid lg:grid-cols-3 grid-cols-1 gap-5 lg:px-12 px-3 w-full'>
            <div className='flex flex-col gap-3'>
              <span className='text-left text-lg font-[500] font-[display]'>Company Name</span>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
              />
            </div>
            <div className='flex flex-col gap-3'>
              <span className='text-left text-lg font-[500] font-[display]'>Mobile Number</span>
              <input
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
              />
            </div>
            <div className='flex flex-col gap-3'>
              <span className='text-left text-lg font-[500] font-[display]'>Whatsapp Number</span>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
              />
            </div>
            <div className='flex flex-col gap-3'>
              <span className='text-left text-lg font-[500] font-[display]'>Email</span>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
              />
            </div>
            <div className='flex flex-col gap-3'>
              <span className='text-left text-lg font-[500] font-[display]'>Company Category</span>
              <input
                type="text"
                value={companyCategory}
                onChange={(e) => setCompanyCategory(e.target.value)}
                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
              />
            </div>
            <div className='flex flex-col gap-3'>
              <span className='text-left text-lg font-[500] font-[display]'>Company District</span>
              <input
                type="text"
                value={companyDistrict}
                onChange={(e) => setCompanyDistrict(e.target.value)}
                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
              />
            </div>
            <div className='flex flex-col gap-3'>
              <span className='text-left text-lg font-[500] font-[display]'>Address</span>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
              />
            </div>
            <div className='flex flex-col gap-3'>
              <span className='text-left text-lg font-[500] font-[display]'>New Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
              />
            </div>
          </div>
          <div className='flex flex-col gap-5 w-full px-12 justify-center items-center'>
            <button
              onClick={handleUpdate}
              className='h-[56px] lg:w-[25%] w-[50%] bg-[#E22E37] rounded-[20px] flex justify-center items-center text-[white] text-xl font-[display] font-[600]'
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12c0-4.418 3.582-8 8-8v8H4z"></path>
                  </svg>
                  <span>Updating...</span>
                </div>
              ) : (
                'Update'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmpReg;
