
import axios from 'axios'
import { useContext, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { TokenContext } from '../Context/TokenContext';

export default function Login() {

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const { token, setToken } = useContext(TokenContext)

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is Required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9A-Z!@#$%^&*()-_]{6,10}$/, "Password must start with a capital letter, 6-10 chars")
      .required("Password is Required"),
  });

  async function handleSubmit(values) {
    try {
      setLoading(true);
      const res = await axios.post(`https://edu-master-psi.vercel.app/auth/login`, values);
      setMessage("✅ Success Login ");
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      registerForm.resetForm();
      toast.success('Welcome ')
      navigate('/')
    } catch (err) {
      console.error(err.response?.data.message);
      setMessage(err.response?.data.message);
    } finally {
      setLoading(false);
    }
  }

  const registerForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleSubmit
  });

  return (
    <div className='my-15 border-2 bg-emerald-200 sm:w-[300px] md:w-1/2 mx-auto p-5 rounded-lg'>
      <h2 className='text-center text-2xl font-bold'>Login Form</h2>
      
      <form onSubmit={registerForm.handleSubmit}>

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
          <input autoComplete='on' className='border-2 p-2 rounded-md w-full' type="password" name="password" placeholder='Password'
            value={registerForm.values.password}
            onBlur={registerForm.handleBlur}
            onChange={registerForm.handleChange} />
          {registerForm.touched.password && registerForm.errors.password && (
            <p className="text-red-500 text-sm">{registerForm.errors.password}</p> )}
        </div>

        {/* Submit Button */}
        {loading ? (
          <button disabled className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600 cursor-wait disabled:opacity-50">Loading...</button>) 
          : (<button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600 cursor-pointer disabled:opacity-50">Login</button>
        )}
      </form>
      
      <p> Go to <Link to="/Signup" className='text-blue-500 font-bold underline'>Signup</Link></p>
      <p><Link to="/ForgetPassword" className='text-red-400 font-bold underline'>forget your password?</Link></p>

      {message && (
        <p className={`mt-4 text-center font-semibold  ${message.includes("Success") ? "text-green-600" : "text-red-600"}`}> {message} </p>
      )}
    </div>
  )
}
