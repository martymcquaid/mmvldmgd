export default function Gallery() {
  const imgs = Array.from({ length: 12 }).map((_, i) => `https://picsum.photos/800/600?random=${i + 1}`)
  return (
    <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Gallery</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {imgs.map((src, idx) => (
            <div key={idx} className="group relative rounded-lg overflow-hidden shadow-lg bg-gray-200 aspect-w-4 aspect-h-3">
              <img src={src} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-2 text-white text-sm bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition duration-300">Photo {idx + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
