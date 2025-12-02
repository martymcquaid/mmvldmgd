import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import ServiceCard from '../components/ServiceCard'

export default function Home() {
  const features = [
    { title: 'Master Barbers', desc: 'Precision cuts with classic and modern techniques', icon: 'sparkles' },
    { title: 'Premium Shaves', desc: 'Hot towel, balm, and expert finish', icon: 'image' },
    { title: 'Beard Care', desc: 'Beard shaping and maintenance', icon: 'user' },
    { title: 'Real-time Booking', desc: 'Live slots, instant confirmation', icon: 'check' },
  ]

  return (
    <div className="space-y-20" style={{ fontFamily: 'Inter, system-ui, Arial' }}>
      {/* Premium Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-amber-500 text-black px-3 py-1 rounded-full">Premium</span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-3 mb-6">MMVLD Grooming Studio</h1>
            <p className="text-white/90 text-lg max-w-md">A premium grooming experience blending timeless barbering craft with modern luxury. Precision, care, and distinction.</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link to="/services" className="bg-amber-500 text-black px-6 py-3 rounded-full font-semibold shadow hover:shadow-lg">Explore Services</Link>
              <Link to="/booking" className="bg-white/10 border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20">Book Now</Link>
            </div>
          </div>
          <div className="bg-white/8 backdrop-blur-md rounded-2xl p-6 shadow-2xl text-white flex flex-col justify-center h-full">
            <div className="text-sm font-semibold text-white/90 mb-2">Instant Booking</div>
            <div className="text-lg">Secure slots. Real-time availability. Hassle-free confirmations.</div>
          </div>
        </div>
      </section>

      {/* Premium Highlights */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6">What We Do Best</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-xl shadow-md p-5 text-left flex flex-col h-60 justify-between">
                <div className="flex items-center gap-2 text-red-600 mb-2">
                  <Icon name={f.icon} size={20} />
                  <span className="font-semibold text-gray-700">{f.title}</span>
                </div>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Services Preview */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Premium Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <ServiceCard title="Classic Cut" description="Timeless barbering with precision scissor work" duration="45m" price="32" to="/booking" />
            <ServiceCard title="Beard & Shave" description="Luxurious beard care with hot towel" duration="40m" price="40" to="/booking" />
            <ServiceCard title="Signature Trim" description="Modern fade with detailed taper" duration="50m" price="45" to="/booking" />
          </div>
        </div>
      </section>

      {/* Gallery Preview teaser */}
      <section className="py-12 bg-black/5">
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

      {/* Team Teaser */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Meet the Team</h2>
          <div className="grid md:grid-cols-4 gap-6">
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
