import { Link } from 'react-router-dom'

export default function Navbar() {
  const links = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/team', label: 'Team' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/booking', label: 'Booking' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold text-red-700">mmvldmgd</Link>
        <div className="hidden md:flex items-center space-x-6">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="text-gray-700 hover:text-red-700">{l.label}</Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
