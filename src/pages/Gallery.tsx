export default function Gallery() {
  const items = Array.from({ length: 6 }).map((_, i) => i)
  return (
    <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Gallery</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((i) => (
            <div key={i} className="aspect-w-1 aspect-h-1 bg-gradient-to-br from-red-500 to-yellow-500 rounded-md shadow-md" />
          ))}
        </div>
      </div>
    </section>
  )
}
