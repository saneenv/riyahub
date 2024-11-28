import React, { useState , useEffect} from 'react'
import { useMediaQuery } from 'react-responsive';
import NavbarMob from '../components/NavbarMob';
import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import call from '../images/contactus/call.png'
import email from '../images/contactus/email.png'
import location from '../images/contactus/location.png'
import twitter from '../images/contactus/twitter.png'
import insta from '../images/contactus/insta.png'
import arrow from '../images/contactus/arrow.png'

function ContactUs() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSendEmail = () => {
    const recipientEmail = 'saneen577@gmail.com'; 
    const subject = 'New Message from contact us page';
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.mobileNumber}\nMessage: ${formData.message}`;

    // Open default email client with pre-filled email template
    window.open(`mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);

    // Clear form data
    setFormData({
      name: '',
      email: '',
      mobileNumber: '',
      message: ''
    });

    // Optionally, you can redirect or perform any other action after sending the email
  };



  return (
    <div className='min-h-screen flex flex-col'>
      {isMobile ? <NavbarMob /> : <Navbar />}
      <div className='md:flex hidden'>
        <Navbar2 />
      </div>

      <div className='lg:px-12 px-3 w-full gap-12 mt-6 flex flex-col '>
        <div className='w-full gap-3 flex flex-col'>
          <span className='lg:text-3xl text-2xl font-[700] font-display text-[#E22E37]'>Contact Us</span>
          <span className='lg:text-lg text-base font-[500] font-display'>Any question or remarks? Just write us a message!</span>
        </div>
        <div className='w-full flex lg:flex-row flex-col gap-3 lg:h-[550px] h-auto'>
          <div className='lg:w-[40%] w-[100%] h-full  bg-[#E22E37] lg:p-12 p-3  flex flex-col items-start text-left rounded-[10px]  justify-center lg:gap-12 gap-8'>
            <div className='flex flex-col gap-6'>
              <span className='lg:text-2xl text-xl font-[600] font-display  text-white'>Contact Information</span>
              <span className='lg:text-lg text-base font-[400] font-display  text-[#C9C9C9]'>Say something to start a live chat!</span>
            </div>

            <div className='flex flex-col gap-6'>
              <div className='flex flex-row gap-3'>

                <img src={call} alt="call" />
                <span className='lg:text-base text-sm font-[400] font-display text-[white]'>+91 9544500746</span>
              </div>
              <div className='flex flex-row gap-3'>

                <img src={email} alt="call" />
                <span className='lg:text-base text-sm font-[400] font-display text-[white]'>riyahub4u@gmail.com</span>
              </div>
              <div className='flex flex-row gap-3'>

                <img className='h-[50%]' src={location} alt="call" />
                <span className='lg:text-base text-sm font-[400] font-display text-[white]'>Perinthalmanna, Mannarkad, Ernakulam, Pattambi, Melattur, Cherupullasery</span>
              </div>
            </div>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-row gap-3'>

                <div className='w-[30px] h-[30px] rounded-full bg-[white] flex justify-center items-center'>
                  <img src={twitter} alt="twitter" />
                </div>
                <div className='w-[30px] h-[30px] rounded-full bg-[white] flex justify-center items-center'>
                  <img src={insta} alt="insta" />
                </div>

              </div>

            </div>
          </div>
          <div className='lg:w-[60%]  w-[100%]  h-full  lg:p-12 p-3  flex flex-col items-start text-left rounded-[10px] gap-12'>
            <div className='w-full flex flex-row gap-3'>

              <div className='flex flex-col w-[100%] gap-6'>
                <span className='lg:text-lg text-base font-[500] font-display'>Full Name</span>
                <input placeholder='Enter Your Name ' type="text" className='w-full border-b-2 border-[#8D8D8D] focus:outline-none focus:ring-0' name='name' value={formData.name}
                  onChange={handleChange} />
              </div>
            </div>
            <div className='w-full flex flex-row gap-3'>
              <div className='flex flex-col w-[50%] gap-6'>
                <span className='lg:text-lg text-base font-[500] font-display'>Email</span>
                <input type="text" placeholder='Enter Your Mail' className='w-full border-b-2 border-[#8D8D8D] focus:outline-none focus:ring-0' name='email' value={formData.email}
                  onChange={handleChange} />
              </div>
              <div className='flex flex-col w-[50%] gap-6'>
                <span className='lg:text-lg text-base font-[500] font-display'>Phone Number</span>
                <input type="text" placeholder='Enter Phone Number' className='w-full border-b-2 border-[#8D8D8D] focus:outline-none focus:ring-0' name='mobileNumber' value={formData.mobileNumber}
                  onChange={handleChange} />
              </div>
            </div>
            <div className='w-full flex flex-row gap-3'>
              <div className='flex flex-col w-[100%] gap-6'>
                <span className='lg:text-lg text-base font-[500] font-display'>Message</span>
                <input placeholder='write your message' type="text" className='w-full border-b-2 border-[#8D8D8D] focus:outline-none focus:ring-0' name='message' value={formData.message}
                  onChange={handleChange} />
              </div>

            </div>
            <div className='w-full flex flex-col'>
              <div className='flex w-full justify-end items-end'>
                <div className='h-[50px] lg:w-[20%] w-[50%] bg-[#E22E37] rounded-[10px] flex flex-end text-[white] justify-center items-center lg:text-xl text-base font-[500] font-display cursor-pointer hover:bg-[black]' onClick={handleSendEmail}>Send Mail</div>
              </div>
              <div className='flex w-full h-[120px]  justify-center items-center'>
                <div className='h-full w-[40%] '>
                  <img src={arrow} alt="arrow" className='w-full h-full' />
                </div>
              </div>


            </div>
          </div>
        </div>


      </div>


      <div className='mt-12'>
        <Footer />
      </div>
    </div>
  )
}

export default ContactUs
