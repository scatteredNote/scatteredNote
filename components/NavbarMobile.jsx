import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Link from 'next/link'


export default function NavbarMobile({ dark }) {
  return (
    <div className=" w-fit  lg:hidden">
      <Popover className="relative">
        {({ open }) => (
          /* Use the `open` state to conditionally change the direction of the chevron icon. */
          <>
            <Popover.Button className="outline-none border-none">
              {open ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={`w-6 h-6 ${dark ? "text-white" : "text-black"}`}>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class={`w-6 h-6 ${dark ? "text-white" : "text-black"}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>}

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
              <Popover.Panel className="absolute">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 pr-4 pl-2 py-2 bg-white">
                  <div className="relative grid gap-4 bg-white text-sm leading-tight">
                    <Link href={"#"}>Home</Link>
                    <Link href="#">About</Link>
                    <Link href="#features">Features</Link>
                    <Link href="#">Contact</Link>
                    <Link href="#">Subscribe</Link>
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
