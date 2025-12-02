import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
      <div className="text-center p-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">mmvldmgd</h1>
        <p className="text-slate-300 mb-6">A bold, modern starting point for your project.</p>
        <div className="flex justify-center space-x-4">
          <Link to="/services" className="bg-white text-red-600 px-4 py-2 rounded-md font-semibold">Explore Services</Link>
          <Link to="/booking" className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold">Book Now</Link>
        </div>
      </div>
    </div>
  )
}
