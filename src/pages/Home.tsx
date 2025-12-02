import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
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

  const features = [
    { title: 'Master Barbers', desc: 'Precision cuts, iconic finishes', icon: 'sparkles' },
    { title: 'Ultimate Shaves', desc: 'Hot towel & premium balms', icon: 'image' },
    { title: 'Beard Mastery', desc: 'Shaping, trimming, and maintenance', icon: 'user' },
    { title: 'Real-time Booking', desc: 'Live slots, instant confirmation', icon: 'check' },
  ]

  return (
    <div className="space-y-20" style={{ fontFamily: 'Inter, system-ui, Arial' }}>
      {/* Premium Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-amber-500/90 text-black px-3 py-1 rounded-full mb-2">
              Premium
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">MMVLD Grooming Studio</h1>
            <p className="text-slate-100/90 text-lg max-w-md">A premium grooming experience combining classic craft with modern luxury. Precision, care, and attention to detail.</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link to="/services" className="bg-amber-500 text-black px-6 py-3 rounded-full font-semibold shadow hover:shadow-lg">Explore Services</Link>
              <Link to="/booking" className="bg-white/10 border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20">Book Now</Link>
            </div>
          </div>
          <div className="bg-white/8 backdrop-blur-md rounded-2xl p-6 shadow-2xl text-white">
            <div className="text-sm text-slate-200 tracking-wide font-semibold uppercase mb-2">Instant Booking</div>
            <form onSubmit={onSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-white/90">Name</label>
                <input value={name} onChange={(e)=>setName(e.target.value)} className="mt-1 w-full rounded-md px-3 py-2 bg-white/10 text-white border border-white/20" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90">Date</label>
                <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="mt-1 w-full rounded-md px-3 py-2 bg-white/10 text-white border border-white/20" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90">Service</label>
                <select value={service} onChange={(e)=>setService(e.target.value)} className="mt-1 w-full rounded-md px-3 py-2 bg-white/10 text-white border border-white/20">
                  <option>Classic Cut</option>
                  <option>Beard & Shave</option>
                  <option>Signature Trim</option>
                </select>
              </div>
              <button className="w-full bg-amber-500 text-black font-semibold rounded-md py-2">Check Availability</button>
            </form>
          </div>
        </div>
      </section>

      {/* Premium Highlights */}
      <section className="bg-gradient-to-b from-slate-900 to-black text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-6">What We Do Best</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white/5 rounded-xl p-5 shadow-md flex flex-col">
                <div className="flex items-center text-yellow-400 mb-3">
                  <Icon name={f.icon} size={22} className="mr-2" />
                  <span className="font-semibold text-white">{f.title}</span>
                </div>
                <p className="text-sm text-white/90">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Services (grid) */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-800 to-black py-12 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-6">Premium Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <ServiceCard title="Classic Cut" description="Timeless precision with a modern edge." duration="30m" price="25" to="/booking" />
            <ServiceCard title="Beard & Shave" description="Shave, shaping, and pampering finish." duration="45m" price="40" to="/booking" />
            <ServiceCard title="Signature Trim" description="Signature finish with boutique products." duration="60m" price="60" to="/booking" />
          </div>
        </div>
      </section>

      {/* Team teaser */}
      <section className="bg-black/60 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6 items-stretch">
          {[
            { name: 'Alex Rivera', role: 'Master Barber' },
            { name: 'Jordan Blake', role: 'Barber Surgeon' },
            { name: 'Kai Nakamura', role: 'Beard Specialist' },
            { name: 'Mason Lee', role: 'Cut Specialist' },
          ].map((t) => (
            <div key={t.name} className="bg-white/5 rounded-xl shadow p-4 flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 mb-3" />
              <div className="font-semibold text-white">{t.name}</div>
              <div className="text-sm text-white/80">{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery teaser */}
      <section className="bg-gradient-to-b from-slate-900 to-black text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-6">Gallery Preview</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-w-4 aspect-h-3 rounded-lg shadow-lg overflow-hidden bg-gray-800/50">
                <img src={`https://picsum.photos/600/450?random=${i}`} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
