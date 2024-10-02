import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, useLocation } from 'react-router-dom';
import NavbarMob from './NavbarMob';
import Navbar from './Navbar';
import Footer from './Footer';
import logo from '../images/login/logo.png';
import Navbar2 from './Navbar2';

function Verify() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [code, setCode] = useState(new Array(6).fill(''));
    const location = useLocation();
    const { employeeId } = location.state; // Assume you pass this from registration
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate(); // Initialize the navigate function

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (element, index) => {
        const value = element.value.replace(/\D/, ''); // Only allow numeric input
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Move to next input
        if (value && element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleKeyDown = (element, index) => {
        if (element.key === 'Backspace' && !element.target.value && element.target.previousSibling) {
            element.target.previousSibling.focus();
        }
    };

    const handleSubmit = async () => {
        const otp = code.join(''); // Combine the 6 inputs into a single string
        try {
            console.log("Verifying OTP for employeeId:", employeeId, "with OTP:", otp);

            const response = await fetch(`${apiBaseUrl}/verifyOtp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ employeeId, otp })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to verify OTP');
            }

            const data = await response.json();

            if (data.success) {
                alert('OTP Verified Successfully!');
                setCode(new Array(6).fill('')); // Clear the input fields
                // Store employeeId in sessionStorage
                sessionStorage.removeItem('employeeId');
                sessionStorage.removeItem('jobId');
                  sessionStorage.removeItem('customerName');
                navigate('/login'); // Navigate to the job post component // Navigate to the job post component
            } else {
                alert('Invalid OTP. Please check the code and try again.');
            }
        } catch (err) {
            console.error('Error verifying OTP:', err);
            alert(`OTP verification failed`);
        }
    };

    return (
        <div className='flex flex-col min-h-screen'>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>
            <div className='flex justify-center items-center bg-[#0D2D3E] py-7'>
                <div className='lg:w-[60%] w-[90%] h-[70%] bg-[white] flex flex-col items-center gap-6 py-12 lg:rounded-[20px] rounded-[5px]'>
                    <div className='flex flex-col justify-center items-center gap-3 px-12'>
                        <span className='text-2xl font-[600] font-[display]'>Enter the code</span>
                        <span className='text-base font-[400] font-[display]'>
                            Enter the code we sent to your mail Id. Be careful not to share with anyone.
                        </span>
                    </div>
                    <div className='w-[60%] h-auto gap-3 flex flex-col mt-5'>
                        <div className='h-[56px] w-full px-12 flex justify-center items-center'>
                            <div className='flex flex-row lg:gap-8 gap-1'>
                                {code.map((otp, index) => (
                                    <input
                                        key={index}
                                        type='text'
                                        maxLength='1'
                                        value={otp}
                                        onChange={(e) => handleChange(e.target, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        className='w-12 h-11 border-2 border-[#D7D7D7] rounded-[5px] text-center text-xl'
                                    />
                                ))}
                            </div>
                        </div>
                        <div className='h-[56px] w-full px-12'>
                            <div
                                className='w-full h-full bg-[#E22E37] rounded-[5px] flex justify-center items-center text-[white] text-base font-[600] font-[display] cursor-pointer'
                                onClick={handleSubmit}
                            >
                                SUBMIT
                            </div>
                        </div>
                        <span className='text-base font-[400] font-[display] text-[#8B8B8B]'>or</span>
                        <span>
                            <span className='font-[400] text-base font-[display] text-[#8B8B8B]'>Not a Member?</span>
                            <span className='font-[400] text-base font-[display] text-[#E22E37] cursor-pointer'>
                                Free Register Here
                            </span>
                        </span>
                    </div>
                    <img src={logo} alt='logo' />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Verify;
