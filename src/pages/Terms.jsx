import React, { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive';
import NavbarMob from '../components/NavbarMob';
import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import Navbar2Mob from '../components/Navbar2Mob';


function Terms() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // function isPalindrome(str) {
    //     const reversed = str.split('').reverse().join('');
    //     return str === reversed;
    //   }
    //   console.log(isPalindrome("radar")); // Output: true
    //   console.log(isPalindrome("hello")); // Output: false
      

    // function factorial(n) {
    //     if (n === 0 || n === 1) return 1;
    //     return n * factorial(n - 1);
    //   }
    //   console.log(factorial(5)); // Output: 120

    // function isPrime(num) {
    //     if (num < 2) return false;
      
    //     for (let i = 2; i <= Math.sqrt(num); i++) {
    //       if (num % i === 0) return false;
    //     }
    //     return true;
    //   }
    //   console.log(isPrime(7)); // Output: true
    //   console.log(isPrime(10)); // Output: false
      
    // function fibonacci(n) {
    //     const result = [0, 1];
      
    //     for (let i = 2; i < n; i++) {
    //       result.push(result[i - 1] + result[i - 2]);
    //     }
      
    //     return result.slice(0, n); // Limit to `n` elements
    //   }
    //   console.log(fibonacci(5)); // Output: [0, 1, 1, 2, 3]
      
    // function secondLargest(arr) {
    //     let max = -Infinity, secondMax = -Infinity;
      
    //     for (let num of arr) {
    //       if (num > max) {
    //         secondMax = max;
    //         max = num;
    //       } else if (num > secondMax && num !== max) {
    //         secondMax = num;
    //       }
    //     }
      
    //     return secondMax;
    //   }
    //   console.log(secondLargest([1, 5, 3, 9, 2])); // Output: 5


//     // 3. String Manipulation Questions
// // Q11: How do you count the occurrences of each character in a string?

// function countCharacters(str) {
//   const charCount = {};

//   for (let char of str) {
//     charCount[char] = (charCount[char] || 0) + 1;
//   }

//   return charCount;
// }
// console.log(countCharacters("hello")); 
// // Output: { h: 1, e: 1, l: 2, o: 1 }

// How do you find all unique characters in a string?
// function uniqueCharacters(str) {
//     const charSet = new Set(str);
//     return Array.from(charSet).join('');
//   }
//   console.log(uniqueCharacters("hello")); // Output: "helo"


// How do you remove duplicates from an array?
// function removeDuplicates(arr) {
//     return [...new Set(arr)];
//   }
//   console.log(removeDuplicates([1, 2, 2, 3, 4, 4])); // Output: [1, 2, 3, 4]


// // How do you merge two sorted arrays into a single sorted array?
// function mergeSortedArrays(arr1, arr2) {
//     let i = 0, j = 0;
//     const merged = [];
  
//     while (i < arr1.length && j < arr2.length) {
//       if (arr1[i] < arr2[j]) {
//         merged.push(arr1[i++]);
//       } else {
//         merged.push(arr2[j++]);
//       }
//     }
  
//     return merged.concat(arr1.slice(i)).concat(arr2.slice(j));
//   }
//   console.log(mergeSortedArrays([1, 3, 5], [2, 4, 6])); 
//   // Output: [1, 2, 3, 4, 5, 6]
  
  
// // Write a program to find the missing number in an array of 1 to n.
// function findMissingNumber(arr, n) {
//     const total = (n * (n + 1)) / 2;
//     const sum = arr.reduce((a, b) => a + b, 0);
//     return total - sum;
//   }
//   console.log(findMissingNumber([1, 2, 4, 5], 5)); // Output: 3
  
      
      

    return (
        <div className='min-h-screen flex flex-col'>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>
            <div className='md:hidden flex flex-col'>
            <Navbar2Mob />
            </div>
            <div className='lg:px-12 px-3 lg:py-12 py-3 flex flex-col min-h-screen gap-8'>

                <div className='w-full flex justify-center items-center text-[#E22E37] lg:text-3xl text-xl font-[700] font-display'>Terms & Conditions</div>

                <div className='w-full flex flex-col gap-10'>
                    <div className='flex flex-col w-full gap-4 text-left'>
                        <span className='lg:text-xl text-lg font-[700] font-display'>Acceptance of Terms</span>
                        <span className='lg:text-lg text-base font-[400] font-display'>By accessing or using our website,
                            you agree to comply with and be bound by these Terms and Conditions.
                            If you do not agree, you must not use the site.
                        </span>
                    </div>



                    <div className='flex flex-col w-full gap-4 text-left'>
                        <span className='lg:text-xl text-lg font-[700] font-display'>Purpose of the Site
                        </span>
                        <span className='lg:text-lg text-base font-[400] font-display'>Our website provides a
                            platform for job seekers to explore job opportunities and for companies
                            to post available positions. We facilitate the connection between job
                            seekers and companies but do not engage in the hiring process itself.


                        </span>
                    </div>


                    <div className='flex flex-col w-full gap-4 text-left'>
                        <span className='lg:text-xl text-lg font-[700] font-display'>User Responsibilities
                        </span>
                        <div className='lg:text-lg text-base font-[400] font-display flex flex-col gap-6'>
                            <div className='flex lg:flex-row flex-col'>

                                <span className='font-[600]'>Job Seekers</span> : You are responsible for
                                verifying the credibility of each company and the legitimacy of job opportunities
                                before proceeding with any application or interview.

                            </div>

                            <div className='flex lg:flex-row flex-col'>

                                <span className='font-[600]'>Employers</span> :  Employers are responsible for
                                the accuracy and legality of their job postings. Misleading or fraudulent job postings are strictly prohibited.

                            </div>


                            <div className='flex lg:flex-row flex-col'>

                                <span className='font-[600]'>Employers</span> :  Employers should understand that the candidates who apply 
                                for job postings are not representatives, agents, or 
                                affiliated with our platform in any way. Candidates are independent
                                 applicants, and our platform does not take responsibility
                                  for their actions, qualifications, or any representations they may make.

                            </div>



                        </div>
                    </div>





                    <div className='flex flex-col w-full gap-4 text-left'>
                        <span className='lg:text-xl text-lg font-[700] font-display'>Site Responsibility Disclaimer
                        </span>
                        <span className='lg:text-lg text-base font-[400] font-display'>Our website serves only as a platform
                            for job listings and does not take responsibility for
                            any job-related matters. We are not involved in,
                            nor do we endorse or verify, the hiring practices
                            or authenticity of companies using our platform.
                            Any employment terms, workplace conditions, or issues arising from
                            employment are solely between the job seeker and the employer.
                            We cannot be held liable for any actions, misconduct, or disputes
                            that occur between users and employers.
                        </span>



                    </div>


                    <div className='flex flex-col w-full gap-4 text-left'>
                        <span className='lg:text-xl text-lg font-[700] font-display'>Content Accuracy

                        </span>
                        <span className='lg:text-lg text-base font-[400] font-display'>While we aim to provide
                            accurate information, we do not guarantee the completeness or reliability
                            of any content, including job listings, posted on our website.


                        </span>



                    </div>




                    <div className='flex flex-col w-full gap-4 text-left'>
                        <span className='lg:text-xl text-lg font-[700] font-display'>Limitation of Liability


                        </span>
                        <span className='lg:text-lg text-base font-[400] font-display'>We shall not be liable
                            for any direct, indirect, incidental, or consequential
                            damages resulting from the use of, or inability to use,
                            our website. This includes any issues arising from interactions or
                            employment relations with third parties (employers).




                        </span>



                    </div>


                    <div className='flex flex-col w-full gap-4 text-left'>
                        <span className='lg:text-xl text-lg font-[700] font-display'>Privacy</span>
                        <span className='lg:text-lg text-base font-[400] font-display'>We are committed to protecting user privacy.
                            Please refer to our Privacy Policy for information on data handling and protection.
                        </span>
                    </div>


                    <div className='flex flex-col w-full gap-4 text-left'>
                        <span className='lg:text-xl text-lg font-[700] font-display'>Modifications
                        </span>
                        <span className='lg:text-lg text-base font-[400] font-display'>We reserve the right to
                            modify these Terms and Conditions at any time.
                            Users are encouraged to review these Terms periodically for updates.


                        </span>
                    </div>


                    <div className='flex flex-col w-full gap-4 text-left'>
                        <span className='lg:text-xl text-lg font-[700] font-display'>Governing Law </span>
                        <span className='lg:text-lg text-base font-[400] font-display'>These Terms and Conditions
                            shall be governed by the laws of Perinthalmanna and Mannarkad.
                        </span>
                    </div>





                </div>

            </div>

            <Footer />
        </div>
    )
}

export default Terms