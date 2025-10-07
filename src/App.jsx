import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Layouts/Layout'
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import ForgetPassword from './Pages/ForgetPassword';
import OtpPassword from './Pages/OtpPassword';
import NotFound from './Pages/NotFound';
import { useContext, useEffect } from 'react';
import { TokenContext } from './Context/TokenContext';
import Courses from './Pages/Courses';
import ProtectedRoute from './Components/ProtectedRoute';
import ProtectedRouteGuard from './Components/ProtectedRouteGuard';
import Profile from './Pages/Profile';

function App() {
  const { setToken } = useContext(TokenContext)
  useEffect(() => {
    {localStorage.getItem('token') ? setToken(localStorage.getItem('token')) : setToken(null)}
  }, [])
  

  const router = createBrowserRouter([
    {path: "/", element:<Layout /> , children:[
      {index:true, element:<ProtectedRoute><Home /></ProtectedRoute>},
      // {path:'Home', element:<ProtectedRoute><Home /></ProtectedRoute>},
      {path:'Courses',element:<ProtectedRoute><Courses /></ProtectedRoute>},
      {path:'Profile',element:<ProtectedRoute><Profile /></ProtectedRoute>},

      {path: "ForgetPassword", element:<ProtectedRouteGuard><ForgetPassword /></ProtectedRouteGuard>},
      {path:'OtpPassword',element:<ProtectedRouteGuard><OtpPassword /></ProtectedRouteGuard>},
      {path: "Login", element:<ProtectedRouteGuard><Login /></ProtectedRouteGuard>},
      {path: "Signup", element:<ProtectedRouteGuard><Signup /></ProtectedRouteGuard>},
      
      
      {path: "*", element:<NotFound />},
    ] },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
