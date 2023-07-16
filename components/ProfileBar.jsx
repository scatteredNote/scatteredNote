import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signOut } from "next-auth/react"


export default function ProfileBar({ user, dark }) {
  return (
    <div className=" w-fit ml-auto">
      <Popover className="relative">
        {({ open }) => (
          /* Use the `open` state to conditionally change the direction of the chevron icon. */
          <>
            <Popover.Button className="flex border-none outline-none">
              {user.image ? (
                <div>
                  <Image src={user.image} alt="user" width={100} height={100} className="w-10 h-10 rounded-full" />
                </div>
              ) : (
                <div className="flex items-center justify-center w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-gray-500">
                  <span className="text-xl font-bold text-white uppercase">{user.name[0]}</span>
                </div>
              )}

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={`w-4 h-4 self-center ${dark ? "text-white" : "text-black"}`}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>


            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 mt-2 flex w-screen max-w-max -translate-x-3">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 pr-4 pl-2 py-2  bg-white">
                  <div className="relative grid gap-4 bg-white w-fit whitespace-nowrap text-sm leading-tight">
                    <Link href={`/${user.username}/notes`} className=' cursor-pointer'>Notes</Link>
                    <Link href={`/${user.username}/editor`} className=' cursor-pointer'>Editor</Link>
                    <a
                      href={`/api/auth/signout`}
                      onClick={(e) => {
                        e.preventDefault()
                        signOut()
                      }}
                    >
                      Log out
                    </a>
                  </div>
                </div>

              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
