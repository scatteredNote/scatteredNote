import React from 'react'
import NoteCard from './NoteCard'

const notes = [
  [{
    title: 'By-Product',
    description: 'Note-taking while doing research or reading or investigation should be a by-product of the main task. switching mode should be controlled to prevent distraction from the main task. Hence note-taking should be seamless and less distractive.',
    image: '/note-white.svg',
    color: 'bg-[#F7F8F8]',
    textColor: 'text-[#434141]'
  },
  {
    title: 'In Peace With Forgetting',
    description: 'Easy to spin up to grab content and take notes to reduce procrastination. Hence every worth knowledge is archive and jotted down to be in peace with forgetting',
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
    description: 'Embrace mental model of capturing information atomically and backing it up with your insight.',
    image: '/note-white.svg',
    color: 'bg-[#F7F8F8]',
    textColor: 'text-[#434141]'
  },
  ],
  [{
    title: 'A Stone Throw Away',
    description: 'keep track of note per website and youtube videos re your note is always with a stone throw away.',
    image: '/note-white.svg',
    color: 'bg-[#F7F8F8]',
    textColor: 'text-[#434141]'

  },
  {
    title: 'Extended memory with AI in the loop',
    description: 'Query, chat and create flash card with your archived knowledge for quick insight',
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
        <div key={index} className={` grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-12  ${((index + 1) % 2) == 0 ? "ml-0 lg:ml-10" : "ml-0"}`}>
          <NoteCard title={note[0].title} description={note[0].description} image={note[0].image} color={note[0].color} textColor={note[0].textColor} />
          {(note.length === 2) && <NoteCard title={note[1].title} description={note[1].description} image={note[1].image} color={note[1].color} textColor={note[1].textColor} />}
        </div>

      ))}
    </div>
  )
}
