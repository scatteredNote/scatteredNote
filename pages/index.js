
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import NoteCardList from '@/components/NoteCardList'


const Home = () => {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  // return (
  //   <header>
  //     <noscript>
  //       <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
  //     </noscript>
  //     {/* <div className={styles.signedInStatus}>
  //       <p
  //         className={`nojs-show ${
  //           !session && loading ? styles.loading : styles.loaded
  //         }`}
  //       >
  //         {!session && (
  //           <>
  //             <span className={styles.notSignedInText}>
  //               You are not signed in
  //             </span>
  //             <a
  //               href={`/api/auth/signin`}
  //               className={styles.buttonPrimary}
  //               onClick={(e) => {
  //                 e.preventDefault()
  //                 signIn()
  //               }}
  //             >
  //               Sign in
  //             </a>
  //           </>
  //         )}
  //         {session?.user && (
  //           <>
  //             {session.user.image && (
  //               <span
  //                 style={{ backgroundImage: `url('${session.user.image}')` }}
  //                 className={styles.avatar}
  //               />
  //             )}
  //             <span className={styles.signedInText}>
  //               <small>Signed in as</small>
  //               <br />
  //               <strong>{session.user.email ?? session.user.name}</strong>
  //             </span>
  //             <a
  //               href={`/api/auth/signout`}
  //               className={styles.button}
  //               onClick={(e) => {
  //                 e.preventDefault()
  //                 signOut()
  //               }}
  //             >
  //               Sign out
  //             </a>
  //           </>
  //         )}
  //       </p>
  //     </div> */}

  //     <section >
  //       <div className='mx-auto '>

  //       </div>
  //     </section>

  //   </header>
  // )

  return (
    <section className=''>
      {/* Navbar */}
      <section className=' w-full lg:block hidden'>
        <div className='mx-auto max-w-[90%] flex items-center py-4 font-manrope  pr-0'>
          <div className=' bg-custom1 text-center px-8 py-4 text-white font-manrope font-medium'>Logo</div>
          <div className=' shrink w-[60%] grow flex justify-center gap-x-8 font-medium text-[1.125rem] leading-[1.537rem] text-custom1 '>
            <Link href={"#"}>Home</Link>
            <Link href="#">About</Link>
            <Link href="#">Contact</Link>
            <Link href="#">Subscribe</Link>
            <Link href="#">Features</Link>
          </div>
          <div className=' bg-custom1 text-center px-8 py-4 text-white font-manrope font-medium rounded-xl mx-auto float-right'>Login</div>
        </div>
      </section>

      {/* Hero */}
      <section className='w-full h-fit border-b-2 border-dashed border-gray-300 pb-8'>
        <div className='mx-auto max-w-[75%] flex flex-col items-center py-4 font-manrope  pr-0 '>
          <div className=' font-extrabold text-[2.625rem] lg:text-[3.625rem] lg:leading-[4.952rem] text-center'>Grab <span className='text-[#011687]'>contents</span> and <span className='text-[#011687]'>ideas</span> with ease as you go about your day.</div>
          <div className='font-normal text-sm 2xl:text-[1.25rem] lg:leading-[3rem] mt-8'>Make Note-taking a by-product of your main task without getting distracted from your current main goal.</div>
          <div className='relative mt-8 2xl:w-[60%] 2xl:h-[45vh] w-[80%] h-[400px]'>
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
      <section className='mx-auto w-full  px-4 lg:px-0 lg:max-w-[80%] mt-8 border-b-2 border-dashed border-gray-300 pb-8'>
        <h3 className='text-center font-manrope font-bold text-[2rem] leading-[2.732rem] text-[#2E2F30] mb-4 '>Goals and Objectives</h3>
        <NoteCardList />
        <div className='flex flec-col items-center justify-center'>
          <div className='mt-8 rounded-lg bg-custom1 text-white py-4 px-14 font-semibold lg:text-[1.25rem] text-[1.05rem] lg:leading-[1.708rem] leading-[1.208rem]'>Add to chrome</div>
        </div>

      </section>

      {/* Basic Workflow */}
      <section className='mx-auto w-full sm:pl-0 lg:max-w-[80%] mt-8  pb-8 h-fit px-4 lg:px-0'>
        <h3 className='text-center font-manrope font-bold text-[2rem] leading-[2.732rem] text-[#2E2F30] mb-4 '>Basic Workflow</h3>
        <div className='flex flex-col items-center justify-center font-manrope mt-20'>
          <div className='grid grid-cols-1 lg:grid-cols-2  w-full h-fit'>
            <div className='grid grid-rows-1 lg:grid-rows-3'>
              <h3 className=' row-start-1 row-end-1 font-bold text-[1.5rem] leading-[2.049rem] text-[#2E2F30]'>1. Activate Archive Editor</h3>
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
            <div className='grid grid-rows-1 lg:grid-rows-3 h-[300px] lg:h-full mt-8 lg:mt-0'>
              <div className='row-span-2 row-end-3 w-full h-full'>
                <div className=' relative w-full lg:w-[90%] h-full '>
                  <Image
                    src='/imgwork.JPG'
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
              <h3 className=' row-start-1 row-end-1 font-bold text-[1.5rem] leading-[2.049rem] text-[#2E2F30]'>2. Commit Your Note</h3>
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
            <div className='grid grid-rows-1 lg:grid-rows-3 h-[300px] lg:h-full mt-8 lg:mt-0'>
              <div className='row-span-2 row-end-3 w-full h-full'>
                <div className=' relative w-full lg:w-[90%] h-full '>
                  <Image
                    src='/imgwork.JPG'
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
              <h3 className=' row-span-1 font-bold text-[1.5rem] leading-[2.049rem] text-[#2E2F30]'>3. View Your Note</h3>
            </div>
            <div className='grid grid-rows-1  h-[300px] lg:h-full mt-8 lg:mt-0'>
              <div className='row-span-1  w-full h-full'>
                <div className=' relative w-full lg:w-[90%] h-full '>
                  <Image
                    src='/imgwork.JPG'
                    layout="fill"
                    className="relative  w-full h-full text-[#000000] rounded-xl"
                    alt="hero image"
                  />
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section className='mx-auto w-full pl-10 sm:pl-0 lg:max-w-[80%] mt-8 border-b-2 border-dashed border-gray-300 pb-8'>
        <h3 className='text-center font-manrope font-bold text-[2rem] leading-[2.732rem] text-[#2E2F30] mb-4 '>Features</h3>
      </section>

    </section>
  )
}

export default Home