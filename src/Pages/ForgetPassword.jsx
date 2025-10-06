
import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function ForgetPassword() {
      const [message, setMessage] = useState("");
      const [loading, setLoading] = useState(false);
      const [ForgotPassword, setForgotPassword] = useState(false);

      const emailRef = useRef(null);
      const navigate = useNavigate()

      // api form 1 forgot-password 👇
      async function handleSubmit(values) {
        setLoading(true);
        try {
                const res = await axios.post(`https://edu-master-psi.vercel.app/user/forgot-password`,values)
                setMessage(res.data.message);
                setLoading(false);
                setForgotPassword(true);
                navigate('/OtpPassword')
              }
            catch(err){
              setMessage(err.response?.data?.message || "❌ Error occurred during password reset");
              setLoading(false);
              }

            }

        const validationSchema = Yup.object().shape({
              email: Yup.string().email("Email is not valid").required("Email is Required"),
        });
        
        let registerForm = useFormik({
          initialValues: {
            email: '',
          },
          validationSchema,
          onSubmit: handleSubmit
        });
      // api form 1 forgot-password 👆
        


          
// focus input email 
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <>
    <div className={`my-2 border-2 bg-red-400 sm:w-[300px] md:w-1/2 mx-auto p-5 rounded-lg ${ForgotPassword ? 'opacity-50'  : 'block'}`}>
      <h2 className='text-center text-2xl font-bold'>Reset Password</h2>
      
      {/* Form 1 forgot-password */}
      <form onSubmit={registerForm.handleSubmit}>

        {/* Email */}
        <div className='my-4'>
          <input ref={emailRef} readOnly={ForgotPassword} autoComplete='on' className='border-2 p-2 rounded-md w-full focus:outline-none ' type="email" name="email" placeholder='Email'
            value={registerForm.values.email}
            onBlur={registerForm.handleBlur}
            onChange={registerForm.handleChange}
             />
          {registerForm.touched.email && registerForm.errors.email && (
            <p className="text-black-500 ">❗❗{registerForm.errors.email}</p>)}
        </div>

        {/* Submit Button */}
        {loading ? (
          <button disabled className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600 cursor-wait disabled:opacity-50">Loading...</button>) 
          :<button disabled={ForgotPassword&& true} type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600 cursor-pointer disabled:opacity-50">send</button> }
      </form>

    {message && (
        <p className={`mt-4 text-center font-semibold  ${message.includes("Success") ? "text-green-600" : "text-green-300"}`}> {message} </p>
    )}

    </div>    

    </>
  )
}

//
//   return (<>
//   <div className='row position-relative'>
//     {/* Formik 1 */}
//     <div className={EnterReset?'my-3 p-2 py-3 col-sm-12 rounded-4 m-auto col-md-8 bg-info-subtle':'my-3 p-2 py-3 col-sm-12 rounded-4 m-auto col-md-8 bg-secondary-subtle'}>
//       <form onSubmit={Formik.handleSubmit}>
//         <label htmlFor="email">Enter Your Email</label>
//         {erro&&<div className='alert alert-danger mt-3'>❗❗ {erro}</div>}
//         <input autoFocus disabled={EnterReset} onBlur={Formik.handleBlur} onChange={Formik.handleChange} value={Formik.values.email}  type="email" name="email" id="email" className='form-control my-3'/>
        
//         {IsLoading? <button disabled type='button' className='btn bg-main text-white'>loading...</button>
//         :<>{Formik.isValid && Formik.dirty ? <button disabled={EnterReset} type='submit' className='btn btn-success'>send</button>:<button disabled type='button' className='btn btn-secondary'>send</button>}</>}
        
//       </form>
      
//     </div>
      
//   {/* Formik 2 */}
//     {EnterReset==true&&
//     <div >
//         <button onClick={Reload} type='submit' className='btn btn-dark d-block m-auto '> <i className="fa-solid fa-rotate-right"></i> Reload</button>

//       <div className='my-3 p-2 py-3 col-sm-12 rounded-4 m-auto col-md-6 bg-secondary-subtle'>
//         <form onSubmit={Formik2.handleSubmit}>
//           <label htmlFor="resetCode">Enter Reset Code</label>
//         {Formik2.errors.resetCode&&Formik2.touched.resetCode&&<div className='alert alert-danger'>{Formik2.errors.resetCode}</div>}
//           {good&&Formik2.isValid&&<div className='alert text-center fw-bold alert-success'>{elhala}</div>}
//           {noGood&&Formik2.isValid&&<div className='alert text-center fw-bold alert-danger'>{elhala}</div>}
//           <input autoFocus value={Formik2.values.resetCode} onChange={Formik2.handleChange} onBlur={Formik2.handleBlur} className='form-control my-3' type="text" name='resetCode' id='resetCode'/>
//           {loading2
//           ? <button disabled type='button' className='btn bg-main text-white'>loading...</button>
//           :<>{Formik2.isValid&&Formik2.dirty?<button disabled={good} type='submit' className='btn btn-success m-auto'>send</button>:<button disabled type='button' className='btn btn-secondary'>send</button>}</>}
//         </form>
//       </div>

//     </div>}
            
//     {/* Formik 3 */}
//     {good&&<div className='border border-1 border-dark z-2 col-md-10 col-sm-12 py-3 my-3 top-50 start-50 translate-middle position-absolute bg-success-subtle'>
//           <button onClick={CloseX} title='Go Login' className='ms-auto d-block btn btn-close border border-2 border-black rounded-5 p-2'></button>
//           <h2 className='text-center'>Reset Password</h2>
//           <h4 className='text-center'>Please Enter the new password</h4>

//         <div className='border border-1 border-black rounded-4 p-2 my-2'>
//           <form onSubmit={Formik3.handleSubmit}>
//             <label htmlFor='email'>Email</label>
//             {erroeF3&&<div className='alert alert-danger mt-3'>❗❗ {erroeF3}❌</div>}
//             {erroeF3&&<div className='alert alert-info mt-3 '>This is the correct email you entered 👉 <span className=' fw-bold fa-beat d-inline-block px-2'>{ valueEmail }</span> ✅</div>}
//             {Formik3.errors.email&&Formik3.touched.email&&<div className='alert alert-danger'>{Formik3.errors.email}</div>}
//             <input autoFocus placeholder={"Enter the 👉 "+valueEmail} onChange={Formik3.handleChange} onBlur={Formik3.handleBlur} value={Formik3.values.email} className={erroeF3 ?'form-control my-3 is-invalid':'form-control my-3'} type="email" name='email' id='email' />  

//             <label htmlFor="newPassword">Enter the new password</label>
//             {Formik3.errors.newPassword&&Formik3.touched.newPassword&&<div className='alert alert-danger'>{Formik3.errors.newPassword}</div>}
//             <input placeholder='Enter Password . . . ' onChange={Formik3.handleChange} onBlur={Formik3.handleBlur} value={Formik3.values.newPassword} className='form-control my-3' type="password" name='newPassword' id='newPassword' />
           
//             {loading3
//             ? <button disabled type='submit' className='btn btn-info'>loading...</button>
//             :<>{Formik3.isValid&&Formik3.dirty?<button type='submit' className='btn btn-info'>send</button>:<button disabled type='button' className='btn btn-secondary'>send</button>}</>}
            
//           </form>
//         </div>
//       </div>}

//   </div>
//   </>
//   )

// 