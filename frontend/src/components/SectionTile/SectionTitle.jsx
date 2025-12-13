import React from 'react'

function SectionTitle({ heading, subHeding }) {
  return (
    <div  className='md:w-[340px] mx-auto text-center'>
      <h2 className='font-medium text-xl text-[#D99900] pb-3 '>{subHeding}</h2>
      <p className=' text-[35px] font-normal border-y-4 border-[#E8E8E8] '>{heading}</p>
    </div>
  )
}

export default SectionTitle