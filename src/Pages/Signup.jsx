
import axios from 'axios'
import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Signup() {

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(30, "Name must be at most 30 characters")
      .required("Name is Required"),
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is Required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9A-Z!@#$%^&*()-_]{6,10}$/, "Password must start with a capital letter, 6-10 chars")
      .required("Password is Required"),
    cpassword: Yup.string()
      .oneOf([Yup.ref("password")], "The password does not match")
      .required("Confirm Password is Required"),
    phoneNumber: Yup.string()
      .matches(/^(20|\+2)?01[1205][0-9]{8}$/, "Phone is not valid")
      .required("Phone is Required"),
    classLevel: Yup.string().required("Class Level is Required"),
  });

  async function handleSubmit(values) {
    try {
      setLoading(true);
      const res = await axios.post(`https://edu-master-psi.vercel.app/auth/signup`, values);
      setMessage("✅ Success Signup ");
      registerForm.resetForm();
      toast.success('Successfully created!');
      toast.success(res.data.message);
      navigate('/Login');
    } catch (err) {
      console.error("❌ Error:", err.response?.data || err.message);
      console.error("❌ Error:", err.response?.data?.message);
      setMessage(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }

  const registerForm = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      cpassword: '',
      phoneNumber: '',
      classLevel: '',
    },
    validationSchema,
    onSubmit: handleSubmit
  });

  return (
    <div className='my-15 border-2 bg-emerald-200 sm:w-[300px] md:w-1/2 mx-auto p-5 rounded-lg'>
      <h2 className='text-center text-2xl font-bold'>Signup Form</h2>
      
      <form onSubmit={registerForm.handleSubmit}>
        {/* Full Name */}
        <div className='my-4'>
          <input autoComplete='on' className='border-2 p-2 rounded-md w-full' type="text" name="fullName" placeholder='Full Name'
            value={registerForm.values.fullName}
            onBlur={registerForm.handleBlur}
            onChange={registerForm.handleChange}/>
          {registerForm.touched.fullName && registerForm.errors.fullName && (
            <p className="text-red-500 text-sm">{registerForm.errors.fullName}</p> )}
        </div>

        {/* Email */}
        <div className='my-4'>
          <input autoComplete='on' className='border-2 p-2 rounded-md w-full' type="email" name="email" placeholder='Email'
            value={registerForm.values.email}
            onBlur={registerForm.handleBlur}
            onChange={registerForm.handleChange} />
          {registerForm.touched.email && registerForm.errors.email && (
            <p className="text-red-500 text-sm">{registerForm.errors.email}</p>)}
        </div>

        {/* Password */}
        <div className='my-4'>
          <input autoComplete='on' className='border-2 p-2 rounded-md w-full' type="password" name="password" placeholder='Password example = Aa1234567@'
            value={registerForm.values.password}
            onBlur={registerForm.handleBlur}
            onChange={registerForm.handleChange} />
          {registerForm.touched.password && registerForm.errors.password && (
            <p className="text-red-500 text-sm">{registerForm.errors.password}</p> )}
        </div>

        {/* Confirm Password */}
        <div className='my-4'>
          <input autoComplete='on' className='border-2 p-2 rounded-md w-full' type="password" name="cpassword" placeholder='Confirm Password'
            value={registerForm.values.cpassword}
            onBlur={registerForm.handleBlur}
            onChange={registerForm.handleChange} />
          {registerForm.touched.cpassword && registerForm.errors.cpassword && (
            <p className="text-red-500 text-sm">{registerForm.errors.cpassword}</p> )}
        </div>

        {/* Phone Number */}
        <div className='my-4'>
          <input autoComplete='on' className='border-2 p-2 rounded-md w-full' type="tel" name="phoneNumber" placeholder='Phone Number'
            value={registerForm.values.phoneNumber}
            onBlur={registerForm.handleBlur}
            onChange={registerForm.handleChange} />
          {registerForm.touched.phoneNumber && registerForm.errors.phoneNumber && (
            <p className="text-red-500 text-sm">{registerForm.errors.phoneNumber}</p> )}
        </div>

        {/* Class Level */}
        <div className='my-4'>
          <select name="classLevel" className="border-2 p-2 rounded-md w-full"
            value={registerForm.values.classLevel}
            onBlur={registerForm.handleBlur}
            onChange={registerForm.handleChange} >
            <option value="" disabled selected>Select Class Level 👇</option>
            <option value="Grade 1 Secondary">Grade 1 Secondary</option>
            <option value="Grade 2 Secondary">Grade 2 Secondary</option>
            <option value="Grade 3 Secondary">Grade 3 Secondary</option>
          </select>

          {registerForm.touched.classLevel && registerForm.errors.classLevel && (
            <p className="text-red-500 text-sm">{registerForm.errors.classLevel}</p>)}
        </div>


        {/* Submit Button */}
        {loading ? (
          <button disabled className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600 cursor-wait disabled:opacity-50">Loading...</button>) 
          : (<button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600 cursor-pointer disabled:opacity-50">Signup</button>
        )}
        <p> Go to <Link to="/Login" className='text-blue-500 font-bold underline'>Login</Link></p>
      </form>

      {message && (
        <p className="mt-4 text-center font-semibold">{message}</p>
      )}
    </div>
  )
}
