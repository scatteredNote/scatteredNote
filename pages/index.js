import Image from 'next/image'
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
        <p className='font-normal text-lg tracking-tight lg:text-[1.25rem] lg:leading-[3rem] text-center mt-8'>Some features that are supported</p>
        <div className='mt-8 lg:mt-16'>
          <FeaturedCardList />
        </div>
      </section>

      {/* Pricing */}
      <section className='font-manrope mx-auto w-full px-4 sm:px-6 md:px-8  sm:pl-0 lg:max-w-7xl mt-8 border-b-2 border-dashed border-gray-300 pb-8' id='pricing'>
        <h3 className='text-center  font-bold text-[2rem] leading-[2.732rem] text-[#2E2F30] mb-4 '>Subscription Base </h3>
        <p className=' tracking-normal text-center'>
          We are currently in beta, so we are free for now. But we will be subscription base in the future. We will have a free tier and a paid tier.
        </p>
      </section>

      {/* Footer */}
      <section className='bg-[#434141]'>
        <div className='flex  lg:justify-center pl-8 lg:pl-0  mx-auto w-full  lg:max-w-7xl font-manrope pt-12 pb-4 text-white'>
          <h3>Follow us on:</h3>
          <div className='flex lg:mt-0 text-white ml-2 gap-x-2'>
            <a href='https://github.com/scatteredNote/scatteredNote' target='_blank' rel="noopener noreferrer">
              <svg viewBox="0 0 16 16" className='text-white w-6 h-6 bg-white'>
                <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" />
              </svg>
            </a>
            <a href='https://twitter.com/scatterednote' target='_blank' rel="noopener noreferrer">
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-white w-6 h-6 bg-white'>
                <path d="M17.3334 1.83332C16.707 2.10507 16.0445 2.28471 15.3667 2.36666C16.0818 1.93943 16.6177 1.26731 16.875 0.474992C16.203 0.875044 15.4673 1.15691 14.7 1.30832C14.1871 0.752135 13.5042 0.381905 12.7582 0.255701C12.0122 0.129497 11.2455 0.254457 10.5782 0.610983C9.91089 0.967509 9.3808 1.53543 9.07105 2.22569C8.76131 2.91594 8.68943 3.68948 8.86669 4.42499C7.50788 4.35626 6.17872 4.00245 4.96557 3.38654C3.75241 2.77063 2.68239 1.9064 1.82502 0.849991C1.5243 1.37513 1.36629 1.96984 1.36669 2.57499C1.36562 3.13698 1.50353 3.69051 1.76815 4.1863C2.03276 4.68208 2.41587 5.10475 2.88335 5.41666C2.34 5.40187 1.80826 5.25607 1.33335 4.99166V5.03332C1.33743 5.82073 1.61335 6.58257 2.11445 7.18996C2.61555 7.79736 3.31107 8.21303 4.08335 8.36666C3.78607 8.45713 3.47742 8.50483 3.16669 8.50833C2.9516 8.50581 2.73704 8.48631 2.52502 8.44999C2.74495 9.12733 3.17054 9.71928 3.74258 10.1435C4.31463 10.5676 5.00467 10.803 5.71669 10.8167C4.51436 11.7627 3.02992 12.279 1.50002 12.2833C1.22147 12.2842 0.943133 12.2675 0.666687 12.2333C2.22871 13.2419 4.04903 13.7773 5.90835 13.775C7.19143 13.7883 8.4643 13.5458 9.65262 13.0617C10.8409 12.5776 11.9209 11.8616 12.8294 10.9554C13.7378 10.0492 14.4567 8.97115 14.9438 7.78408C15.431 6.59701 15.6767 5.32476 15.6667 4.04166C15.6667 3.89999 15.6667 3.74999 15.6667 3.59999C16.3206 3.11233 16.8846 2.51451 17.3334 1.83332V1.83332Z" fill="#556987" />
              </svg>
            </a>
          </div>
        </div>
      </section>

    </section>
  )
}

export default Home