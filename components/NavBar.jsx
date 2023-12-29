import NavbarMobile from '@/components/NavbarMobile'
import ProfileBar from '@/components/ProfileBar'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"


export default function Nav({ dark }) {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <section className=' w-full'>
      <div className='mx-auto max-w-full sm:max-w-screen-md lg:max-w-[90%] flex items-center py-4 font-manrope  pr-0'>
        <NavbarMobile dark={dark} />
        <div className='flex text-center text-white font-manrope font-medium'>
          <div className='relative bg-black w-8 h-8 md:w-12 md:h-12 rounded-lg '>
            <Link href="/" >
              <Image
                src='/images/logo.png'
                fill // required
                // change to suit your needs
                className=" w-8 h-8"
                alt="logo image"
              />
            </Link>
          </div>
          <span className={` ml-1 text-xl font-bold self-center tracking-tight ${dark ? "text-white" : "text-custom1"}`}>scatteredNote</span>
        </div>

        <div className={`hidden relative  shrink w-[60%] grow lg:block lg:flex justify-center gap-x-8 font-medium text-[1.125rem] leading-[1.537rem] ${dark ? "text-white" : "text-custom1"}  `}>
          <Link href={"/"} scroll={false}>Home</Link>
          <Link href="/#about" smooth>About</Link>
          <Link href="/#features" smooth >Features</Link>
          <div className='flex lg:mt-0 text-white ml-2 gap-x-2'>
            <a href='https://github.com/scatteredNote/scatteredNote' target='_blank' rel="noopener noreferrer">
              <svg viewBox="0 0 16 16" className='text-white w-6 h-6 bg-white'>
                <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" />
              </svg>
            </a>
          </div>
        </div>
        {session && <ProfileBar user={session.user} dark={dark} />}
        {!session && (
          <div className=' bg-custom1 text-center px-4 py-2 mr-2 tracking-tighter text-sm lg:px-8 lg:py-4 text-white font-manrope lg:font-medium rounded-xl ml-auto'>
            {!session && (
              <a
                href={`/api/auth/signin`}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Login
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  )
}