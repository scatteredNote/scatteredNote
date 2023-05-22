import React from 'react'
import NoteCard from './NoteCard'

const notes = [
  [{
    title: 'Note Taking',
    description: 'Note-taking while researching or reading or investigation made seamless. Switch between modes and stay focused on the main task.',
    image: '/note-white.svg',
    color: 'bg-[#F7F8F8]',
    textColor: 'text-[#434141]'
  },
  {
    title: 'Note Taking',
    description: 'Note-taking while researching or reading or investigation made seamless. Switch between modes and stay focused on the main task.',
    image: '/note-white.svg',
    color: 'bg-[#434141]',
    textColor: 'text-[#F7F8F8]'
    },
  ],
  [{
    title: 'Note Taking',
    description: 'Note-taking while researching or reading or investigation made seamless. Switch between modes and stay focused on the main task.',
    image: '/note-black.svg',
    color: 'bg-[#434141]',
    textColor: 'text-[#F7F8F8]'
  },
  {
    title: 'Note Taking',
    description: 'Note-taking while researching or reading or investigation made seamless. Switch between modes and stay focused on the main task.',
    image: '/note-white.svg',
    color: 'bg-[#F7F8F8]',
    textColor: 'text-[#434141]'
    },
  ],
  [{
    title: 'Note Taking',
    description: 'Note-taking while researching or reading or investigation made seamless. Switch between modes and stay focused on the main task.',
    image: '/note-white.svg',
    color: 'bg-[#F7F8F8]',
    textColor: 'text-[#434141]'
    
  },
  {
    title: 'Note Taking',
    description: 'Note-taking while researching or reading or investigation made seamless. Switch between modes and stay focused on the main task.',
    image: '/note-black.svg',
    color: 'bg-[#434141]',
    textColor: 'text-[#F7F8F8]'
  }],
]

export default function NoteCardList() {
  return (
    <div className='flex flex-col gap-y-12 w-full'>
      {notes.flatMap((note, index) => (
        <div  key={index} className={` grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-12  ${((index+1)%2)==0? "ml-0 lg:ml-10": "ml-0"}`}>
          <NoteCard title={note[0].title} description={note[0].description} image={note[0].image} color={note[0].color} textColor={note[0].textColor} />
           <NoteCard title={note[1].title} description={note[1].description} image={note[1].image} color={note[1].color} textColor={note[1].textColor} />
        </div>
        
      ))}
    </div>
  )
}
