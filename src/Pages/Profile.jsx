import axios from 'axios';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import LoaderSpinner from '../Components/LoaderSpinner';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { TokenContext } from '../Context/TokenContext';

export default function Profile() {
  const [userData, setUserData] = useState('');
  const [loading, setLoading] = useState(false);

  const [openDivDelete, setOpenDivDelete] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { setToken } = useContext(TokenContext);
  
    // get profile
  async function getPro() {
    setLoading(true);
    try {
      const res = await axios.get('https://edu-master-psi.vercel.app/user/', {
        headers: {
          token: token 
        }
      });
      setUserData(res.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  }

 //  Delete Account
  async function deleteAccount() {
    setLoading(true);
    try {
      const res = await axios.delete('https://edu-master-psi.vercel.app/user/', {
        headers: { token: token }
      });
      toast.success(res.data.message);
      setOpenDivDelete(false);
      localStorage.removeItem('token');
      setToken(null);
      setLoading(false);
      navigate('/Login');
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  }
  
  useEffect(() => {
      getPro();
    }, []);

    if (loading) return  <LoaderSpinner/>
    
  return (<>
    <div className='bg-gray-100 md:p-4 p-2'>
        <h2 className='text-center text-2xl text-green-600 font-bold'>Profile</h2>
        <div className='p-6 sm:w-1/2 mx-auto bg-white shadow-lg rounded-xl border border-gray-200'>
            <h3 className="text-lg font-bold text-sky-700 border-b pb-2">information</h3>
            <div className='py-2  space-y-2'>
                <p><span className="font-semibold">Name :</span> {userData.fullName}</p>
                <p><span className="font-semibold">Email :</span> {userData.email}</p>
                <p><span className="font-semibold">Phone Number :</span> {userData.phoneNumber}</p>
                <p><span className="font-semibold">Class Level :</span> {userData.classLevel}</p>
                <p><span className="font-semibold">ID :</span> <span className="text-gray-500 text-sm">{userData._id}</span></p>
            </div>
            <div className=" border-t pt-2">
                <p><span>Created At : </span>{userData.createdAt?.replace("T"," ").replace("Z", " ").slice(0, 19)}</p>
                <p><span>Updated At : </span>{userData.updatedAt?.replace("T"," ").replace("Z", " ").slice(0, 19)}</p>
            </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 sm:w-1/2 mx-auto border border-gray-200 mt-2 sm:mt-4 space-y-4">
            <h3 className="text-lg font-bold text-sky-700 border-b pb-2">Account Settings</h3>
            {/* Update Profile */}
            <button className="cursor-pointer w-full py-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg transition">Update Profile</button>
            {/* Change Password */}
            <button className="cursor-pointer w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition">Change Password</button>
            {/* Delete Account */}
            <button onClick={() => setOpenDivDelete(!openDivDelete)} className="cursor-pointer w-full py-2 bg-red-500 hover:bg-red-700 text-white font-semibold rounded-lg transition">Delete Account</button>
            <div className={`transition ${openDivDelete ? "block" : "hidden"}`}>
                <div onClick={() => setOpenDivDelete(false)} className='z-40 fixed inset-0 w-full h-screen bg-black/80 flex justify-center items-center'>
                    
                    <div onClick={(e) => e.stopPropagation()} className='text-center space-y-3 sm:p-4 p-2 py-4 bg-white rounded-lg'>
                        <h3 className='text-red-500 font-bold w-70'>Are you sure you want to permanently delete your account ?</h3>
                        <div className="flex justify-center gap-3">
                            <button onClick={() => setOpenDivDelete(false)}className="cursor-pointer px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold rounded-lg transition">Cancel</button>
                            <button onClick={deleteAccount} className="z-50 opacity-100 cursor-pointer w-fit px-4 p-2 bg-red-500 hover:bg-red-700 text-white font-semibold rounded-lg transition">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  
  </>
  )
}
