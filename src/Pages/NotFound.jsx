import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <>
    <div className="h-lvh flex flex-col items-center justify-center bg-black text-white text-center">
      <h1 className="text-8xl font-bold text-red-500 animate-pulse">404</h1>
      <p className="text-2xl mt-4 tracking-[0.2em] uppercase">System Error</p>
      <p className="text-gray-400 mt-2">We can’t seem to find that page.</p>
      <Link to="/"><button className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Go Home</button></Link>
    </div>
    </>
  )
}
