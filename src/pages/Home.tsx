import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'

export default function Home() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [service, setService] = useState('Classic Cut')
  const [date, setDate] = useState('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/booking')
  }

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
              <button className="w-full bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded-md" type="submit">Check Availability</button>
            </form>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center px-6">
          {[
            { v: '20+', t: 'Years Experience' },
            { v: '1k+', t: 'Happy Clients' },
            { v: '4.9', t: 'Average Rating' },
            { v: '24/7', t: 'Open Hours' },
          ].map((s) => (
            <div key={s.t} className="bg-gray-50 rounded-lg p-5 shadow-sm">
              <div className="text-red-600 text-2xl font-bold">{s.v}</div>
              <div className="text-sm text-gray-600">{s.t}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Popular Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <ServiceCard title="Classic Cut" description="Timeless barbering with precision" duration="45m" price="32" to="/booking" />
            <ServiceCard title="Beard & Shave" description="Beard shaping with hot towel" duration="40m" price="38" to="/booking" />
            <ServiceCard title="Signature Trim" description="Modern fade with refined edges" duration="50m" price="45" to="/booking" />
          </div>
        </div>
      </section>

      {/* Team Teaser */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Meet the Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name:'Alex Rivera', role:'Master Barber' },
              { name:'Jordan Blake', role:'Barber Surgeon' },
              { name:'Kai Nakamura', role:'Beard Specialist' },
            ].map((t)=> (
              <div key={t.name} className="bg-white rounded-lg shadow p-4 text-center">
                <div className="h-20 w-20 rounded-full mx-auto mb-3 bg-gradient-to-br from-red-500 to-yellow-600" />
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-gray-600">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Get Updates</h3>
          <p className="text-gray-600 mb-4">Join our newsletter for grooming tips and exclusive offers.</p>
          <form className="flex justify-center" onSubmit={(e)=>{ e.preventDefault(); }}>
            <input className="border rounded-l-md px-4 py-2 w-72" placeholder="Your email" />
            <button className="bg-red-600 text-white px-4 py-2 rounded-r-md" type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  )
}
