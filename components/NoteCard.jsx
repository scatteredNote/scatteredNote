import React from 'react'
import Image from 'next/image'

export default function NoteCard({ title, description, image, color, textColor}) {
  return (
    <div className={` ${color} rounded-lg p-4 font-manrope  shadow-md hover:shadow-xl`}>
      <div className='relative w-12 h-12'>
        <Image
          src={`${image}`}
          layout="fill"
          className="relative  w-full text-[#000000]"
          alt="hero image"
        />
      </div>
      <h3 className={`font-bold text-[1.125rem] lg:text-[1.75rem]  lg:leading-[2.391rem] ${textColor} mt-4`}>{title}</h3>
      <p className={`font-normal text-[1.05rem] lg:text-[1.125rem] leading-[2.25rem] ${textColor} mt-2`}>{ description}</p>
    </div>
  )
}
