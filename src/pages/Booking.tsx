import { Link } from 'react-router-dom'

export default function Booking() {
  return (
    <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Booking</h2>
        <form className="space-y-4 bg-white rounded-md p-6 shadow-md">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input className="mt-1 w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input className="mt-1 w-full border rounded-md px-3 py-2" type="email" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input className="mt-1 w-full border rounded-md px-3 py-2" type="date" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Service</label>
            <select className="mt-1 w-full border rounded-md px-3 py-2">
              <option>Classic Cut</option>
              <option>Beard & Shave</option>
              <option>Signature Trim</option>
            </select>
          </div>
          <div className="flex space-x-4 mt-2">
            <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-md">Submit</button>
            <Link to="/contact" className="text-sm text-gray-600 inline-flex items-center">Need help?</Link>
          </div>
        </form>
      </div>
    </section>
  )
}
