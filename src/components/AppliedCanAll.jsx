import React from 'react'
import { useMediaQuery } from 'react-responsive';
import NavbarMob from './NavbarMob';
import Navbar from './Navbar';
import Footer from './Footer';
import Navbar2 from './Navbar2';

function AppliedCanAll() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return (
        <div className='flex flex-col min-h-screen'>
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div> 
            
            <div className='flex lg:px-12 px-3 py-12 flex-col min-h-screen bg-[#eeebeb]'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            </div>
            </div>
            
            <Footer />
        </div>
    )
}

export default AppliedCanAll