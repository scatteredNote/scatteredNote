/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Nav from '@/components/NavBar'

export default function chrome() {
  return (
    <>
      <Nav />
      <div className=' mx-auto w-full lg:w-[40%] px-2 lg:px-0 mt-8 tracking-normal font-normal font-serif'>
        <h1 className='text-3xl font-bold mb-2'>Chrome Extension</h1>
        <article>
          Could not publish the extension to chrome market app because my country is not in the list of countries for billing re I will describe how to install the extension manually.

          <li>Download the extension from <a href="https://github.com/scatteredNote/scatterednotechrome/raw/main/build.zip" className='text-blue-500'>here</a> and then unzip</li>
          <li>visit <q>chrome://extension</q> in your chrome browser</li>
          <li className="list-disc">Enable developer mode</li>
          <img src='./developer.png' alt='developer mode' />
          <li>Click on load unpacked</li>
          <img src='./loadpacked.png' alt='developer mode' />
          <li>Locate the downloaded extension and click on select folder. if successfully loaded you should see this:</li>

          <img src='./extension.png' alt='developer mode' />
          <li>That&apos;s all</li>
        </article>
      </div>
    </>
  )
}
