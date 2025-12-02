export default function Contact() {
  return (
    <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Contact</h2>
        <p className="text-gray-600 mb-4">Have a question or want to book by phone? Reach us below.</p>
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
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea className="mt-1 w-full border rounded-md px-3 py-2" rows={4} />
          </div>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md" type="submit">Send Message</button>
        </form>
      </div>
    </section>
  )
}
