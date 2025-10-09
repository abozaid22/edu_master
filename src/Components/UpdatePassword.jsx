import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function UpdatePassword() {
    const [showOldPassword, setShowOldPassword] = useState(true);
    const [showNewPassword, setShowNewPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);
    
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token')
    const nave = useNavigate()
    
    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string()
            .matches(/^[A-Z][a-z0-9A-Z!@#$%^&*()-_]{6,10}$/, "Password must start with a capital letter, 6-10 chars")
            .required("Password is Required"),
        newPassword: Yup.string()
            .matches(/^[A-Z][a-z0-9A-Z!@#$%^&*()-_]{6,10}$/, "Password must start with a capital letter, 6-10 chars")
            .required("Password is Required"),
        cpassword:Yup.string()
            .oneOf([Yup.ref("newPassword")], "The password does not match")
            .required("Confirm Password is Required"),
    })

     async function newPass(values) {
        setLoading(true)
        try{
          const res = await axios.patch(`https://edu-master-psi.vercel.app/user/update-password`,values,{
            headers:{token:token}
          });
          setLoading(false)
          toast.success(res.data.message || "Password updated successfully!");
          setMessage(res.data.message)
          nave('/')
        } catch (err) { 
          setLoading(false)
          setMessage(err.response?.data?.message)
        }
      }

      const formik =  useFormik({
        initialValues:{
            oldPassword:'',
            newPassword:"",
            cpassword:""
        },
        validationSchema,
        onSubmit:newPass
    });
    
    return ( <>
        <div className={`w-[300px] sm:p-4 p-2 py-4 bg-white rounded-lg`}>

            <form onSubmit={formik.handleSubmit}>
              {/* old Password */}
                <div className='relative'>
                    <label className='font-bold' htmlFor="oldPassword">old Password</label>
                    <input autoComplete='on' className='pr-10 border-2 bg-gray-100 rounded-xl my-1 p-2 rounded-md w-full' type={showOldPassword ? "password" : "text"} name="oldPassword" id='oldPassword' placeholder='old Password'
                    value={formik.values.oldPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    />
                    <button onClick={() => setShowOldPassword(!showOldPassword)} className='absolute pt-2.5 right-2.5 text-xl' type='button'>{showOldPassword ? <span>👁</span> : <span>👁️‍🗨️</span>}</button>
                    {formik.touched.oldPassword && formik.errors.oldPassword ? (
                        <p className="text-red-900 text-center font-bold ">{formik.errors.oldPassword}</p> ):''}        
                    {(message.includes("newPassword") || message.includes("invalid credentials")) ? (
                        <p className="my-2 font-bold text-xl tracking-wider text-red-600">The password does not match the old one. </p>):''}
                    {(message.includes("invalid password") || message.includes("invalid credentials")) ? (
                        <p className="my-2 font-bold text-xl tracking-wider text-red-600">invalid password </p>):''}
                </div>

              {/* new Password */}
                <div className='relative'>
                    <label className='font-bold' htmlFor="newPassword">New Password</label>
                    <input autoComplete='on' className='pr-10 border-2 bg-gray-100 rounded-xl my-1 p-2 rounded-md w-full' type={showNewPassword ? "password" : "text"} name="newPassword" id='newPassword' placeholder='new Password'
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    />
                    <button onClick={() => setShowNewPassword(!showNewPassword)} className='absolute pt-2.5 right-2.5 text-xl' type='button'>{showNewPassword ? <span>👁</span> : <span>👁️‍🗨️</span>}</button>
                    {formik.touched.newPassword && formik.errors.newPassword ? (
                        <p className="text-red-900 text-center font-bold ">{formik.errors.newPassword}</p> ):''}
                {formik.values.newPassword ==='' && formik.values.oldPassword ===''?'':
                formik.values.newPassword===formik.values.oldPassword && <p className="text-red-900 text-center font-bold ">The new password is identical to the old one.</p>}
                
                    {(message.includes("invalid value") || message.includes("invalid credentials")) ? (
                        <p className="my-2 font-bold text-xl tracking-wider text-red-600">Use at least one capital letter, number, and symbol </p>):''}
                </div>

              {/* Confirm Password */}
                <div className='relative'>
                    <label className='font-bold' htmlFor="cpassword">Confirm Password</label>
                    <input autoComplete='on' className='pr-10 border-2 bg-gray-100 rounded-xl my-1 p-2 rounded-md w-full' type={showConfirmPassword ? "password" : "text"} name="cpassword" placeholder='Confirm Password'
                    value={formik.values.cpassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    />
                    <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='absolute pt-2.5 right-2.5 text-xl' type='button'>{showConfirmPassword ? <span>👁</span> : <span>👁️‍🗨️</span>}</button>
                    {formik.touched.cpassword && formik.errors.cpassword ? (
                        <p className="text-red-900 text-center font-bold ">{formik.errors.cpassword}</p> ):''}
                    {(message.includes("oldPassword") || message.includes("invalid credentials")) ? (
                        <p className="my-2 font-bold text-xl tracking-wider text-red-600">old Password is wrong</p>):''}
                </div>

                {loading ? (
                    <button disabled className="bg-green-500 text-white p-2 rounded-md w-full hover:bg-green-600 cursor-wait disabled:opacity-50">Loading...</button>) 
                    : (<button type="submit" className="bg-green-500 text-white p-2 rounded-md w-full hover:bg-green-600 cursor-pointer disabled:opacity-50">update password</button>
                )}

            </form>
        </div>

    </>
  )
}
