import React from 'react'
import { useMediaQuery } from 'react-responsive';
import NavbarMob from '../components/NavbarMob';
import Navbar from '../components/Navbar';

function Packages() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  return (
    <div className='min-h-screen flex flex-col '>
       {isMobile ? <NavbarMob /> : <Navbar />}
    </div>
  )
}

export default Packages
