import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
    <nav>
      <div className='flex justify-between align-middle bg-sky-300 p-5'>
        
        <div>
          <Link to='/'>logo</Link>
        </div>

        <div className={` sm:block ${open ? "block" : "hidden"}`}>
          <ul className="flex flex-col gap-4 pt-8 sm:pt-0 sm:flex-row sm:gap-6">
            <li><Link onClick={() => setOpen(false)} to='/Login'>Login</Link></li>
            <li><Link onClick={() => setOpen(false)} to='/Signup'>Signup</Link></li>
            <li><Link onClick={() => setOpen(false)} to='/no'>no</Link></li>
          </ul>
        </div>

        <div className='block sm:hidden'>
            <button onClick={() => setOpen(!open)}
              className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
              type="button">
              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </span>
            </button>
        </div>

      </div>
    </nav>
    </>
  )
}
