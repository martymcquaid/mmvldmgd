import { Link } from 'react-router-dom'

type ServiceCardProps = {
  title: string
  description: string
  duration?: string
  price?: string
  to?: string
}

export default function ServiceCard({ title, description, duration = '45m', price = '40', to = '/booking' }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-5 flex-1 flex flex-col">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="mt-auto flex items-center justify-between text-sm text-gray-500">
        <span>{duration}</span>
        <span className="text-red-600 font-semibold">${price}</span>
      </div>
      <div className="mt-3">
        <Link to={to} className="inline-block w-full text-center bg-red-600 text-white py-2 rounded-md">Book</Link>
      </div>
    </div>
  )
}
