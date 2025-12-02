import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'

export default function Home() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [service, setService] = useState('Classic Cut')
  const [date, setDate] = useState('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/booking')
  }

  const features = [
    { title: 'Expert Barbers', desc: 'Masters of classic and modern cuts', icon: 'clock' },
    { title: 'Premium Shaves', desc: 'Hot towel, balm, and precision', icon: 'image' },
    { title: 'Beard Care', desc: 'Shaping, trimming, and maintenance', icon: 'user' },
    { title: 'Fast Booking', desc: 'Online slots in real time', icon: 'check' },
  ]

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-red-600 via-red-500 to-red-700 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-block uppercase tracking-wider text-sm font-semibold bg-white/20 px-3 py-1 rounded-full mb-2">Barber Studio</span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">mmvldmgd</h1>
            <p className="text-white/90 text-lg max-w-md">Bold, masculine grooming for the modern man. Precision cuts, classic styling, and premium service.</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link to="/services" className="bg-white text-red-700 px-6 py-3 rounded-full font-semibold shadow hover:bg-slate-100">Explore Services</Link>
              <Link to="/booking" className="bg-white/0 border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10">Book Now</Link>
            </div>
          </div>
          <div className="bg-white/90 rounded-xl p-6 text-black shadow-xl">
            <div className="text-gray-800 font-semibold mb-2">Instant Booking</div>
            <form onSubmit={onSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input value={name} onChange={(e)=>setName(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Service</label>
                <select value={service} onChange={(e)=>setService(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2">
                  <option>Classic Cut</option>
                  <option>Beard & Shave</option>
                  <option>Signature Trim</option>
                </select>
              </div>
              <button className="w-full bg-red-700 hover:bg-red-800 text-white py-2 rounded-md" type="submit">Check Availability</button>
            </form>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6">What We Do Best</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-gray-50 rounded-xl p-5 shadow-sm flex flex-col items-start justify-between">
                <div className="flex items-center text-red-600 mb-3">
                  <Icon name={f.icon} size={24} className="mr-2" />
                  <span className="font-semibold">{f.title}</span>
                </div>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview teaser */}
      <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Gallery Preview</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-w-4 aspect-h-3 rounded-lg shadow-lg overflow-hidden bg-gray-200">
                <img src={`https://picsum.photos/600/450?random=${i}`} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team teaser */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Meet the Team</h2>
          <div className="grid md:grid-cols-4 gap-6 items-stretch">
            {[
              { name: 'Alex Rivera', role: 'Master Barber' },
              { name: 'Jordan Blake', role: 'Barber Surgeon' },
              { name: 'Kai Nakamura', role: 'Beard Specialist' },
              { name: 'Mason Lee', role: 'Cut Specialist' },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-lg shadow p-4 flex-1 flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-red-500 to-yellow-600 mb-3" />
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-gray-600">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
