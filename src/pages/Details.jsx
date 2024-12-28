import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
import NavbarMob from '../components/NavbarMob';
import loc from '../images/details/loc.png'
import dinner from '../images/details/Dinner.png'
import phone from '../images/details/phone.png'
import id from '../images/details/ID.png'
import suitecase from '../images/details/Suitcase.png'
import company from '../images/details/Company.png'
import Footer from '../components/Footer';
import Navbar2 from '../components/Navbar2';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import poster from '../images/download/newone.png'
import QRCode from 'qrcode';
import Navbar2Mob from '../components/Navbar2Mob';



function Details() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const [jobDetails, setJobDetails] = useState(null); // State to store job details
    const [error, setError] = useState(null); // State to handle errors
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; // Assuming you have this in .env file
    const [loading, setLoading] = useState(false); // Track loading status
    const employeeId = sessionStorage.getItem('employeeId');



    const location = useLocation();
    const { jobId } = location.state || {}; // Extract jobId from state
    console.log("jobId:", jobId);

    const jobIdStr = jobId.toString();




    const customerType = sessionStorage.getItem('customerType');

    const navigate = useNavigate();
    const selectedPlan = sessionStorage.getItem('selectedPlan');
    const companyName = sessionStorage.getItem('customerName');
    const mobileNumber = sessionStorage.getItem('mobileNumber');
    const whatsappNumber = sessionStorage.getItem('whatsappNumber');
    const address = sessionStorage.getItem('address');
    const uppercaseAddress = address ? address.toUpperCase() : null;
    console.log("uppercaseaddress", uppercaseAddress);

    const customerName = sessionStorage.getItem('customerName');




    const Email = sessionStorage.getItem('Email');


    // const employeeId = sessionStorage.getItem('employeeId');
    console.log("selectedPlan:", selectedPlan);
    // console.log("employeeId:", employeeId);
    const handlePackageClick = async () => {
        if (!customerType) {
            alert("Please login first"); // Alert if not logged in
            return; // Exit the function
        }
    
        // Check if the customer is an admin
        if (customerType === 'admin' || customerType === 'mainAdmin') {
            navigate('/companydetails', { state: { employeeId: jobDetails.employee_id } });
            return; // Exit the function after navigating to company details
        }
    
        // Proceed with the existing logic for selected plans
        if (['300', '500', '600', '800'].includes(selectedPlan)) {
            try {
                // Fetch data from the API
                const response = await fetch(`${apiBaseUrl}/getPackageSelectionsByCustomerName/${customerName}`);
                const result = await response.json();
    
                if (response.ok && result.message === "Data retrieved successfully") {
                    // Check if jobId from jobDetails exists in the API data
                    const jobExists = result.data.some(item => item.jobId === jobDetails.job_id);
    
                    if (jobExists) {
                        // Navigate to company details if the jobId matches
                        navigate('/companydetails', { state: { employeeId: jobDetails.employee_id } });
                    } else {
                        alert("Please apply for the job first"); // Alert if jobId is not found
                    }
                } else {
                    alert("Failed to verify the job. Please try again later."); // Handle API failure
                }
            } catch (error) {
                console.error("Error fetching data from API:", error);
                alert("An error occurred while checking job details. Please try again."); // Handle network errors
            }
            return; // Exit the function
        }
    
        // Default navigation for other plans
        navigate('/packages', { 
            state: { 
                job: jobDetails.job, 
                jobId: jobDetails.manualJobID && jobDetails.manualJobID !== "0" ? jobDetails.manualJobID : jobDetails.job_id, 
                location: jobDetails.location 
            } 
        });
    };
    

    // Assuming 'selectedPlan', 'jobDetails', and 'customerName' are available in the component's scope
    const Packages2 = async () => {
        if (!customerType) {
            alert("Please login first"); // Alert if not logged in
            return; // Exit the function
        }
        setLoading(true); // Start loading
        if (selectedPlan === '300' || selectedPlan === '500' || selectedPlan === '600' || selectedPlan === '800') {
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

                const currentDate = new Date();
                const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()}`;


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


                    const destinationNumber = `91${jobDetails.whatsapp_number}`;


                    // Prepare WhatsApp message
                    const whatsappPayload = {
                        to: destinationNumber, // Destination WhatsApp number
                        message: `Dear Employer, ${companyName} (ID: *${employeeId}*), താങ്കളുടെ സ്ഥാപനത്തിൽ ഉള്ള ജോലി ഒഴിവിന്  (Job ID: *${jobDetails.job_id}*) www.riyahubs.com വഴി ${formattedDate} തീയതിയിൽ ജോലിക്ക് വേണ്ടിയുള്ള അപേക്ഷ സമർപ്പിച്ചിരിക്കുന്നു.`,
                    };

                    // Send data to the WhatsApp API
                    const whatsappResponse = await fetch(`${apiBaseUrl}/send-whatsapp`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(whatsappPayload),
                    });

                    if (whatsappResponse.ok) {
                        console.log('WhatsApp message sent successfully');
                        alert('Package applied and confirmation sent to WhatsApp.');
                    } else {
                        console.error('Failed to send WhatsApp message');
                        alert('Job applied Successfully!');
                    }
                } else {
                    console.error('Failed to save data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            navigate('/packages', { state: { job: jobDetails.job, jobId: jobDetails.manualJobID && jobDetails.manualJobID !== "0" ? jobDetails.manualJobID : jobDetails.job_id, location: jobDetails.location } });
        }
        setLoading(false); // End loading
    };



    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (jobId) {
            const cleanedJobId = jobIdStr.replace(/^['"]|['"]$/g, '');  // This removes surrounding quotes

            const encodedJobId = encodeURIComponent(cleanedJobId);

            fetch(`${apiBaseUrl}/getjobposts/${encodedJobId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Fetched job data:", data); // Log the fetched data to inspect the response

                    // Check if enable is 'on' as a string (not boolean)
                    if (data.enable && data.enable.toLowerCase() === 'on') {
                        setJobDetails(data);
                    } else {
                        setJobDetails(null);
                        setError('This job is not enabled.');
                    }
                })
                .catch(error => {
                    setError('Error fetching job details. Please try again later.');
                    console.error('Error fetching job details:', error);
                });
        }
    }, [jobId, apiBaseUrl]);


    const downloadStyledImage = () => {
        const container = document.getElementById('jobDetailsContainer');
        container.style.display = 'block'; // Show the container temporarily for capture

        // Set the container dimensions to portrait mode for a standard page size
        container.style.width = '800px';
        container.style.height = '1120px';

        // Generate the QR code with the specified link
        const qrCanvas = document.createElement('canvas');
        QRCode.toCanvas(qrCanvas, 'https://www.riyahubs.com', { width: 100, margin: 2 })
            .then(() => {
                // Append QR code to the container
                qrCanvas.classList.add('absolute', 'bottom-10', 'right-10'); // Position it as needed
                container.appendChild(qrCanvas);

                // Capture the container with html2canvas
                html2canvas(container, { scale: 2, width: 800, height: 1120 }).then(canvas => {
                    const link = document.createElement('a');
                    link.href = canvas.toDataURL('image/png');
                    link.download = 'job_details.png';
                    link.click();

                    // Clean up
                    container.removeChild(qrCanvas); // Remove QR code after download
                    container.style.display = 'none'; // Hide the container again after download
                    container.style.width = ''; // Reset width
                    container.style.height = ''; // Reset height
                }).catch(error => {
                    console.error('Error capturing image:', error);
                });
            })
            .catch(error => {
                console.error('Error generating QR code:', error);
            });
    };

    if (error) {
        return <div>{error}</div>; // Show error message
    }

    if (!jobDetails) {
        return <div>Loading job details...</div>; // Loading state
    }

    const editJobPost = (jobId) => {
        sessionStorage.setItem('jobId', jobId);
        navigate('/editjobpost');
    };
    return (
        <div className='min-h-screen flex flex-col '>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>
            <div className='md:hidden flex flex-col'>
            <Navbar2Mob />
            </div>

            <div className='flex flex-col gap-8 lg:px-12 px-3 mt-12 pb-12'>

                <div className='flex flex-row justify-between w-full'>
                    <div className='h-[42px] lg:w-[13%] w-[40%] bg-[#3B3D3B] hover:bg-[#2f302f] rounded-[10px] flex justify-center items-center text-base font-[600] font-display text-[white] cursor-pointer' onClick={handlePackageClick}>Company Details</div>
                    <div className='h-[42px] lg:w-[13%] w-[40%] bg-[#339030] hover:bg-[#267824] rounded-[10px] flex justify-center items-center text-base font-[600] font-display text-[white] cursor-pointer' >  
                        {loading ? (
                         <div className="w-5 h-5 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-[#E22E37]"></div> // Tailwind CSS spinner
                        ) : (
                            <span onClick={Packages2}>Apply Now</span>
                        )}
                    </div>
                    {(customerType === 'admin' || customerType === 'mainAdmin') && (
                        <div className='h-[42px] lg:w-[13%] w-[40%] bg-[#282d55] hover:bg-[#1d2246] rounded-[10px] flex justify-center items-center text-lg font-[600] font-display text-[white] cursor-pointer' onClick={downloadStyledImage}>download</div>
                    )}
                    {(customerType === 'admin' || customerType === 'mainAdmin') && (
                        <div className='h-[42px] lg:w-[13%] w-[40%] bg-[#d22989] hover:bg-[#be3683] rounded-[10px] flex justify-center items-center text-lg font-[600] font-display text-[white] cursor-pointer' onClick={() => editJobPost(jobDetails.job_id)}>Edit</div>
                    )}
                </div>

                <div className='w-full flex flex-col gap-4'>
                    <span className='text-xl font-[700] font-display text-left'>{jobDetails.job}</span>
                    <span className='text-lg font-[400] font-display text-left'>{jobDetails.job_title}</span>
                    <div className='flex flex-col w-full h-auto gap-2'>
                        <div className='flex lg:flex-row flex-col lg:h-[56px] h-[70px] w-full border-2 border-[#E3EAF1] rounded-[10px]'>
                            <div className='lg:w-[30%] w-full h-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3  items-center'>
                                <img src={id} alt="loc" />
                                <span className='text-[#B3B3B3] text-lg font-[500] font-display'>Job Id</span>
                            </div>
                            <div className='lg:w-[70%] w-full h-full flex items-center px-5 text-lg font-[500] font-display'>
                                {jobDetails.manualJobID && jobDetails.manualJobID !== "0" ? jobDetails.manualJobID : jobDetails.job_id}
                            </div>
                        </div>
                        {(selectedPlan === '300' || selectedPlan === '500' || selectedPlan === '600' || selectedPlan === '800' || customerType === 'admin' || customerType === 'mainAdmin') && (

                            <div className='flex lg:flex-row flex-col lg:h-[56px] h-[70px] w-full border-2 border-[#E3EAF1] rounded-[10px]'>
                                <div className='lg:w-[30%] w-full h-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3  items-center'>
                                    <img src={company} alt="loc" />
                                    <span className='text-[#B3B3B3] text-lg font-[500] font-display'>Company Type</span>
                                </div>
                                <div className='lg:w-[70%] w-full h-full flex items-center px-5 text-lg font-[500] font-display'>
                                    {jobDetails.company_type}
                                </div>
                            </div>
                        )}

                        <div className='flex lg:flex-row flex-col lg:h-[56px] h-[70px] w-full border-2 border-[#E3EAF1] rounded-[10px]'>
                            <div className='lg:w-[30%] w-full h-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3  items-center'>
                                <img src={suitecase} alt="loc" />
                                <span className='text-[#B3B3B3] text-lg font-[500] font-display'>Job Type</span>
                            </div>
                            <div className='lg:w-[70%] w-full h-full flex items-center px-5 text-lg font-[500] font-display'>
                                {jobDetails.job_type}
                            </div>
                        </div>
                        {(selectedPlan === '300' || selectedPlan === '500' || selectedPlan === '600' || selectedPlan === '800' || customerType === 'admin' || customerType === 'mainAdmin') && (

                            <div className='flex lg:flex-row flex-col lg:h-[56px] h-[70px] w-full border-2 border-[#E3EAF1] rounded-[10px]'>
                                <div className='lg:w-[30%] w-full h-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3  items-center'>
                                    <img src={loc} alt="loc" />
                                    <span className='text-[#B3B3B3] text-lg font-[500] font-display'>Location</span>
                                </div>
                                <div className='lg:w-[70%] w-full h-full flex items-center px-5 text-lg font-[500] font-display'>
                                    {jobDetails.location}
                                </div>
                            </div>
                        )}

                        {(selectedPlan === '300' || selectedPlan === '500' || selectedPlan === '600' || selectedPlan === '800' || customerType === 'admin' || customerType === 'mainAdmin') && (

                            <div className='flex lg:flex-row flex-col lg:h-[56px] h-[70px] w-full border-2 border-[#E3EAF1] rounded-[10px]'>
                                <div className='lg:w-[30%] w-full h-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3  items-center'>
                                    <img src={loc} alt="loc" />
                                    <span className='text-[#B3B3B3] text-lg font-[500] font-display'>Address</span>
                                </div>
                                <div className='lg:w-[70%] w-full h-full flex items-center px-5 text-lg font-[500] font-display'>
                                    {jobDetails.address}
                                </div>
                            </div>
                        )}


                        <div className='flex lg:flex-row flex-col lg:h-[56px] h-[70px] w-full border-2 border-[#E3EAF1] rounded-[10px]'>
                            <div className='lg:w-[30%] w-full h-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3  items-center'>
                                <img src={loc} alt="loc" />
                                <span className='text-[#B3B3B3] text-lg font-[500] font-display'>Vacancy</span>
                            </div>
                            <div className='lg:w-[70%] w-full h-full flex items-center px-5 text-lg font-[500] font-display'>
                                {jobDetails.vacancy}
                            </div>
                        </div>



                        <div className='flex lg:flex-row flex-col lg:h-[56px] h-[70px] w-full border-2 border-[#E3EAF1] rounded-[10px]'>
                            <div className='lg:w-[30%] w-full h-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3  items-center'>
                                <img src={dinner} alt="loc" />
                                <span className='text-[#B3B3B3] text-lg font-[500] font-display'>Food & Accomodation</span>
                            </div>
                            <div className='lg:w-[70%] w-full h-full flex items-center px-5 text-lg font-[500] font-display'>
                                {jobDetails.food_type}
                            </div>
                        </div>

                        {/* <div className='flex lg:flex-row flex-col lg:h-[56px] h-[70px] w-full border-2 border-[#E3EAF1] rounded-[10px]'>
                            <div className='lg:w-[30%] w-full h-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3 items-center'>
                                <img src={rs} alt="loc" />
                                <span className='text-[#B3B3B3] text-lg font-[500] font-display'>Monthly Salary</span>
                            </div>
                            <div className='lg:w-[70%] w-full h-full flex items-center px-5 text-lg font-[500] font-display'>
                                {jobDetails.min_salary > 0 && jobDetails.max_salary > 0
                                    ? `₹ ${jobDetails.min_salary} - ₹ ${jobDetails.max_salary}`
                                    : jobDetails.min_salary > 0
                                        ? `₹ ${jobDetails.min_salary}`
                                        : jobDetails.max_salary > 0
                                            ? `₹ ${jobDetails.max_salary}`
                                            : null}
                            </div>
                        </div> */}


                        {(selectedPlan === '300' || selectedPlan === '500' || selectedPlan === '600' || selectedPlan === '800' || customerType === 'admin' || customerType === 'mainAdmin') && (
                            <div className='flex lg:flex-row flex-col lg:h-[56px] h-[70px] w-full border-2 border-[#E3EAF1] rounded-[10px]'>
                                <div className='lg:w-[30%] w-full h-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3 items-center'>
                                    <img src={phone} alt="loc" />
                                    <span className='text-[#B3B3B3] text-lg font-[500] font-display'>Manager Number</span>
                                </div>
                                <div className='lg:w-[70%] w-full h-full flex items-center px-5 text-lg font-[500] font-display'>
                                    {jobDetails.whatsapp_number}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
                <ul className='border-2 border-[#E3EAF1]'></ul>
                {(selectedPlan === '300' || selectedPlan === '500' || selectedPlan === '600' || selectedPlan === '800' || customerType === 'admin' || customerType === 'mainAdmin') && (

                    <div className='flex flex-col w-full gap-4'>
                        <span className='text-xl font-[700] font-display text-left'>Job Desccription</span>
                        <span className='text-lg font-[400] font-display text-left'>{jobDetails.job_description}</span>
                    </div>
                )}

                <span className='text-xl font-[700] font-display text-left'>Requirements</span>

                <div className='flex flex-col w-full h-auto gap-2'>
                    <div className='flex lg:flex-row flex-col lg:h-[56px] h-[70px] w-full border-2 border-[#E3EAF1] rounded-[10px]'>
                        <div className='lg:w-[30%] w-full h-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3  items-center'>

                            <span className='text-[#B3B3B3] text-lg font-[500] font-display'>Required Gender</span>
                        </div>
                        <div className='lg:w-[70%] w-full h-full flex items-center px-5 text-lg font-[500] font-display'>
                            {jobDetails.gender_type}
                        </div>
                    </div>

                    <div className='flex lg:flex-row flex-col lg:h-[56px] h-[70px] w-full border-2 border-[#E3EAF1] rounded-[10px]'>
                        <div className='lg:w-[30%] w-full h-full lg:border-r-2 border-b-2 border-[#E3EAF1] flex flex-row px-5 gap-3  items-center'>

                            <span className='text-[#B3B3B3] text-lg font-[500] font-display'>Qualification</span>
                        </div>
                        <div className='lg:w-[70%] w-full h-full flex items-center px-5 text-lg font-[500] font-display'>
                            {jobDetails.qualification}
                        </div>
                    </div>
                </div>


            </div>
            {/* <div className='grid lg:grid-cols-6 grid-cols-3 w-full lg:px-12 px-3 gap-12 mt-12 pb-8'>
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
            </div> */}

            <div id="jobDetailsContainer" className='relative' style={{ display: 'none', height: '100vh', width: '100vw' }}>
                <img src={poster} alt='main' style={{ width: '100%', height: "100%" }} />
                <div className='absolute inset-0 flex flex-row w-[100%] h-[100%] '>
                    <div className='px-12   flex flex-col'>
                        <div className='text-[#E22E37] text-9xl font-[700] mt-[25%] text-left font-display'>WE ARE HIRING!</div>
                        <div className='w-auto max-w-[70%] h-auto bg-[#E22E37] flex justify-center items-center text-center text-[white] font-[800] text-3xl mt-[10%] rounded-[10px] font-display'> <span className='mb-5'>{jobDetails.job}</span></div>
                        <div className='w-[90%] h-auto bg-[white] rounded-[10px] px-12 py-6 flex flex-col gap-5 mt-[5%]'>
                            <span className='flex flex-row gap-3 font-[600] text-2xl font-display text-left'><span>{jobDetails.job_title}</span> </span>
                            <span className='flex flex-row gap-3 font-[600] text-2xl font-display'>Job ID : <span>{jobDetails.manualJobID && jobDetails.manualJobID !== "0" ? jobDetails.manualJobID : jobDetails.job_id}</span> </span>


                            <span className='flex flex-row gap-3 font-[600] text-2xl font-display'>
                                Salary :
                                <span>
                                    {jobDetails.min_salary > 0 && jobDetails.max_salary > 0
                                        ? `${jobDetails.min_salary} - ${jobDetails.max_salary}`
                                        : jobDetails.min_salary > 0
                                            ? jobDetails.min_salary
                                            : jobDetails.max_salary > 0
                                                ? jobDetails.max_salary
                                                : jobDetails.salaryType}
                                </span>
                            </span>
                            <span className='flex flex-row gap-3 font-[600] text-2xl font-display'>Qualification : <span>{jobDetails.qualification}</span> </span>
                            <span className='flex flex-row gap-3 font-[600] text-2xl font-display'>Gender : <span>{jobDetails.gender_type}</span> </span>
                            <span className='flex flex-row gap-3 font-[600] text-2xl font-display'>Location : <span>{jobDetails.location}</span> </span>
                        </div>
                        <div className='flex flex-col mt-[5%] gap-3'>
                            <div className='text-[#E22E37] font-[700] text-3xl font-display text-left'>Send your CV & Portfolio to:</div>
                            {jobDetails.location !== 'Mannarkkad' && (
                                <div className='text-[#E22E37] font-[700] text-3xl font-display text-left'>📞 +91 9544129746, +91 9544500746</div>
                            )}


                            {jobDetails.location === 'Mannarkkad' && (
                                <div className='text-[#E22E37] font-[700] text-3xl font-display text-left'>📞 +91 7356400746, +91 9544129746</div>
                            )}

                            <div className=' font-[900] text-2xl font-display text-center'>WWW.RIYAHUBS.COM</div>


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
