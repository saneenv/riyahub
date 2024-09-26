import React,{useState,useEffect} from 'react'
import { useMediaQuery } from 'react-responsive';
import NavbarMob from './NavbarMob';
import Navbar from './Navbar';
import Footer from './Footer';
import logo from '../images/login/logo.png'
import Navbar2 from './Navbar2';
// import { useNavigate } from 'react-router-dom';



function Verify() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [code, setCode] = useState(new Array(6).fill(''));
    const [otp, setOtp] = useState('');
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // const navigate = useNavigate();
    // const verify = () => {
    //     navigate('/verify');
    //   };
    const handleChange = (element, index) => {
        const value = element.value.replace(/\D/, ''); // Allow only numeric input
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Move to the next input field if a number is entered
        if (value && element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleKeyDown = (element, index) => {
        // Move to the previous input field if backspace is pressed and the current field is empty
        if (element.key === 'Backspace' && !element.target.value && element.target.previousSibling) {
            element.target.previousSibling.focus();
        }
    };

     
    const handleOtpChange = (event) => {
        setOtp(event.target.value);
      };

    return (
        <div className='flex flex-col min-h-screen'>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>
            <div className=' flex justify-center items-center bg-[#0D2D3E] py-7'>
                <div className='lg:w-[60%] w-[90%] h-[70%] bg-[white]  flex flex-col items-center  gap-6 py-12 lg:rounded-[20px] rounded-[5px]'>
                    <div className='flex flex-col justify-center items-center gap-3 px-12'>
                        <span className='text-2xl font-[600] font-[display]'>Enter the code</span>
                        <span className='text-base font-[400] font-[display]'>Enter the code we sent to your mail Id be
                             careful<br/> not to share with any one.</span>
                    </div>
                    <div className='w-[60%] h-auto gap-3 flex flex-col mt-5'>
                        <div className='h-[56px] w-full px-12  flex justify-center items-center' >
                        <div className='flex flex-row lg:gap-8 gap-1'>
                        {code.map((otp, index) => (
                            <input
                                key={index}
                                type='text'
                                maxLength='1'
                                value={otp}
                                onInput={handleOtpChange}
                                onChange={(e) => handleChange(e.target, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className='w-12 h-11 border-2 border-[#D7D7D7] rounded-[5px] text-center text-xl'
                            />
                        ))}
                    </div>
                        </div>
                        <div className='h-[56px] w-full px-12 ' >
                              <div className='w-full h-full bg-[#E22E37]  rounded-[5px] flex justify-center items-center text-[white] text-base font-[600] font-[display] cursor-pointer' >
                              SUBMIT
                              </div>
                        </div>
                        <span className='text-base font-[400] font-[display] text-[#8B8B8B]'>or</span>
                        <span><span className='font-[400] text-base font-[display] text-[#8B8B8B]'>Not a Member?</span><span className='font-[400] text-base font-[display] text-[#E22E37] cursor-pointer'> Free Register Here</span></span>
                    </div>
                    <img src={logo} alt="logo" />
                    
                    


                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Verify
