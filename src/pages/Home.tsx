import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
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
    <div className="space-y-20">
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-red-600 via-red-500 to-red-700 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 items-center gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block uppercase tracking-wider text-sm font-semibold bg-white/20 px-3 py-1 rounded-full mb-2">Barber Studio</span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">mmvldmgd</h1>
            <p className="mt-4 text-xl text-white/90 max-w-md">Bold, masculine grooming for the modern man. Red & white aesthetics with precision cuts.</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link to="/services" className="bg-white text-red-700 px-6 py-3 rounded-full font-semibold shadow hover:bg-slate-100">Explore Services</Link>
              <Link to="/booking" className="bg-white/0 border border-white text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-white/10">Book Now</Link>
            </div>
          </motion.div>
          <motion.div initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}>
            <div className="h-96 rounded-xl overflow-hidden shadow-2xl">
              <div className="h-full w-full bg-gradient-to-br from-white to-red-100" />
              <div className="absolute bottom-4 left-4 bg-white text-black px-3 py-1 rounded">Barber Studio</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center px-6">
          {[
            { v: '20+', t: 'Years Experience' },
            { v: '1k+', t: 'Happy Clients' },
            { v: '5.0', t: 'Average Rating' },
            { v: '24/7', t: 'Open Hours' },
          ].map((s) => (
            <div key={s.t} className="bg-gray-50 rounded-lg p-5 shadow-sm">
              <div className="text-2xl font-bold text-red-600">{s.v}</div>
              <div className="text-sm text-gray-600">{s.t}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl font-extrabold text-gray-800 mb-6">Popular Services</motion.h2>
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
              { name: 'Alex Rivera', role: 'Master Barber' },
              { name: 'Jordan Blake', role: 'Barber Surgeon' },
              { name: 'Kai Nakamura', role: 'Beard Specialist' },
            ].map((b) => (
              <div key={b.name} className="bg-white rounded-lg shadow p-4 flex-1">
                <div className="h-20 w-20 rounded-full mx-auto bg-gradient-to-br from-red-500 to-yellow-600 mb-3" />
                <div className="text-center">
                  <div className="font-semibold">{b.name}</div>
                  <div className="text-sm text-gray-600">{b.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Widget */}
      <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-2xl mx-auto px-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Quick Booking</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-md p-4 shadow-md" onSubmit={onSubmit}>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="border rounded-md px-3 py-2" />
            <select value={service} onChange={(e) => setService(e.target.value)} className="border rounded-md px-3 py-2">
              <option>Classic Cut</option>
              <option>Beard & Shave</option>
              <option>Signature Trim</option>
            </select>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border rounded-md px-3 py-2" />
            <button type="submit" className="bg-red-600 text-white rounded-md px-4 py-2 self-center md:self-end">Check Availability</button>
          </form>
          <div className="text-sm text-gray-600 mt-3">Need a hand? <Link to="/contact" className="text-red-600">Contact us</Link>.</div>
        </div>
      </section>
    </div>
  )
}
