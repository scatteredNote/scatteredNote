import React from 'react'
import Nav from '@/components/NavBar'

export default function contribute() {
  return (
    <>
      <Nav />
      <div className=' mx-auto w-full lg:w-[40%] px-2 lg:px-0 mt-8 tracking-normal font-normal font-serif'>
        <h1 className='text-3xl font-bold mb-2'>IDEA SCOPE</h1>
        <article>
          This project originate from the need of a note taking app to spin up easily,  and less distraction. Sometime i don&apos;t want to embed
          myself in my note taking medium, i just want to take note and go back to my main task at that moment, be it watching youtube video, or reading
          an article online.
          The idea is to have something with a minimal interface and less distraction and also have every attribute of a note taking app: from organizing note,
          to searching note, sharing note, referencing note inside another note, to chating with your note intelligently.
        </article>
        <h1 className='text-3xl font-bold mb-2 mt-4'>CONTRIBUTE</h1>
        <article>
          This project is a bit far from being ready. The current work as at this moment can be said to be at version 0.4. There is still a lot of work to be done.


          <li>We don&apos;t currently use a proper DB, we need to change that</li>
          <li>Ai integration. to enable chatting with your note and create a space repetition system</li>
          <li>Add more custom utlity to the editor. such as latex,Mermaid, image upload and note referencing</li>
          <li>Improve the UI</li>
          <li>Tidy up the codebase</li>
          <li>Create a proper business model</li>
          <br />
          On the last point <bold><i>Create a proper business model</i></bold>; To make contributors devote more time to bringing out the best
          from the project, there need to be some kind of monetary gain. Also we are using Open-source tools, and one aim of this project success is to be a sponsor to some
          of this tools.
          <br />
          This currently a team of one. If you are interested in contributing to this project, you can reach me at thescatterednotes at gmail dot com or dm me on twitter

        </article>
      </div>
    </>
  )
}
