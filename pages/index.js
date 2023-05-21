
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"

const Home =  () => {
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
      <section className=' w-full'>
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
      <section className='w-full h-fit border-b-4 border-dashed border-gray-300 pb-8'>
        <div className='mx-auto max-w-[75%] flex flex-col items-center py-4 font-manrope  pr-0 '>
          <div className=' font-extrabold text-[3.625rem] leading-[4.952rem] text-center'>Grab <span className='text-[#011687]'>contents</span> and <span className='text-[#011687]'>ideas</span> with ease as you go about your day.</div>
          <div className='font-normal text-[1.20rem] 2xl:text-[1.25rem] leading-[3rem] mt-8'>Make Note-taking a by-product of your main task without getting distracted from your current main goal.</div>
          <div className='relative mt-8 2xl:w-[60%] 2xl:h-[45vh] w-[80%] h-[400px]'>
            <Image src='/heroimage.png'
              layout="fill"
              className="relative  w-full text-[#000000]"
              alt= "hero image"
            />
          </div>
          <div className='mt-8 rounded-lg bg-custom1 text-white py-4 px-14 font-semibold text-[1.25rem] leading-[1.708rem]'>Get started for free!</div>
        </div>
      </section>

    </section>
  )
}

export default Home