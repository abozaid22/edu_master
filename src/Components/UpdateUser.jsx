
import axios from 'axios'
import { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';

export default function UpdateUser() {

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');
    const userId = jwtDecode(token)._id;    
    const nave = useNavigate()


    const validationSchema = Yup.object().shape({
        fullName: Yup.string()
            .matches(/^[A-Za-z\s]+$/, "Name must contain only letters")
            .min(3, "Name must be at least 3 characters")
            .max(30, "Name must be at most 30 characters")
            .required("Name is Required"),
        email: Yup.string()
            .email("Email is not valid")
            .required("Email is Required"),
        phoneNumber: Yup.string()
            .matches(/^(20|\+2)?01[1205][0-9]{8}$/, "Phone is not valid")
            .required("Phone is Required"),
        classLevel: Yup.string().required("Class Level is Required"),
    })

     async function UpdateData(values) {
        setLoading(true)
        try{
          const res = await axios.put(`https://edu-master-psi.vercel.app/user/${userId}`,values,{
            headers:{token:token}
          });
            setLoading(false)
            toast.success(res.data.message || "Password updated successfully!");
            setMessage(res.data.message)
            nave('/')          
        } catch (err) { 
            toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
            setLoading(false)
            setMessage(err.response?.data?.message)
        }
      }

      const formik =  useFormik({
        initialValues:{
            fullName: "",
            email: "",
            phoneNumber: "",
            classLevel: ""
        },
        validationSchema,
        onSubmit:UpdateData
    });
    

  return (
    <div>   
        <div className={`w-[300px] sm:p-4 p-2 py-4 bg-white rounded-lg`}>
        <h2 className='text-center text-2xl font-bold'>Update my data</h2>
        <p className="text-center text-yellow-600 text-sm pt-2">⚠️ phone number must be new and unused.</p>
        
        <form onSubmit={formik.handleSubmit}>
            {/* Full Name */}
            <div className='my-4'>
            <input autoComplete='on' className='border-2 p-2 rounded-md w-full' type="text" name="fullName" placeholder='Full Name'
                value={formik.values.fullName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}/>
            {formik.touched.fullName && formik.errors.fullName && (
                <p className="text-red-500 text-sm">{formik.errors.fullName}</p> )}
            </div>

            {/* Email */}
            <div className='my-4'>
            <input autoComplete='on' className='border-2 p-2 rounded-md w-full' type="email" name="email" placeholder='email'
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange} />
            {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>)}
            </div>

            {/* Phone Number */}
            <div className='my-4'>
            <input autoComplete='on' className='border-2 p-2 rounded-md w-full' type="tel" name="phoneNumber" placeholder='💡 New Phone Number'
                value={formik.values.phoneNumber}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange} />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p className="text-red-500 text-sm">{formik.errors.phoneNumber}</p> )}
            </div>

            {/* Class Level */}
            <div className='my-4'>
            <select name="classLevel" className="border-2 p-2 rounded-md w-full"
                value={formik.values.classLevel}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange} >
                <option value="" disabled selected>Select Class Level 👇</option>
                <option value="Grade 1 Secondary">Grade 1 Secondary</option>
                <option value="Grade 2 Secondary">Grade 2 Secondary</option>
                <option value="Grade 3 Secondary">Grade 3 Secondary</option>
            </select>

            {formik.touched.classLevel && formik.errors.classLevel && (
                <p className="text-red-500 text-sm">{formik.errors.classLevel}</p>)}
            </div>

            {/* Submit Button */}
            {loading ? (
            <button disabled className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600 cursor-wait disabled:opacity-50">Loading...</button>) 
            : (<button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600 cursor-pointer disabled:opacity-50">Signup</button>
            )}
        </form>

        {message.includes("user already exist")&&<p className="my-2 font-bold text-center text-xl tracking-wider text-red-600">user or phone already exist</p>}
        </div>

    </div>
  )
}
