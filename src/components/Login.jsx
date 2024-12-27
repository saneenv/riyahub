import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import NavbarMob from './NavbarMob';
import Navbar from './Navbar';
import Footer from './Footer';
import logo from '../images/login/logo.png';
import Navbar2 from './Navbar2';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Navbar2Mob from './Navbar2Mob';

function Login() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const navigate = useNavigate();
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Combined function to handle both employee and candidate login
    const handleLogin = async () => {
        try {
            // First, attempt employee login
            const response = await fetch(`${apiBaseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mobileNumber, password }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.success) {
                    // Store employee data in sessionStorage
                    storeEmployeeData(data);
                    navigate('/home');
                } else {
                    // If employee login fails, attempt candidate login
                    const candidateLoginSuccess = await attemptCandidateLogin();
                    if (!candidateLoginSuccess) {
                        // If candidate login also fails, attempt staff login
                        await attemptStaffLogin();
                    }
                }
            } else {
                const candidateLoginSuccess = await attemptCandidateLogin();
                if (!candidateLoginSuccess) {
                    // If candidate login also fails, attempt staff login
                    await attemptStaffLogin();
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    // Function to attempt candidate login
    const attemptCandidateLogin = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/loginCandidate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mobile: mobileNumber, password }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.success) {
                    storeCandidateData(data);
                    navigate('/home');
                    return true; // Login successful
                } else {
                    setErrorMessage(data.message); // Set error message if candidate login fails
                    return false; // Login failed
                }
            } else {
                setErrorMessage('Candidate login failed. Please check your credentials.');
                return false; // Login failed
            }
        } catch (error) {
            console.error('Candidate login error:', error);
            setErrorMessage('An error occurred during candidate login. Please try again.');
            return false; // Login failed
        }
    };

    // Function to attempt staff login
    const attemptStaffLogin = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/loginstaff`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mobileNumber, password }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.success) {
                    storeStaffData(data);
                    navigate('/home');
                } else {
                    setErrorMessage(data.message); // Set error message if staff login fails
                }
            } else {
                setErrorMessage('login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Staff login error:', error);
            setErrorMessage('An error occurred during staff login. Please try again.');
        }
    };

    // Helper function to store employee data
    const storeEmployeeData = (data) => {
        sessionStorage.setItem('employeeId', data.employeeId);
        sessionStorage.setItem('customerName', data.customerName);
        sessionStorage.setItem('customerType', data.customerType);
        sessionStorage.setItem('address', data.address);
    };

    // Helper function to store candidate data
    const storeCandidateData = (data) => {
        sessionStorage.setItem('employeeId', data.candidate.CandidateID);
        sessionStorage.setItem('customerName', data.candidate.Name);
        sessionStorage.setItem('customerType', data.candidate.customerType);
        sessionStorage.setItem('preferredJob', data.candidate.Jobs);
        sessionStorage.setItem('preferredLocation', data.candidate.Locations);
        sessionStorage.setItem('jobType', data.candidate.JobType);
        sessionStorage.setItem('District', data.candidate.District);
        sessionStorage.setItem('gender', data.candidate.Gender);
        sessionStorage.setItem('Email', data.candidate.Email);
        sessionStorage.setItem('mobileNumber', data.candidate.Mobile);
        sessionStorage.setItem('whatsappNumber', data.candidate.WhatsApp);
        sessionStorage.setItem('selectedPlan', data.candidate.SelectedPlan);
    };

    // Helper function to store staff data
    const storeStaffData = (data) => {
        // Store the necessary staff data in sessionStorage
        sessionStorage.setItem('customerType', data.candidate.customerType);
        sessionStorage.setItem('customerName', data.candidate.companyName);
        sessionStorage.setItem('employeeId', data.candidate.staffId);
        sessionStorage.setItem('address', data.candidate.address);
        sessionStorage.setItem('specialPower', data.candidate.specialPower);


        // Add any other relevant data here
    };
    
  const regchoose = () => {
    navigate('/regchoose');
  };

    return (
        <div className='flex flex-col min-h-screen'>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>
            <div className='md:hidden flex flex-col'>
            <Navbar2Mob />
            </div>
            <div className='flex justify-center items-center bg-[black] py-7'>
                <div className='lg:w-[30%] w-[90%] h-[70%] bg-[white] flex flex-col items-center px-2 gap-6 py-6 lg:rounded-[20px] rounded-[5px]'>
                    <div className='flex flex-col justify-center items-center gap-3'>
                        <span className='text-2xl font-[600] font-display'>Login</span>
                        <span className='text-base font-[400] font-display'>Log In to Continue Your Job Search Journey</span>
                    </div>
                    {errorMessage && (
                        <div className='text-red-500'>{errorMessage}</div>
                    )}
                    <div className='w-full h-auto gap-3 flex flex-col mt-5'>
                        <div className='h-[56px] w-full lg:px-12 px-2'>
                            <input
                                type="text"
                                className='border-2 border-[#000000] w-full h-full rounded-[12px] px-3'
                                placeholder='Enter your Mobile Number'
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                            />
                        </div>
                        <div className='h-[56px] w-full lg:px-12 px-2 relative flex flex-row'>
                            <input
                                type={showPassword ? "text" : "password"} // Toggle password visibility
                                className='border-2 border-r-0 border-[#000000] w-[80%] h-full rounded-l-[12px] px-3 focus:outline-none focus:ring-0'
                                placeholder='Enter your password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div
                                className='w-[20%] h-full cursor-pointer flex justify-center items-center border-l-0 border-[#000000] border-2 rounded-r-[12px]'
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </div>
                        </div>
                        <div className='h-[56px] w-full px-12'>
                            <div
                                className='w-full h-full bg-[#E22E37] rounded-[28px] flex justify-center items-center text-[white] text-base font-[600] font-display cursor-pointer hover:bg-[red]'
                                onClick={handleLogin}
                            >
                                SUBMIT
                            </div>
                        </div>
                        <span className='text-base font-[400] font-display text-[#8B8B8B]'>or</span>
                        <span>
                            <span className='font-[400] text-base font-display text-[#8B8B8B]'>Not a Member?</span>
                            <span className='font-[400] text-base font-display text-[#E22E37] cursor-pointer hover:text-[black]' onClick={regchoose}> Free Register Here</span>
                        </span>
                    </div>
                    <img src={logo} alt="logo" />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login;
