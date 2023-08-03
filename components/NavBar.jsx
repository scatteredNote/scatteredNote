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