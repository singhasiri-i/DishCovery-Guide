import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../../components/Nav'
import FooterBy from '../../components/FooterBy'


const Error = () => {

  return (
    <div className='errorPage relative flex flex-col min-h-screen bg-[url("/images/404.jpg")] bg-cover bg-no-repeat bg-center w-full'>
        {/* <Nav /> */}
        <div className='absolute top-[50px] left-[50px] md:left-[150px] flex flex-col items-start'>
            <h1 className='flex text-[65px] md:text-[85px] lg:text-[150px] font-sans font-extrabold text-[#FF0000]'>ERROR !</h1>
            <p className='flex text-[40px] md:text-[50px] w-full font-sans font-semibold'>Page not found.</p>
            <p className='flex text-[30px] md:text-[40px] w-[80%] lg:w-full font-sans font-semibold'>Nothing to eat here.</p>
            <Link to={"/"}  className='flex p-[8px] px-[20px] mt-[50px] bg-[#00843C] text-white rounded-[6px] font-sans font-bold'>Back Home</Link>
        </div>
        {/* <FooterBy /> */}
    </div>
  )
}

export default Error