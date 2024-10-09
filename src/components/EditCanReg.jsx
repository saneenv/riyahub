import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



const EditCanReg = () => {
    const candidateID = parseInt(sessionStorage.getItem('employeeId'), 10);
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

 // State variables
 const [name, setName] = useState('');
 const [mobile, setMobile] = useState('');
 const [whatsapp, setWhatsapp] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [gender, setGender] = useState('');
 const [companyDistrict, setCompanyDistrict] = useState('');
 const [candidateDegree, setCandidateDegree] = useState('');
 const [jobType, setJobType] = useState('');
 const [jobsCategory, setJobsCategory] = useState([]);
 const [locationCategory, setLocationCategory] = useState([]);
 const navigate = useNavigate();
 const [isLoading, setIsLoading] = useState(false);


 useEffect(() => {
     const fetchCandidateData = async () => {
         try {
             const response = await fetch(`${apiBaseUrl}/getCandidate/${candidateID}`);
             if (!response.ok) {
                 throw new Error('Failed to fetch candidate data');
             }
             const candidateData = await response.json();
             // Set the state with fetched data
             setName(candidateData.Name);
             setMobile(candidateData.Mobile);
             setWhatsapp(candidateData.WhatsApp);
             setEmail(candidateData.Email);
             setPassword(candidateData.Password);
             setGender(candidateData.Gender);
             setCompanyDistrict(candidateData.District);
             setCandidateDegree(candidateData.Degree);
             setJobType(candidateData.JobType);
             setJobsCategory(candidateData.Jobs.split(',')); // Convert to array
             setLocationCategory(candidateData.Locations.split(',')); // Convert to array
         } catch (error) {
             console.error('Error fetching candidate data:', error);
         }
     };

     fetchCandidateData();
 }, [candidateID]); // Only run this effect when candidateID changes

 const handleUpdate = async () => {
     // ... your existing validation and submit logic
     const data = {
         name,
         mobile,
         whatsapp,
         email,
         password,
         gender,
         district: companyDistrict,
         degree: candidateDegree,
         jobType,
         jobs: jobsCategory.map(option => option.value), // Ensure this is an array
         locations: locationCategory.map(option => option.value), // Ensure this is an array
     };

     try {
         const response = await fetch(`${apiBaseUrl}/updateCandidate/${candidateID}`, { // Call update endpoint
             method: 'PUT', // Change method to PUT for updates
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify(data),
         });

         if (!response.ok) {
             const errorData = await response.json();
             alert(`Error: ${errorData.message}`);
             return;
         }

         alert('Update Successful');
         navigate('/login'); // Redirect after successful update
     } catch (error) {
         console.error('Error updating data:', error);
     }
 };

    return (
        <div className='flex flex-col min-h-screen'>
            <div className='flex justify-center items-center bg-[#0D2D3E] min-h-screen'>
                <div className='lg:w-[80%] w-[90%] h-[70%] bg-[white] flex flex-col items-center gap-12 py-12 lg:rounded-[20px] rounded-[5px]'>
                    <span className='text-2xl font-[700] font-[display]'>Update Candidate</span>
                    <div className='grid lg:grid-cols-3 grid-cols-1 gap-5 lg:px-12 px-3 w-full'>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Name</span>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Mobile Number</span>
                            <input
                                type="text"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Whatsapp Number</span>
                            <input
                                type="text"
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value)}
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
                            <span className='text-left text-lg font-[500] font-[display]'>Gender</span>
                            <input
                                type="text"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>District</span>
                            <input
                                type="text"
                                value={companyDistrict}
                                onChange={(e) => setCompanyDistrict(e.target.value)}
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>District</span>
                            <input
                                type="text"
                                value={jobsCategory}
                                onChange={(e) => setJobsCategory(e.target.value)}
                                className='h-[43px] w-full border-2 border-[#D7D7D7] rounded-[5px] px-4'
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='text-left text-lg font-[500] font-[display]'>Degree</span>
                            <input
                                type="text"
                                value={candidateDegree}
                                onChange={(e) => setCandidateDegree(e.target.value)}
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

export default EditCanReg;
