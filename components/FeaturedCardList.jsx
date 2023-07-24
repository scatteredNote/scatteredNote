import React from 'react'
import FeaturesCards from './FeaturesCards'

const features = [
  {
    title: 'YouTube Capture',
    description: 'Capture your perspective at a time-stamp, store it, and share it with people or make it private',
    image: '/note-white.svg',
    reversed: false
  },
  {
    title: 'VS-Code Capture',
    description: 'capture perspective per functions, methods, or per lines of code.',
    image: '/note-white.svg',
    reversed: true
  },
  {
    title: 'Web-mode Capture',
    description: 'Capture perspective per paragraph or per line or words or per image. Preview stored information anytime you come back to thatsame page. You can either make this information available for other users to view whenever they come to that same page or make it private for your eye alone.',
    image: '/note-white.svg',
    reversed: false
  },
  {
    title: 'Pdf-mode capture',
    description: 'capture perspective per lines, paragraph, or words, or per images',
    image: '/note-white.svg',
    reversed: true
  },
  {
    title: 'Ai chat',
    description: 'Your extended memory can be bundled as a plugin to chatgtp for easy query and communication, to provide the same experience of accessing information from your memory',
    image: '/note-white.svg',
    reversed: false
  },
  {
    title: 'Ai-space repetition',
    description: 'Don`t forget what you have learnt. Ai-space repetition will help you remember what you have learnt by crafting question, flashcard and reminding you of what you have learnt at the right time.',
    image: '/note-white.svg',
    reversed: true
  },
  // {
  //   title: 'History revision',
  //   description: 'Review the history of your grabs or note. in the premium package, perspective can be edited and you can see how your perspective changes over time',
  //   image: '/note-white.svg',
  //   reversed: false
  // },
  // {
  //   title: 'Notes display customization',
  //   description: 'Decide how you want your information to be displayed, what colors, fonts suite you.',
  //   image: '/note-white.svg',
  //   reversed: true
  // },



]

export default function FeaturedCardList() {
  return (
    <>
      <div className=' '>
        {features.map((feature, index) => (
          <FeaturesCards key={index} title={feature.title} description={feature.description} image={feature.image} reversed={feature.reversed} />
        ))}
      </div>

    </>
  )
}
