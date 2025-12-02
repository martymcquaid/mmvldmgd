import ServiceCard from '../components/ServiceCard'

export default function Services() {
  const services = [
    { title: 'Classic Cut', description: 'Timeless barbering with precision scissor work', duration: '45m', price: '32' },
    { title: 'Beard & Shave', description: 'Clean shave with hot towel and shave balm', duration: '40m', price: '38' },
    { title: 'Signature Trim', description: 'Modern fade with detailed taper', duration: '50m', price: '45' },
  ]

  return (
    <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} to="/booking" />
          ))}
        </div>
      </div>
    </section>
  )
}
