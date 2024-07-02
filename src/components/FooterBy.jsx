import React from 'react'
import Marquee from 'react-fast-marquee'

const FooterBy = () => {
  return (
    <div className='footerBar absolute bottom-0 flex w-full h-[50px] justify-between items-center bg-[#00843C]'>
          <Marquee pauseOnHover>
            Developed By Issariyaporn Singhasiri
          </Marquee>
    </div>
  )
}

export default FooterBy