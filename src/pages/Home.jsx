import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive';
import Navbar from '../components/Navbar'
import Navbar2 from '../components/Navbar2'
// import abroad from '../images/mainPage/abroad.png'
import india from '../images/mainPage/india.png'
import girl from '../images/home/girl.png'
import NavbarMob from '../components/NavbarMob';
import vector from '../images/home/Vector.png'
import bulb from '../images/home/bulb.png'
import girloffice from '../images/home/girloffice.png'
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar3 from '../components/Navbar3';
import Navbar4 from '../components/Navbar4';
import Navbar5 from '../components/Navbar5';
import Navbar2Mob from '../components/Navbar2Mob';
import Navbar3Mob from '../components/Navbar3Mob';
import Navbar4Mob from '../components/Navbar4Mob';
import Navbar5Mob from '../components/Navbar5Mob';


function Home() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const employeeId = sessionStorage.getItem('employeeId');
    const companyName = sessionStorage.getItem('customerName');
    const houseName = sessionStorage.getItem('houseName');
    const experienced = sessionStorage.getItem('experienced');


    const [loadingJobs, setLoadingJobs] = useState({});

    console.log("company name:", companyName);

    const customerType = sessionStorage.getItem('customerType');
    console.log("customer Type:", customerType);

    const selectedPlan = sessionStorage.getItem('selectedPlan');
    console.log("selectedPlan:", selectedPlan);


    const District = sessionStorage.getItem('District');
    console.log("District:", District);

    const mobileNumber = sessionStorage.getItem('mobileNumber');
    const whatsappNumber = sessionStorage.getItem('whatsappNumber');
    const Email = sessionStorage.getItem('Email');


    const [visibleJobs, setVisibleJobs] = useState(9);

    // Function to load more jobs
    const loadMoreJobs = () => {
        setVisibleJobs(prevVisibleJobs => prevVisibleJobs + 9);
    };


    const [jobPosts, setJobPosts] = useState([]);
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    console.log(employeeId, "employeeId");

    const navigate = useNavigate();
    // const HomePage = () => {
    //     navigate('/home');
    // };

    const empreg2 = () => {
        navigate('/empreg');
    };

    const regchoose = () => {
        navigate('/regchoose');
    };
    const canreg2 = () => {
        navigate('/canreg');
    };

    // Fetch job posts when component mounts
    useEffect(() => {
        fetch(`${apiBaseUrl}/getjobposts`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Filter the data where 'enable' is 'on'
                const enabledJobPosts = data.filter(job => job.enable === 'on');
                setJobPosts(enabledJobPosts); // Store filtered job posts in state
            })
            .catch(error => {
                console.error('Error fetching job posts:', error);
            });
    }, [apiBaseUrl]);


    // Navigate to details page with job_id passed as state
    const details = (jobId) => {
        console.log("passing Job ID: ", jobId)
        navigate('/details', { state: { jobId } }); // Pass job_id as state
    };

    // Updated Packages2 function to take job details as a parameter
    const Packages2 = async (job) => {
        // Mark the job as loading
        setLoadingJobs(prevState => ({
            ...prevState,
            [job.job_id]: true,
        }));

        if (!customerType) {
            alert("Please login first");
            setLoadingJobs(prevState => ({
                ...prevState,
                [job.job_id]: false, // Reset loading state
            }));
            return;
        }

        if (selectedPlan === '300' || selectedPlan === '500' || selectedPlan === '600' || selectedPlan === '800') {
            try {
                // Fetch additional data from APIs based on employeeId
                const fetchEmployeeData = async () => {
                    try {
                        // First, try the primary API
                        const response = await fetch(`${apiBaseUrl}/employee/${job.employee_id}`);
                        if (!response.ok) {
                            throw new Error('Employee not found in primary API');
                        }
                        const data = await response.json();
                        return {
                            additionalCompanyName: data.employee.company_name, // Rename key
                            additionalMobileNumber: data.employee.mobile_number, // Rename key
                            additionalLocation: data.employee.location, // Rename key
                        };
                    } catch (error) {
                        console.log("Primary API failed:", error.message);

                        // Try the fallback API if the primary fails
                        try {
                            const fallbackResponse = await fetch(`${apiBaseUrl}/staff/${job.employee_id}`);
                            if (!fallbackResponse.ok) {
                                throw new Error('Employee not found in fallback API');
                            }
                            const fallbackData = await fallbackResponse.json();
                            return {
                                additionalCompanyName: fallbackData.employee.companyName, // Rename key
                                additionalMobileNumber: fallbackData.employee.mobileNumber, // Rename key
                                additionalLocation: fallbackData.employee.address, // Rename key
                            };
                        } catch (fallbackError) {
                            console.log("Fallback API failed:", fallbackError.message);
                            throw fallbackError;
                        }
                    }
                };

                const additionalData = await fetchEmployeeData();

                const payload = {
                    employeeId: job.employee_id,
                    customerName: companyName,
                    houseName: houseName,
                    experienced: experienced,
                    jobId: job.job_id,
                    whatsappNumber: whatsappNumber,
                    mobileNumber: mobileNumber,
                    Email: Email,
                    additionalCompanyName: additionalData.additionalCompanyName, // New data
                    additionalMobileNumber: additionalData.additionalMobileNumber, // New data
                    additionalLocation: additionalData.additionalLocation,
                };

                const currentDate = new Date();
                const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()}`;


                // Send data to the savePackageSelection API
                const response = await fetch(`${apiBaseUrl}/savePackageSelection`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    console.log('Data saved successfully');


                    const destinationNumber = `91${job.whatsapp_number}`;
                    // const destinationNumber = '919207427150';


                    // Prepare WhatsApp message
                    const whatsappPayload = {
                        to: destinationNumber, // Destination WhatsApp number
                        message: `Dear Employer, ${companyName} (ID: *${employeeId}*), താങ്കളുടെ സ്ഥാപനത്തിൽ ഉള്ള *${job.job}* (Job ID: *${job.manualJobID && job.manualJobID !== "0" ? job.manualJobID : job.job_id}*) ജോലി ഒഴിവിന് www.riyahubs.com വഴി ${formattedDate} തീയതിയിൽ ജോലിക്ക് വേണ്ടിയുള്ള അപേക്ഷ സമർപ്പിച്ചിരിക്കുന്നു.`,
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
            navigate('/packages', {
                state: {
                    job: job.job,
                    jobId: job.manualJobID && job.manualJobID !== "0" ? job.manualJobID : job.job_id,
                    location: job.location,
                },
            });
        }
        // Reset loading state after the operation is completed
        setLoadingJobs(prevState => ({
            ...prevState,
            [job.job_id]: false,
        }));
    };

    function formatJobTitle(title) {
        const lowercaseWords = ["at", "in", "of", "for", "to", "and", "on", "by", "with"];
        return title
            .split(" ")
            .map((word, index) =>
                lowercaseWords.includes(word.toLowerCase()) && index !== 0
                    ? word.toLowerCase()
                    : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ");
    }





    return (
        <div className='min-h-screen flex flex-col'>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden flex-col'>
                <Navbar2 />
                {(customerType === 'admin' || customerType === 'mainAdmin') && (

                    <Navbar3 />
                )}
                {customerType === 'employee' && (

                    <Navbar4 />
                )}
                {customerType === 'candidate' && (

                    <Navbar5 />
                )}

            </div>

            <div className='md:hidden flex flex-col'>
                <Navbar2Mob />
                {(customerType === 'admin' || customerType === 'mainAdmin') && (

                    <Navbar3Mob />
                )}
                {customerType === 'employee' && (

                    <Navbar4Mob />
                )}
                {customerType === 'candidate' && (

                    <Navbar5Mob />
                )}

            </div>

            <div className='w-full lg:h-[500px] md:h-[900px] h-[700px] bg-[black] flex flex-col pb-3'>
                <div className='w-full h-[20%] flex justify-center items-center  px-12 text-[white] lg:text-3xl md:text-3xl sm:text-2xl text-xl font-[600] font-display'>
                    Welcome to Riya Hub Jobs - Best Job Portal in India
                </div>
                <div className='w-full h-[80%] flex justify-center items-center lg:px-12 px-3  lg:flex-row flex-col gap-5'>
                    <div className='lg:w-[50%] w-[100%] lg:h-[340px] md:h-[300px] h-[260px] rounded-[10px] bg-[white] flex flex-row justify-center items-center cursor-pointer'>
                        <div className='w-[60%] h-[80%]  flex flex-col gap-4 lg:px-12 px-3 justify-start items-start'>
                            <span className='lg:text-2xl md:text-2xl text-xl  font-[700] font-display'>I am a Candidate</span>
                            <span className='text-base   font-[700] font-display'>I Want a Job</span>
                            <div className='h-[42px] lg:w-[50%] w-[50%] bg-[#E22E37] rounded-[5px] flex justify-center items-center lg:text-base text-xs font-[600] font-display text-[white] cursor-pointer hover:bg-black hover:text-white' onClick={canreg2}>Free Register</div>
                        </div>
                        <div className='w-[40%] h-full flex justify-center items-end'>
                            <img src={girl} alt="girl" />
                        </div>
                    </div>
                    <div className='lg:w-[50%] w-[100%] lg:h-[340px] md:h-[300px] h-[260px] rounded-[10px] bg-[#E22E37] flex flex-row justify-center items-center ' >
                        <div className='w-[60%] h-[80%]  flex flex-col gap-4 lg:px-12 px-3 justify-start items-start'>
                            <span className='lg:text-2xl md:text-2xl text-xl font-[700] font-display text-[white]'>I am an Employer</span>
                            <span className='text-base   font-[700] font-display text-[white]'>I Want to Hire</span>
                            <div className='h-[42px] lg:w-[50%] w-[50%] bg-[white] rounded-[5px] flex justify-center items-center lg:text-base text-xs font-[600] font-display cursor-pointer hover:bg-black hover:text-white' onClick={empreg2}>Free Job Post</div>
                        </div>
                        <div className='w-[40%] h-full flex justify-center items-end'>
                            <img src={india} alt="abroad" />
                        </div>
                    </div>

                </div>
            </div>

            <div className='flex flex-col w-full lg:px-12 px-3 h-auto gap-12 mt-12 justify-center items-center pb-12 bg-[#FFFFFF]'>
                <span className='text-4xl font-[600] font-display'>Latest Jobs</span>
                <div className='grid lg:grid-cols-3 grid-cols-1 w-full gap-3'>
                    {jobPosts.slice(0, visibleJobs).map((job, index) => (
                        <div
                            key={index}
                            className='lg:h-[400px] h-[400px] border-2 border-[#C5C5C5] w-full rounded-[10px] flex flex-col overflow-hidden'
                        >
                            <div className='w-full h-[30%] bg-[white] border-b-2 border-[#C5C5C5]  p-2 gap-2 flex justify-center items-center flex-col'>
                                <span className=' text-lg font-[650] font-display'>{formatJobTitle(job.job_title)}</span>
                                <div className='flex flex-row gap-2 items-center justify-center  '>
                                    <img className='text-[black]' src={vector} alt="loc" />
                                    <span className='text-base font-[500] font-display '>{job.location}</span>
                                </div>
                            </div>
                            <div className='w-full h-[70%] flex flex-row bg-[white]'>
                                <div className='flex flex-col w-[50%] h-full gap-3 mt-3 pl-5'>
                                    <div className='flex items-center justify-between w-full'>
                                        <span className='text-base font-display font-[600]'>JOB ID</span>
                                        <span className='text-base font-display font-[600]'>:</span>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <span className='text-base font-display font-[600]'>JOB</span>
                                        <span className='text-base font-display font-[600]'>:</span>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <span className='text-base font-display font-[600]'>JOB TYPE</span>
                                        <span className='text-base font-display font-[600]'>:</span>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <span className='text-base font-display font-[600]'>BOYS / GIRLS</span>
                                        <span className='text-base font-display font-[600]'>:</span>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <span className='text-base font-display font-[600]'>Salary</span>
                                        <span className='text-base font-display font-[600]'>:</span>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <span className='text-base font-display font-[600]'>Qualification</span>
                                        <span className='text-base font-display font-[600]'>:</span>
                                    </div>

                                    <div className='flex items-center justify-center w-[80%] h-[38px] bg-[black] rounded-[10px] text-base font-[600] font-display text-[white] cursor-pointer hover:bg-[#E22E37] ' >
                                        {loadingJobs[job.job_id] ? (
                                            <div className="w-5 h-5 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-[#E22E37]"></div> // Tailwind CSS spinner
                                        ) : (
                                            <span onClick={() => Packages2(job)}>Apply Now</span>
                                        )}
                                    </div>
                                </div>
                                <div className='flex flex-col w-[50%] h-full gap-3 mt-3 pl-2'>
                                    <div className='flex items-center justify-between w-full'>
                                        <span className='text-base font-display font-[500]'>{job.manualJobID && job.manualJobID !== "0" ? job.manualJobID : job.job_id}</span>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <span
                                            className={`text-base font-display font-[500] ${job.job.length > 20 ? 'text-xs' : 'text-base'
                                                }`}
                                        >
                                            {job.job}
                                        </span>
                                    </div>

                                    <div className='flex items-center justify-between'>
                                        <span className='text-base font-display font-[500]'>{job.job_type}</span>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <span className='text-base font-display font-[500]'>
                                            {job.gender_type === "MALE"
                                                ? "BOYS"
                                                : job.gender_type === "FEMALE"
                                                    ? "GIRLS"
                                                    : job.gender_type === "MALE/FEMALE"
                                                        ? "BOYS/GIRLS"
                                                        : job.gender_type}
                                        </span>

                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <span className='text-base font-display font-[500]'> {job.min_salary > 0 && job.max_salary > 0
                                            ? `${job.min_salary} - ${job.max_salary}`
                                            : job.min_salary > 0
                                                ? job.min_salary
                                                : job.max_salary > 0
                                                    ? job.max_salary
                                                    : job.salaryType}</span>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <span className='text-base font-display font-[500]'>
                                            {job.qualification ? job.qualification : 'nil'}
                                        </span>
                                    </div>
                                    <div
                                        className='flex items-center justify-center w-[80%] h-[38px] bg-[black] rounded-[10px] text-base font-[600] font-display text-[white] cursor-pointer hover:bg-[#E22E37]'
                                        onClick={() => details(job.manualJobID && job.manualJobID !== "0" ? job.manualJobID : job.job_id)}
                                    >
                                        Job Details
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Show "View More" button if there are more jobs to load */}
                {visibleJobs < jobPosts.length && (
                    <div className='flex justify-center mt-4'>
                        <button
                            className='bg-[#E22E37] text-white px-4 py-2 rounded-md text-lg font-semibold hover:bg-[#912727]'
                            onClick={loadMoreJobs}
                        >
                            View More
                        </button>
                    </div>
                )}
                <div className='w-full h-[355px] bg-[#E22E37] mt-12 flex flex-row'>
                    <div className='lg:w-[60%] w-[100%] lg:items-start items-center lg:justify-start justify-center lg:pl-12 lg:pr-[15%] pl-3 pr-[3%]  flex flex-col lg:text-left text-center  lg:gap-3 gap-6'>
                        <img src={bulb} alt="bulb" className='lg:flex hidden' />
                        <span className='text-3xl font-[700] font-display text-[white]'>Discover your ideal career opportunity today.</span>
                        <span className='text-base font-[300] font-display text-white'>Unlock your potential with tailored job listings that
                            match your skills and aspirations. Start exploring opportunities that
                            bring you closer to your career goals.</span>
                        <div className='lg:w-[30%] w-[50%] bg-[white] h-[40px] rounded-[5px] justify-center items-center flex text-base font-[700] font-display cursor-pointer hover:bg-black hover:text-white' onClick={regchoose}>Register Now</div>
                    </div>
                    <div className='w-[40%]   lg:flex hidden justify-center items-end'>
                        <img src={girloffice} alt="girloffice" />
                    </div>
                </div>
            </div>

            <div className='mt-12'>
                <Footer />
            </div>

        </div>
    )
}

export default Home
