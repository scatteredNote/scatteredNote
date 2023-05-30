import React from 'react'
import NoteCard from './NoteCard'

const notes = [
  [{
    title: 'By-Product',
    description: 'Note-taking while doing research or reading or investigation should be a by-product of the main task. switching mode should be controlled to prevent distraction from the main task. Hence note-taking should be seamless and undistracted time.',
    image: '/note-white.svg',
    color: 'bg-[#F7F8F8]',
    textColor: 'text-[#434141]'
  },
  {
    title: 'In Peace With Forgetting',
    description: 'Being in Peace with forgetting, reshape your perspective on how you obtain and manage information. our aim is to enforce this',
    image: '/note-white.svg',
    color: 'bg-[#434141]',
    textColor: 'text-[#F7F8F8]'
    
  },
  ],
  [{
    title: 'Trapped in',
    description: 'Simple UI and workflow to ensure the user is never trapped while taking notes. Ensure the user falls back to the main task immediately after quick note-taking',
    image: '/note-black.svg',
    color: 'bg-[#434141]',
    textColor: 'text-[#F7F8F8]'
  },
  {
    title: 'Atomic',
    description: 'Pieces of information are best stored in atomic quantities to prevent overload. We ensure information grabbed from any source are atomic as possible, but your perspective can be as long as possible to fletch out the atomic information',
    image: '/note-white.svg',
    color: 'bg-[#F7F8F8]',
    textColor: 'text-[#434141]'
    },
  ],
  [{
    title: 'Personal Perspective dimension',
    description: 'The system is multi-dimensional, but we also ensure a two-dimensional display of information containing your information and your perspective dimension',
    image: '/note-white.svg',
    color: 'bg-[#F7F8F8]',
    textColor: 'text-[#434141]'
    
  },
  {
    title: 'Extended memory with AI in the loop',
    description: 'information general is static, ai is added to make your memory animated and human-like',
    image: '/note-black.svg',
    color: 'bg-[#434141]',
    textColor: 'text-[#F7F8F8]'
    }],
  [
  {
    title: 'Organize with little effort',
    description: 'Minimize effort in moving things around and ensure note organization is with less to no effort.',
    image: '/note-white.svg',
    color: 'bg-[#434141]',
    textColor: 'text-[#F7F8F8]'
    },]
]

export default function NoteCardList() {
  return (
    <div className='flex flex-col gap-y-12 w-full'>
      {notes.flatMap((note, index) => (
        <div  key={index} className={` grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-12  ${((index+1)%2)==0? "ml-0 lg:ml-10": "ml-0"}`}>
          <NoteCard title={note[0].title} description={note[0].description} image={note[0].image} color={note[0].color} textColor={note[0].textColor} />
          {(note.length === 2) && <NoteCard title={note[1].title} description={note[1].description} image={note[1].image} color={note[1].color} textColor={note[1].textColor} />}
        </div>
        
      ))}
    </div>
  )
}
