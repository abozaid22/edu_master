import axios from 'axios'
import { useFormik } from 'formik'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

export default function OtpPassword() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    async function otpfn(value) {
        setLoading(true);
        try {
            const res = await axios.post(`https://edu-master-psi.vercel.app/user/reset-password`,value)
            setMessage(res.data.message);
            setLoading(false);
            toast.success('password updated successfully')
            navigate('/Login')
        } catch (error) {
            setMessage(error.response?.data?.message || "❌ Error occurred during password reset");
            setLoading(false);
        }
    }

    const validationSchema = Yup.object().shape({
       email: Yup.string().email("Email is not valid").required("Email is Required"),
       otp: Yup.string().required("Reset Code is Required"),
       newPassword: Yup.string()    
       .matches(/^[A-Z][a-z0-9A-Z!@#$%^&*()-_]{6,10}$/, "Password must start with a capital letter, 6-10 chars")
       .required("Password is Required"),
       cpassword: Yup.string().oneOf([Yup.ref("newPassword")],"The password does not match").required("Password is Required"),
    })
    let handleRes = useFormik({
      initialValues: {
        email: '',
        otp: '',
        newPassword: '',
        cpassword: '',
      },
      validationSchema,
      onSubmit: otpfn
    })


  return (
    <>
    <div className=" my-2 border-2 bg-green-200 sm:w-[300px] md:w-1/2 mx-auto p-5 rounded-lg">
    <p><Link to="/ForgetPassword" className='text-blue-500 font-bold'>Go Back →</Link></p>
        <form onSubmit={handleRes.handleSubmit}>
          <h2 className='text-center text-2xl font-bold'>Enter your OTP Code</h2>
          <input autoComplete='on'  className='border-2 p-2 rounded-md w-full mt-2 ' type="email" name="email" placeholder='Email' 
            value={handleRes.values.email}
            onChange={handleRes.handleChange}
            onBlur={handleRes.handleBlur}/>
            {handleRes.touched.email && handleRes.errors.email && (
            <p className="text-red-500 text-sm mt-1">{handleRes.errors.email}</p>)}

          <input autoComplete='on' className='border-2 p-2 rounded-md w-full mt-2' type="text" name="otp" placeholder='Reset Code'
            value={handleRes.values.otp}
            onChange={handleRes.handleChange}
            onBlur={handleRes.handleBlur} />
            {handleRes.touched.otp && handleRes.errors.otp && (
            <p className="text-red-500 text-sm mt-1">{handleRes.errors.otp}</p>)}

          <input autoComplete='on' className='border-2 p-2 rounded-md w-full mt-2' type="password" name="newPassword" placeholder='new Password' 
           value={handleRes.values.newPassword}
           onChange={handleRes.handleChange}
           onBlur={handleRes.handleBlur}/>
           {handleRes.touched.newPassword && handleRes.errors.newPassword && (
           <p className="text-red-500 text-sm mt-1">{handleRes.errors.newPassword}</p>)}

          <input autoComplete='on' className='border-2 p-2 rounded-md w-full mt-2' type="password" name="cpassword" placeholder='retype Password' 
           value={handleRes.values.cpassword}
           onChange={handleRes.handleChange}
           onBlur={handleRes.handleBlur}/> 
           {handleRes.touched.cpassword && handleRes.errors.cpassword && (
           <p className="text-red-500 text-sm mt-1">{handleRes.errors.cpassword}</p>)}

          {/* <button type='submit' className='bg-green-600 text-white p-2 rounded-md w-full hover:bg-green-700 cursor-pointer mt-3'>send</button> */}
                {loading ? (
          <button disabled className="mt-2 bg-red-500 text-white p-2 rounded-md w-full cursor-wait disabled:opacity-50">Loading...</button>) 
          :<button type="submit" className="mt-2 bg-green-600 text-white p-2 rounded-md w-full hover:bg-green-700 cursor-pointer disabled:opacity-50">send</button> }

        </form>
        {message && (
            <p className={`mt-4 text-center font-bold ${message.includes("Success") ? "text-black-600" : "text-red-600 tracking-[1px]"}`}> {message} </p>
        )}

    </div>

    </>
  )
}
