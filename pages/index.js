
import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link"
import NoteCardList from '@/components/NoteCardList'
import FeaturedCardList from '@/components/FeaturedCardList'
import Nav from '@/components/NavBar'


const Home = () => {
  // const { data: session, status } = useSession()
  // const loading = status === "loading"

  return (
    <section className=''>
      <Nav />

      {/* Hero */}
      <section className='w-full h-fit border-b-2 border-dashed border-gray-300 pb-8' id='about'>
        <div className='mx-auto w-full  lg:max-w-7xl flex flex-col items-center py-4 font-manrope  pr-0 sm:px-6 md:px-8 '>
          <div className=' font-extrabold text-xl tracking-tight px-2 lg:px-0 lg:text-[3.625rem] lg:leading-[4.952rem] text-center'>Grab <span className='text-[#011687]'>Contents</span> and take <span className='text-[#011687]'>Notes</span> with ease as you go about your day.</div>
          <div className='font-normal text-md tracking-tight text-center  2xl:text-[1.25rem] lg:leading-[3rem] mt-8 px-2 lg:px-0'>Make Note-taking a by-product of your main task without getting distracted from your current main goal.</div>
          <div className='relative mt-8 2xl:w-[60%] 2xl:h-[45vh] w-[80%] aspect-video h-[250px] sm:h-[450px]'>
            <Image src='/heroimage.png'
              layout="fill"
              className="relative  w-full text-[#000000]"
              alt="hero image"
            />
          </div>
          <div className='mt-8 rounded-lg bg-custom1 text-white py-4 px-14 font-semibold lg:text-[1.25rem] text-[1.05rem] lg:leading-[1.708rem] leading-[1.208rem]'>Get started for free!</div>
        </div>
      </section>

      {/* Goals and Objectives */}
      <section className='mx-auto w-full px-4 lg:max-w-7xl mt-8 border-b-2 border-dashed border-gray-300 pb-8 sm:px-6 md:px-8 '>
        <h3 className='text-center font-manrope font-bold text-[2rem] leading-[2.732rem] text-[#2E2F30] mb-10 '>Goals and Objectives</h3>
        <NoteCardList />
        <div className='flex flec-col items-center justify-center'>
          <div className='mt-8 rounded-lg bg-custom1 text-white py-4 px-14 font-semibold lg:text-[1.25rem] text-[1.05rem] lg:leading-[1.708rem] leading-[1.208rem]'>Add to chrome</div>
        </div>

      </section>

      {/* Basic Workflow */}
      <section className='mx-auto w-full sm:pl-0 lg:max-w-7xl mt-8  pb-8 h-fit px-4 sm:px-6 md:px-8 '>
        <h3 className='text-center font-manrope font-bold text-[2rem] leading-[2.732rem] text-[#2E2F30] mb-4 '>Basic Workflow</h3>
        <div className='flex flex-col items-center justify-center font-manrope mt-20'>
          <div className='grid grid-cols-1 lg:grid-cols-2  w-full h-fit'>
            <div className='grid grid-rows-1 lg:grid-rows-3'>
              <h3 className=' row-start-1 row-end-1 font-bold text-lg tracking-tight lg:text-[1.5rem] lg:leading-[2.049rem] text-[#2E2F30]'>1. Activate Archive Editor</h3>
              <div className='row-start-2 row-span-3 lg:block hidden'>
                <div className='relative w-[60%] h-fit  p-0  mx-auto float-right mr-0 '>
                  <Image
                    src='/arrowk1.svg'
                    width={600}
                    height={0}
                    className="float-right"
                    alt="hero image"
                  />
                </div>

              </div>

            </div>
            <div className='grid grid-rows-1 lg:grid-rows-3 h-[300px] sm:h-[400px] lg:h-full mt-8 lg:mt-0'>
              <div className='row-span-2 row-end-3 w-full h-full'>
                <div className=' relative w-full  lg:w-[90%] h-full '>
                  <Image
                    src='/images/archiveeditor.png'
                    layout="fill"
                    className="relative  w-full h-full text-[#000000] rounded-xl "
                    alt="hero image"
                  />
                </div>

              </div>
            </div>

          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2  w-full  h-fit mt-8 lg:mt-0'>
            <div className='grid grid-rows-1 lg:grid-rows-3 lg:order-last'>
              <h3 className=' row-start-1 row-end-1 font-bold text-lg tracking-tight lg:text-[1.5rem] lg:leading-[2.049rem] text-[#2E2F30]'>2. Commit Your Note</h3>
              <div className='row-start-2 row-span-3  lg:block hidden lg:-ml-16'>
                <div className='relative w-[60%] h-fit  p-0  mx-auto float-left '>
                  <Image
                    src='/arrowk1.svg'
                    width={600}
                    height={250}
                    className="float-left scale-x-[-1]"
                    alt="hero image"
                  />
                </div>

              </div>

            </div>
            <div className='grid grid-rows-1 lg:grid-rows-3 h-[300px] sm:h-[400px] lg:h-[600px] 2xl:h-full mt-8 lg:mt-0'>
              <div className='row-span-2 row-end-3 w-full h-full'>
                <div className=' relative w-full lg:w-[90%] h-full border-[1px] rounded-xl'>
                  <Image
                    src='/images/commit3.png'
                    layout="fill"
                    className="relative  w-full h-full text-[#000000] rounded-xl"
                    alt="hero image"
                  />
                </div>

              </div>
            </div>

          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2  w-full  lg:h-[500px] h-full mt-8 lg:mt-0'>
            <div className='grid grid-rows-1 '>
              <h3 className=' row-span-1 font-bold text-lg tracking-tight lg:text-[1.5rem] lg:leading-[2.049rem] text-[#2E2F30]'>3. View Your Note</h3>
            </div>
            <div className='grid grid-rows-1  h-[300px] sm:h-[400px] lg:h-[400px]  2xl:h-full mt-8 lg:mt-0'>
              <div className='row-span-1  w-full h-full'>
                <div className=' relative w-full lg:w-[90%] h-full rounded-xl bg-black'>
                  <Image
                    src='/images/notes.png'
                    layout="fill" // required
                    objectFit="contain" // change to suit your needs
                    className=""
                    alt="hero image"
                  />
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section className='font-manrope mx-auto w-full px-4 sm:px-6 md:px-8  sm:pl-0 lg:max-w-7xl mt-8 border-b-2 border-dashed border-gray-300 pb-8' id="features">
        <h3 className='text-center  font-bold text-[2rem] leading-[2.732rem] text-[#2E2F30] mb-4 '>Features</h3>
        <p className='font-normal text-lg tracking-tight lg:text-[1.25rem] lg:leading-[3rem] text-center mt-8'>Some features that are supported by Archive Creator</p>
        <div className='mt-8 lg:mt-16'>
          <FeaturedCardList />
        </div>
      </section>

      {/* Pricing */}
      <section className='font-manrope mx-auto w-full px-4 sm:px-6 md:px-8  sm:pl-0 lg:max-w-7xl mt-8 border-b-2 border-dashed border-gray-300 pb-8' id='pricing'>
        <h3 className='text-center  font-bold text-[2rem] leading-[2.732rem] text-[#2E2F30] mb-4 '>Subscription Base </h3>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-x-8 mt-8'>
          <div className=' rounded-2xl flex flex-col px-4 lg:pl-8 py-10 border-2 h-[50vh] lg:h-full'>
            <div className='flex items-center'>
              <div className='font-bold text-[1.75rem] leading-[2.391rem] text-[#2E2F30] text-center 2xl:ml-8 ml-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2 inline-block">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
                Starter
              </div>
            </div>
            <div className='flex items-center mt-8 tracking-tight'>
              <div className='self-start'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline-block ">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div className='shrink grow font-normal text-sm tracking-tight lg:text-md ml-4 text-[#353A3F]'>
                Note history from 1 year
              </div>
            </div>
            <div className='flex items-center mt-2 tracking-tight'>
              <div className='self-start'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline-block ">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>

              <div className='shrink grow font-normal text-sm tracking-tight lg:text-md ml-4 text-[#353A3F]'>
                Grab note from websites and make it easily accessible for every other member to see anytime they visit same site
              </div>
            </div>

          </div>
          <div className=' rounded-2xl flex flex-col px-4 lg:pl-8 py-10 border-2 h-[50vh] lg:h-full mt-8 lg:mt-0'>
            <div className='flex items-center w-full border-2'>
              <div className='font-bold text-[1.75rem] leading-[2.391rem] text-black 2xl:ml-8 ml-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2 inline-block">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>

                Advanced
              </div>
            </div>
            <div className='flex items-center mt-8'>
              <div className='self-start'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline-block ">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div className='shrink grow font-semibold text-md tracking-tight 2xl:text-[1.125rem] 2xl:leading-[2.25rem] text-[#353A3F] t ml-4'>
                Note history from 2 months
              </div>
            </div>
            <div className='flex items-center mt-8'>
              <div className='self-start'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline-block ">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div className='shrink grow font-semibold text-md tracking-tight 2xl:text-[1.125rem] 2xl:leading-[2.25rem] text-[#353A3F] t ml-4'>
                Able to edit (update and delete) note
              </div>
            </div>
            <div className='flex items-center mt-8'>
              <div className='self-start'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline-block ">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div className=' shrink grow font-semibold text-md tracking-tight 2xl:text-[1.125rem] 2xl:leading-[2.25rem] text-[#353A3F] t ml-4'>
                Customize templates
              </div>
            </div>
            <div className='flex items-center mt-8'>
              <div className='self-start'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline-block ">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div className='shrink grow font-semibold text-md tracking-tight 2xl:text-[1.125rem] 2xl:leading-[2.25rem] text-[#353A3F] t ml-4'>
                Grab more than pictures: videos and audio
              </div>
            </div>

          </div>
          <div className=' rounded-2xl flex flex-col px-4 lg:pl-8 py-10 border-2 h-fit mt-8 lg:mt-0'>
            <div className='flex items-center'>
              <div className='flex justify-center items-center w-12 h-12 rounded-full bg-gray-100'>
                B
              </div>
              <div className='font-bold text-[1.75rem] leading-[2.391rem] text-[#2E2F30] text-center 2xl:ml-8 ml-4'>
                Premium
              </div>
            </div>
            <div className='flex items-center mt-8'>
              <div className='self-start'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline-block ">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div className='shrink grow font-semibold text-md tracking-tight 2xl:text-[1.125rem] 2xl:leading-[2.25rem] text-[#353A3F] t ml-4'>
                Unlimited Note history
              </div>
            </div>
            <div className='flex items-center mt-8'>
              <div className='self-start'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline-block ">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div className='shrink grow font-semibold text-md tracking-tight 2xl:text-[1.125rem] 2xl:leading-[2.25rem] text-[#353A3F] t ml-4'>
                Use of AI to summarize each note
              </div>
            </div>
            <div className='flex items-center mt-8'>
              <div className='self-start'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline-block ">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div className='shrink grow font-semibold text-md tracking-tight 2xl:text-[1.125rem] 2xl:leading-[2.25rem] text-[#353A3F] t ml-4'>
                Provide annotation for web base grabbed document
              </div>
            </div>
            <div className='flex items-center mt-8'>
              <div className='self-start'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline-block ">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div className='shrink grow font-semibold text-md tracking-tight 2xl:text-[1.125rem] 2xl:leading-[2.25rem] text-[#353A3F] t ml-4'>
                Create plugin to interface with GPT-X to make it create prediction using your 2nd brain has context
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className='bg-[#434141]'>
        <div className='flex flex-col lg:justify-center pl-8 lg:pl-0 lg:flex-row mx-auto w-full  lg:max-w-7xl font-manrope pt-12 pb-8 gap-x-20'>
          <div className='flex flex-col'>
            <h3 className='font-semibold text-xl tracking-tight lg:text-[29.97px] lg:leading-[40.93px] text-[#F7F8F8]'>Quick Links</h3>
            <Link href={"#"} className="font-normal text-[#F7F8F8] text-lg tracking-tight lg:text-[26.97px] lg:leading-[36.84px] mt-6">About</Link>
            <Link href={"#"} className="font-normal text-[#F7F8F8] text-lg tracking-tight lg:text-[26.97px] lg:leading-[36.84px] mt-4">Contact</Link>
            <Link href={"#"} className="font-normal text-[#F7F8F8] text-lg tracking-tight lg:text-[26.97px] lg:leading-[36.84px] mt-4">Features</Link>
          </div>
          <div className='flex flex-col  mt-10 lg:mt-0'>
            <h3 className='font-semibold text-xl tracking-tight lg:text-[29.97px] lg:leading-[40.93px] text-[#F7F8F8] '>Keep up with us </h3>
            <p className='mt-6 text-[#FCFCFC] font-normal'>
              We know you&apos;ll love to find out more! Subscribe to our newsletter
            </p>
          </div>
        </div>
      </section>

    </section>
  )
}

export default Home