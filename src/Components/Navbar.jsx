import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TokenContext } from '../Context/TokenContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [divProfile, setDivProfile] = useState(false);

  const { token, setToken } = useContext(TokenContext);
  const navigate = useNavigate()
  
  // logout function
  function handleLogout() {
    setOpen(false);
    localStorage.removeItem('token');
    setToken(null);
    navigate('/Login');
    setDivProfile(false);
  }

  function handleProfileClick() {
    navigate('/Profile');
    setDivProfile(false);
    setOpen(false);
  }

  return (
    <>
    <nav>
      <div className='flex justify-between items-start sm:items-center  bg-sky-300 p-5'>
        
        <div>
          <Link to='/'>logo</Link>
        </div>

        <div className={` sm:block ${open ? "block" : "hidden"}`}>
          <ul className="flex flex-col gap-4 pt-8 sm:pt-0 sm:flex-row sm:gap-6">
            {token ?<>
              <li className='flex justify-center items-center'><Link onClick={() => setOpen(false)} to='/'>Home</Link></li>
              <li className='flex justify-center items-center'><Link onClick={() => setOpen(false)} to='/Courses'>Courses</Link></li>
              <div className="relative m-auto">
                <button onClick={() => setDivProfile(!divProfile)} className="cursor-pointer w-10 h-10 rounded-full bg-white flex items-center justify-center hover:ring-2 hover:ring-sky-500 transition" title="Profile">🙅‍♂️</button>
              {divProfile && (
                <>
                  <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setDivProfile(false)}></div>
                  <div className="absolute mt-2 w-60 bg-white border border-sky-200 rounded-lg shadow-lg p-3 space-y-2 z-50 left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 ">
                    <button onClick={() => setDivProfile(false)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold cursor-pointer">Close</button>
                    <button onClick={handleProfileClick} className="text-green-500 hover:text-green-700 font-bold cursor-pointer">Profile</button>
                    <p className="font-semibold text-gray-800">Username</p>
                    <p className="text-sm text-gray-500">Email: example@mail.com</p>
                    <button onClick={handleLogout} className="text-red-500 hover:text-red-700 font-semibold cursor-pointer">Logout</button>
                  </div>
                </>
              )}
              </div>
            </>
            :<>
              <li><Link onClick={() => setOpen(false)} to='/Login'>Login</Link></li>
              <li><Link onClick={() => setOpen(false)} to='/Signup'>Signup</Link></li>
             </>}

          </ul>
        </div>

        <div className='block sm:hidden'>
            <button onClick={() => (setOpen(!open), setDivProfile(false))}
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

