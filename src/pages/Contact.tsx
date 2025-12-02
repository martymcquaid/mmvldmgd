import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'

export default function Contact() {
  return (
    <section className="py-12 bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-xl flex-1">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-200 mb-6">Have questions or want to book? Send us a message and our concierge will respond promptly.</p>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/90">Name</label>
              <input className="mt-1 w-full rounded-md px-3 py-2 bg-white/90" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90">Email</label>
              <input className="mt-1 w-full rounded-md px-3 py-2 bg-white/90" placeholder="you@example.com" type="email" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90">Message</label>
              <textarea rows={4} className="mt-1 w-full rounded-md px-3 py-2 bg-white/90" placeholder="Your message..." />
            </div>
            <button className="w-full bg-amber-500 text-black font-semibold rounded-md py-2">Send Message</button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-white/10 border border-white/20 rounded-xl p-6 shadow-xl flex items-center gap-4">
            <Icon name="clock" size={28} className="text-yellow-300" />
            <div>
              <div className="font-semibold">Business Hours</div>
              <div className="text-sm text-gray-200">Mon–Sat: 9am–7pm</div>
            </div>
          </div>

          <div className="bg-white/10 border border-white/20 rounded-xl p-6 shadow-xl">
            <div className="font-semibold mb-2">Other Ways to Reach Us</div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Icon name="image" size={20} className="text-yellow-300" />
                <span>Live Chat</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Icon name="user" size={20} className="text-yellow-300" />
                <span>Instagram DM</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Icon name="clock" size={20} className="text-yellow-300" />
                <span>Response within 1 business hour</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
