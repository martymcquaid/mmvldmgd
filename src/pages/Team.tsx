import React from 'react'

function BarberCard({ name, title, bio }: { name: string; title: string; bio: string }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex-1">
      <div className="h-20 w-20 rounded-full bg-gradient-to-br from-red-500 to-pink-600 mx-auto mb-3" />
      <div className="text-center">
        <div className="font-semibold">{name}</div>
        <div className="text-sm text-gray-600">{title}</div>
        <p className="text-xs text-gray-500 mt-2">{bio}</p>
      </div>
    </div>
  )
}

export default function Team() {
  const barbers = [
    { name: 'Alex Rivera', title: 'Master Barber', bio: '20+ years of classic to modern cuts' },
    { name: 'Jordan Blake', title: 'Barber Surgeon', bio: 'Precision fades and detailing' },
    { name: 'Kai Nakamura', title: 'Beard Specialist', bio: 'Beard shaping and maintenance' },
  ]

  return (
    <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Meet the Team</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {barbers.map((b) => (
            <BarberCard key={b.name} {...b} />
          ))}
        </div>
      </div>
    </section>
  )
}
