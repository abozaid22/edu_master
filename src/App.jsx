import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Layouts/Layout'
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { Toaster } from 'react-hot-toast';
import Home from './Pages/Home';

function App() {

  const router = createBrowserRouter([
    {path: "/", element:<Layout /> , children:[
      {index:true, element:<Home />},
      {path: "Login", element:<Login />},
      {path: "Signup", element:<Signup />},
      
      
      {path: "*", element:<h2 className='text-4xl text-center font-bold'>404 Not Found</h2>},
    ] },
  ])

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App
