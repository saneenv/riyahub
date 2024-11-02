import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
import NavbarMob from '../components/NavbarMob';
import loc from '../images/details/loc.png'
import dinner from '../images/details/Dinner.png'
import rs from '../images/details/rs.png'
import phone from '../images/details/phone.png'
import id from '../images/details/ID.png'
import suitecase from '../images/details/Suitcase.png'
import company from '../images/details/Company.png'
import lan from '../images/details/lan.png'
import wa from '../images/details/whatsapp.png'
import mail from '../images/details/mailpng.png'
import fb from '../images/details/Facebook.png'
import insta from '../images/details/insta.png'
import x from '../images/details/x.png'
import telegram from '../images/details/telegram.png'
import Footer from '../components/Footer';
import Navbar2 from '../components/Navbar2';
import { useLocation } from 'react-router-dom';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';


function Details() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const [jobDetails, setJobDetails] = useState(null); // State to store job details
    const [error, setError] = useState(null); // State to handle errors
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; // Assuming you have this in .env file
    const [qrCodeSrc, setQrCodeSrc] = useState('');

    const location = useLocation();
    const { jobId } = location.state || {}; // Extract jobId from state
    console.log("jobId:", jobId);




    const customerType = sessionStorage.getItem('customerType');

    const navigate = useNavigate();
    const selectedPlan = sessionStorage.getItem('selectedPlan');
    const companyName = sessionStorage.getItem('customerName');
    const mobileNumber = sessionStorage.getItem('mobileNumber');
    const whatsappNumber = sessionStorage.getItem('whatsappNumber');
    const Email = sessionStorage.getItem('Email');


    // const employeeId = sessionStorage.getItem('employeeId');
    console.log("selectedPlan:", selectedPlan);
    // console.log("employeeId:", employeeId);

    const handlePackageClick = () => {
        if (selectedPlan === '300' || selectedPlan === '500') {
            navigate('/companydetails', { state: { employeeId: jobDetails.employee_id } });
        } else {
            navigate('/packages', { state: { job: jobDetails.job, jobId: jobDetails.job_id, location: jobDetails.location } });
        }
    };

    // Assuming 'selectedPlan', 'jobDetails', and 'customerName' are available in the component's scope
    const Packages2 = async () => {
        if (selectedPlan === '300' || selectedPlan === '500') {
            try {
                // Prepare data to send to the backend
                const payload = {
                    employeeId: jobDetails.employee_id,
                    customerName: companyName,
                    jobId: jobDetails.job_id,
                    whatsappNumber: whatsappNumber,
                    mobileNumber: mobileNumber,
                    Email: Email
                };

                // Send data to backend
                const response = await fetch(`${apiBaseUrl}/savePackageSelection`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    console.log('Data saved successfully');
                    alert('Applied successfully'); // Success alert
                    // Handle success (e.g., display a success message)
                } else {
                    console.error('Failed to save data');
                    // Handle failure (e.g., display an error message)
                }
            } catch (error) {
                console.error('Error:', error);
                // Handle error
            }
        } else {
            navigate('/packages', { state: { job: jobDetails.job, jobId: jobDetails.job_id, location: jobDetails.location } });
        }
    };



    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (jobId) {
            // Fetch the job details based on the jobId
            fetch(`${apiBaseUrl}/getjobposts/${jobId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setJobDetails(data); // Set the fetched job details
                })
                .catch(error => {
                    setError('Error fetching job details. Please try again later.');
                    console.error('Error fetching job details:', error);
                });
        }
    }, [jobId, apiBaseUrl]); // Rerun this effect when jobId changes


    // const downloadImage = () => {
    //     if (!jobDetails) return;

    //     // Create a canvas element
    //     const canvas = document.createElement('canvas');
    //     const ctx = canvas.getContext('2d');
    //     const imgWidth = 600; // Set your desired image width
    //     const imgHeight = 800; // Set your desired image height
    //     canvas.width = imgWidth;
    //     canvas.height = imgHeight;

    //     // Draw the background
    //     ctx.fillStyle = '#f4f4f4'; // Light background color
    //     ctx.fillRect(0, 0, imgWidth, imgHeight);

    //     // Add a border
    //     ctx.strokeStyle = '#ccc'; // Border color
    //     ctx.lineWidth = 5;
    //     ctx.strokeRect(0, 0, imgWidth, imgHeight);

    //     // Set title style
    //     ctx.fillStyle = '#333'; // Darker text color for the title
    //     ctx.font = '24px Arial';
    //     ctx.fillText('Job Details', 20, 40);

    //     // Draw a separator line
    //     ctx.strokeStyle = '#ccc';
    //     ctx.beginPath();
    //     ctx.moveTo(20, 60);
    //     ctx.lineTo(imgWidth - 20, 60);
    //     ctx.stroke();

    //     // Set styles for job details
    //     ctx.fillStyle = '#000'; // Text color
    //     ctx.font = '18px Arial';

    //     // Write job details with better formatting
    //     const details = `
    //         Job Title: ${jobDetails.job_title}
    //         Job Type: ${jobDetails.job_type}
    //         Company: ${jobDetails.company_type}
    //         Location: ${jobDetails.location}
    //         Salary: ${jobDetails.min_salary} - ${jobDetails.max_salary}
    //         Start Time: ${jobDetails.start_time}
    //         End Time: ${jobDetails.end_time}
    //         Qualification: ${jobDetails.qualification}
    //         Description: ${jobDetails.job_description}
    //         Contact: ${jobDetails.whatsapp_number}, ${jobDetails.email}
    //     `;

    //     const lineHeight = 30; // Space between lines
    //     let y = 80; // Starting y position for job details

    //     // Split the details into lines and draw them
    //     details.split('\n').forEach((line) => {
    //         ctx.fillText(line, 20, y);
    //         y += lineHeight; // Increase y position for the next line
    //     });

    //     // Convert canvas to data URL and trigger download
    //     canvas.toBlob((blob) => {
    //         const url = URL.createObjectURL(blob);
    //         const a = document.createElement('a');
    //         a.href = url;
    //         a.download = 'job_details.png'; // Set the desired file name
    //         document.body.appendChild(a);
    //         a.click();
    //         document.body.removeChild(a);
    //         URL.revokeObjectURL(url); // Clean up the URL
    //     }, 'image/png');
    // };

    const downloadStyledImage = () => {
        const container = document.getElementById('jobDetailsContainer');
        container.style.display = 'block'; // Show the container temporarily for capture
    
        // Set the container dimensions to portrait mode for a standard page size (e.g., 800px by 1120px).
        container.style.width = '800px';
        container.style.height = '1120px';
    
        html2canvas(container, { scale: 2, width: 800, height: 1120 }).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'job_details.png';
            link.click();
    
            container.style.display = 'none'; // Hide the container again after download
            container.style.width = ''; // Reset width
            container.style.height = ''; // Reset height
        }).catch(error => {
            console.error('Error capturing image:', error);
        });
    };

    


    if (error) {
        return <div>{error}</div>; // Show error message
    }

    if (!jobDetails) {
        return <div>Loading job details...</div>; // Loading state
    }
    return (
        <div className='min-h-screen flex flex-col '>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>

            <div className='flex flex-col gap-8 lg:px-12 px-3 mt-12 pb-12'>

                <div className='flex flex-row justify-between w-full'>
                    <div className='h-[38px] lg:w-[10%] w-[40%] bg-[#3B3D3B] rounded-[10px] flex justify-center items-center text-base font-[600] font-[display] text-[white] cursor-pointer' onClick={handlePackageClick}>Company Details</div>
                    <div className='h-[38px] lg:w-[10%] w-[40%] bg-[#339030] rounded-[10px] flex justify-center items-center text-base font-[600] font-[display] text-[white] cursor-pointer' onClick={Packages2}>Apply Now</div>
                    {customerType === 'admin' && (
                        <div className='h-[38px] lg:w-[10%] w-[40%] bg-[#282d55] rounded-[10px] flex justify-center items-center text-base font-[600] font-[display] text-[white] cursor-pointer' onClick={downloadStyledImage}>download</div>
                    )}
                </div>

                <div className='w-full flex flex-col gap-4'>
                    <span className='text-2xl font-[700] font-[display] text-left'>{jobDetails.job}</span>
                    <span className='text-xl font-[400] font-[display] text-left'>{jobDetails.job_title}</span>
                    <div className='flex flex-col w-full h-auto gap-2'>
                        <div className='flex lg:flex-row flex-col lg:h-[56px] h-[70px] w-full border-2 border-[#E3EAF1] rounded-[10px]'>
                            <div className='lg:w-[30%] w-full h-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3  items-center'>
                                <img src={id} alt="loc" />
                                <span className='text-[#B3B3B3] text-xl font-[500] font-[display]'>Job Id</span>
                            </div>
                            <div className='lg:w-[70%] w-full h-full flex items-center px-5 text-xl font-[500] font-[display]'>
                                {jobDetails.job_id}
                            </div>
                        </div>
                        <div className='flex lg:flex-row flex-col lg:h-[56px] h-[70px] w-full border-2 border-[#E3EAF1] rounded-[10px]'>
                            <div className='lg:w-[30%] w-full h-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3  items-center'>
                                <img src={company} alt="loc" />
                                <span className='text-[#B3B3B3] text-xl font-[500] font-[display]'>Company Type</span>
                            </div>
                            <div className='lg:w-[70%] w-full h-full flex items-center px-5 text-xl font-[500] font-[display]'>
                                {jobDetails.company_type}
                            </div>
                        </div>
                        <div className='flex lg:flex-row flex-col lg:h-[56px] h-[70px] w-full border-2 border-[#E3EAF1] rounded-[10px]'>
                            <div className='lg:w-[30%] w-full h-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3  items-center'>
                                <img src={suitecase} alt="loc" />
                                <span className='text-[#B3B3B3] text-xl font-[500] font-[display]'>Job Type</span>
                            </div>
                            <div className='lg:w-[70%] w-full h-full flex items-center px-5 text-xl font-[500] font-[display]'>
                                {jobDetails.job_type}
                            </div>
                        </div>
                        <div className='flex lg:flex-row flex-col lg:h-[56px] h-[70px] w-full border-2 border-[#E3EAF1] rounded-[10px]'>
                            <div className='lg:w-[30%] w-full h-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3  items-center'>
                                <img src={loc} alt="loc" />
                                <span className='text-[#B3B3B3] text-xl font-[500] font-[display]'>Location</span>
                            </div>
                            <div className='lg:w-[70%] w-full h-full flex items-center px-5 text-xl font-[500] font-[display]'>
                                {jobDetails.location}
                            </div>
                        </div>

                        <div className='flex lg:flex-row flex-col lg:h-[56px] h-[70px] w-full border-2 border-[#E3EAF1] rounded-[10px]'>
                            <div className='lg:w-[30%] w-full h-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3  items-center'>
                                <img src={loc} alt="loc" />
                                <span className='text-[#B3B3B3] text-xl font-[500] font-[display]'>Address</span>
                            </div>
                            <div className='lg:w-[70%] w-full h-full flex items-center px-5 text-xl font-[500] font-[display]'>
                                {jobDetails.address}
                            </div>
                        </div>



                        <div className='flex lg:flex-row flex-col lg:h-[56px] h-[70px] w-full border-2 border-[#E3EAF1] rounded-[10px]'>
                            <div className='lg:w-[30%] w-full h-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3  items-center'>
                                <img src={dinner} alt="loc" />
                                <span className='text-[#B3B3B3] text-xl font-[500] font-[display]'>Food & Accomodation</span>
                            </div>
                            <div className='lg:w-[70%] w-full h-full flex items-center px-5 text-xl font-[500] font-[display]'>
                                {jobDetails.food_type}
                            </div>
                        </div>

                        <div className='flex lg:flex-row flex-col lg:h-[56px] h-[70px] w-full border-2 border-[#E3EAF1] rounded-[10px]'>
                            <div className='lg:w-[30%] w-full h-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3  items-center'>
                                <img src={rs} alt="loc" />
                                <span className='text-[#B3B3B3] text-xl font-[500] font-[display]'>Monthly Salary</span>
                            </div>
                            <div className='lg:w-[70%] w-full h-full flex items-center px-5 text-xl font-[500] font-[display]'>
                                ₹ {jobDetails.min_salary} - ₹ {jobDetails.max_salary}
                            </div>
                        </div>

                        {(selectedPlan === '300' || selectedPlan === '500') && (
                            <div className='flex lg:flex-row flex-col lg:h-[56px] h-[70px] w-full border-2 border-[#E3EAF1] rounded-[10px]'>
                                <div className='lg:w-[30%] w-full h-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3 items-center'>
                                    <img src={phone} alt="loc" />
                                    <span className='text-[#B3B3B3] text-xl font-[500] font-[display]'>Number</span>
                                </div>
                                <div className='lg:w-[70%] w-full h-full flex items-center px-5 text-xl font-[500] font-[display]'>
                                    {jobDetails.whatsapp_number}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
                <ul className='border-2 border-[#E3EAF1]'></ul>
                <div className='flex flex-col w-full gap-4'>
                    <span className='text-2xl font-[700] font-[display] text-left'>Job Desccription</span>
                    <span className='text-xl font-[500] font-[display] text-left'>{jobDetails.job_description}</span>
                </div>
                <span className='text-2xl font-[700] font-[display] text-left'>Requirements</span>

                <div className='flex flex-col w-full h-auto gap-2'>
                    <div className='flex lg:flex-row flex-col lg:h-[56px] h-[70px] w-full border-2 border-[#E3EAF1] rounded-[10px]'>
                        <div className='lg:w-[30%] w-full h-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3  items-center'>

                            <span className='text-[#B3B3B3] text-xl font-[500] font-[display]'>Required Gender</span>
                        </div>
                        <div className='lg:w-[70%] w-full h-full flex items-center px-5 text-xl font-[500] font-[display]'>
                            {jobDetails.gender_type}
                        </div>
                    </div>

                    <div className='flex lg:flex-row flex-col lg:h-[56px] h-[70px] w-full border-2 border-[#E3EAF1] rounded-[10px]'>
                        <div className='lg:w-[30%] w-full h-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3  items-center'>

                            <span className='text-[#B3B3B3] text-xl font-[500] font-[display]'>Qualification</span>
                        </div>
                        <div className='lg:w-[70%] w-full h-full flex items-center px-5 text-xl font-[500] font-[display]'>
                            {jobDetails.qualification}
                        </div>
                    </div>
                </div>


            </div>
            <div className='grid lg:grid-cols-6 grid-cols-3 w-full lg:px-12 px-3 gap-12 mt-12 pb-8'>
                <div className='h-[56px] w-full bg-[#52CE60] rounde-[10px] flex justify-center items-center rounded-[10px]'>
                    <img src={wa} alt="wa" />
                </div>
                <div className='h-[56px] w-full bg-[#DCE6EA] rounde-[10px] flex justify-center items-center rounded-[10px]'>
                    <img src={mail} alt="wa" />
                </div>

                <div className='h-[56px] w-full bg-[#1877F2] rounde-[10px] flex justify-center items-center rounded-[10px]'>
                    <img src={fb} alt="wa" />
                </div>
                <div className='h-[56px] w-full bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]  rounde-[10px] flex justify-center items-center rounded-[10px]'>
                    <img src={insta} alt="wa" />
                </div>
                <div className='h-[56px] w-full bg-[#000000] rounde-[10px] flex justify-center items-center rounded-[10px]'>
                    <img src={x} alt="wa" />
                </div>
                <div className='h-[56px] w-full bg-[#239CD7] rounde-[10px] flex justify-center items-center rounded-[10px]'>
                    <img src={telegram} alt="wa" />
                </div>
            </div>
            <div id="jobDetailsContainer" style={{ display: 'none', padding: '40px', backgroundColor: '#D3D3D3', minHeight: '100vh' }}>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100%' }}>
        <div style={{
            width: '100%',
            maxWidth: '800px',
            backgroundColor: '#ffffff',
            boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.3)',
            borderRadius: '15px',
            overflow: 'hidden',
            fontFamily: 'Arial, sans-serif',
            padding: '20px' // Added padding for spacing
        }}>
            {/* Header */}
            <div style={{
                background: 'linear-gradient(to right, #00c6ff, #0072ff)',
                padding: '50px 20px',
                textAlign: 'center',
                color: '#ffffff',
                borderBottom: '3px solid #0072ff'
            }}>
                <h1 style={{ fontSize: '48px', margin: 0, fontWeight: 'bold' }}>WE ARE HIRING!</h1>
            </div>

            {/* Job Position */}
            <div style={{
                backgroundColor: '#ff5a5a',
                color: '#ffffff',
                padding: '20px 0',
                textAlign: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                marginTop: '10px'
            }}>
                {jobDetails.job}
            </div>

            {/* Job Details */}
            <div style={{
                padding: '40px',
                color: '#333333',
                fontSize: '20px',
                lineHeight: '1.5'
            }}>
                <p><strong>Salary:</strong> {jobDetails.min_salary} - {jobDetails.max_salary}</p>
                <p><strong>Qualification:</strong> {jobDetails.qualification}</p>
                <p><strong>Gender:</strong> {jobDetails.gender_type}</p>
                <p><strong>Location:</strong> {jobDetails.location}</p>
            </div>

            {/* Contact Information */}
            <div style={{
                padding: '20px 20px',
                borderTop: '1px solid #f0f0f0',
                textAlign: 'center',
                color: '#ff5a5a',
                fontSize: '20px',
                lineHeight: '1.5'
            }}>
                <p><strong>Send your CV & Portfolio to:</strong></p>
                <p>
                    <span style={{ display: 'inline-block', marginRight: '10px' }}>📞</span>
                    +91 9544500746, +91 9072400746
                </p>
            </div>

            {/* Owner Information */}
            <div style={{
                padding: '20px',
                borderTop: '1px solid #e0e0e0',
                backgroundColor: '#f9f9f9',
                textAlign: 'center',
                color: '#333333',
                fontSize: '18px'
            }}>
                <p><strong>RIYA HUB JOBS - Job Portal</strong></p>
                <p><strong>All Kerala & Foreign jobs</strong></p>
            </div>

            {/* Malayalam Content */}
            <div style={{
                padding: '30px',
                borderTop: '1px solid #e0e0e0',
                backgroundColor: '#ffefc1',
                textAlign: 'center',
                color: '#333333',
                fontSize: '18px',
                lineHeight: '1.6'
            }}>
                <p style={{ fontWeight: 'bold', color: '#d9534f', fontSize: '20px' }}>ജോലി, വിവാഹം, റിയൽ എസ്റ്റേറ്റ്</p>
                <p>നാട്ടിലെ ജോലി ഒഴിവുകളും, വിദേശ ജോലി ഒഴിവുകളും വിവാഹം - അനുയോജ്യമായ വധു വരന്മാരെ കണ്ടെത്താം. വീടും സ്ഥലവും സെലക്ഷനോടെ വാങ്ങാം, വിൽക്കാം. 
                ജോലി നോക്കുന്നവർ വാട്സ്ആപ്പ് CV (ബയോഡാറ്റ) അയക്കു, അനുയോജ്യമായ ജോലികൾ കണ്ടെത്താം.</p>
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

export default Details
