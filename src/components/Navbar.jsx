import React,{useState} from 'react'
import logo from '../images/navbar/logo.png'
import search from '../images/navbar/Vector.png'
import location from '../images/navbar/location.png'
// import smallloc from '../images/navbar/smallloc.png'
import { useNavigate } from 'react-router-dom'
import EmpOptions from './EmpOptions'
import CandidateOpt from './CandidateOpt'

function Navbar() {
    const navigate = useNavigate();
    const companyName = sessionStorage.getItem('customerName');
      // State to store job and location values
      const [job, setJob] = useState('');
      const [locationInput, setLocationInput] = useState('');
    const [showOptions, setShowOptions] = useState(false); // State to track if options are shown
    const customerType = sessionStorage.getItem('customerType');
    console.log("customer Type:", customerType);


    const login = () => {
        navigate('/login');
      };
      const home = () => {
        navigate('/home');
      };
      const jobpost = () => {
        navigate('/jobpost');
      };
      const regchooses = () => {
        navigate('/regchoose');
      };


    // Function to handle navigation with state
    const findJob = () => {
        navigate('/searchedjobs', { state: { job, location: locationInput } }); // Passing job and location as state
    };

         // Function to toggle the options component display
    const toggleOptions = () => {
        setShowOptions(!showOptions); // Toggle the state between true and false
    };

    const closeOptions = () => {
        setShowOptions(false); // Close the options modal
    };
    return (
        <div className='h-[100px] w-full  lg:px-12 px-3 flex items-center flex-row gap-5'>

            <img src={logo} alt="logo" className='w-[15%] h-[60%] cursor-pointer' onClick={home}/>
            <div className='h-[48px] w-[45%]  flex flex-row justify-center items-center border-[#edebeb] border-2'>
                <div className='h-full w-[40%]  flex flex-row border-r-2 border-[#edebeb] '>
                    <div className='h-full  w-[20%] flex justify-center items-center'>
                        <img src={search} alt="vector" />
                    </div>
                    <div className='h-full w-[80%]'>
                        <input
                            className='w-full h-full focus:outline-none focus:ring-0'
                            placeholder='Search Job...'
                            value={job} // Controlled input for job
                            onChange={(e) => setJob(e.target.value)} // Set job value
                        />
                    </div>
                </div>
                <div className='h-full w-[40%]  flex flex-row'>
                    <div className='h-full  w-[20%] flex justify-center items-center'>
                        <img src={location} alt="location" />
                    </div>
                    <div className='h-full w-[80%]'>
                        <input
                            className='w-full h-full focus:outline-none focus:ring-0'
                            placeholder='Search Location...'
                            value={locationInput} // Controlled input for location
                            onChange={(e) => setLocationInput(e.target.value)} // Set location value
                        />
                    </div>
                </div>
                <div className='h-[70%] w-[20%] flex justify-center items-center'>
                    <div className='h-full w-[80%] rounded-[10px] bg-[#E22E37] flex justify-center items-center text-[white] cursor-pointer text-sm font-[600] font-[display]' onClick={findJob}>Find Job</div>
                </div>
            </div>

            <div className='w-[40%] h-[48px] flex flex-row gap-4'>
            <div className='w-[30%] h-full flex justify-center items-center border-2 border-[#E22E37] rounded-[5px] text-sm font-[600] font-[display] cursor-pointer' onClick={login}>Login</div>
            <div className='w-[30%] h-full flex justify-center items-center border-2 border-[#E22E37] rounded-[5px] text-sm font-[600] font-[display] cursor-pointer' onClick={regchooses}>Register</div>
                {companyName ? (
                    
                     <div className='w-[40%] h-full flex justify-center items-center border-2 border-[#E22E37] rounded-[5px] flex-row gap-4 cursor-pointer' onClick={toggleOptions}>
                        <span className='text-sm font-[600] font-[display] cursor-pointer'>{companyName}</span>
                    </div>
                    
                ) : (
                    <>
                        {/* <div className='w-[30%] h-full flex justify-center items-center border-2 border-[#E22E37] rounded-[5px] text-sm font-[600] font-[display] cursor-pointer' onClick={login}>Login</div>
                        <div className='w-[30%] h-full flex justify-center items-center border-2 border-[#E22E37] rounded-[5px] text-sm font-[600] font-[display] cursor-pointer' onClick={regchooses}>Register</div> */}
                    </>
                )}
            </div>

            {showOptions && (
                customerType === 'employee' ? (
                    <EmpOptions closeOptions={closeOptions} />
                ) : customerType === 'candidate' ? (
                    <CandidateOpt closeOptions={closeOptions} />
                ) : null
            )}
        </div>
    )
}

export default Navbar
