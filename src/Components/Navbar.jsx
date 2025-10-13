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
                  <div className="absolute mt-2 w-64 bg-white rounded-3xl shadow-xl p-6 space-y-4 border border-gray-100 z-50 left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0">
                    <div className="flex justify-between items-center border-b pb-3">
                      <h3 className="font-bold text-gray-700">My Account</h3>
                      <button type="button" onClick={() => setDivProfile(false)} className="hover:scale-110 transition-transform duration-200 text-gray-700 hover:bg-gray-700 rounded-full p-0.5 cursor-pointer">✖</button>
                    </div>
                    <button type="button" onClick={handleProfileClick} className="block w-fit cursor-pointer text-left text-gray-700 hover:text-green-600 font-medium">👤 Profile</button>
                    <button type="button" onClick={handleLogout} className="block w-fit cursor-pointer text-left text-gray-700 hover:text-red-600 font-medium">🚪 Logout</button>
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

