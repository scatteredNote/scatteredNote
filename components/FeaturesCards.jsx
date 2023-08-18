import React from 'react'

const notes = {
  title: 'Note Taking',
  description: 'Note-taking while researching or reading or investigation made seamless. Switch between modes and stay focused on the main task.',
  image: '/notes-white.svg',
  color: 'bg-[#F7F8F8]',
  textColor: 'text-[#434141]'
}

export default function FeaturesCards({ title, description, image, reversed, index }) {
  return (
    <div className={`flex flex-col mb-12 lg:mb-20 h-full lg:h-[50vh]   ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"}`} >
      <div className={`w-full lg:w-[50%] flex flex-col justify-center`}>
        <h3 className={`font-bold text-[1.4rem] leading-[2.049rem] text-[#2E2F30] lg:w-[70%] ${reversed ? "lg:self-end " : ""} `}>{title}</h3>
        <p className={`mt-2 lg:mt-4 font-normal text-md tracking-tight lg:text-[18px] lg:leading-[36px] text-[#333333] lg:w-[70%] ${reversed ? "lg:self-end " : ""}`}>{description}</p>
      </div>
      <div className='flex items-center justify-center   w-full lg:w-[50%] lg:h-full mt-6 lg:mt-0'>

        <video autoPlay loop muted className='w-full h-auto' playsinline>
          <source src={image} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

      </div>
    </div>
  )
}
