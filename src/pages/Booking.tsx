import { Link } from 'react-router-dom'
import React, { useEffect, useMemo, useState } from 'react'

type Service = {
  id: string
  name: string
  duration: number // minutes
  price: number
}

const SERVICES: Service[] = [
  { id: 'classic', name: 'Classic Cut', duration: 30, price: 25 },
  { id: 'beard', name: 'Beard & Shave', duration: 45, price: 40 },
  { id: 'signature', name: 'Signature Trim', duration: 60, price: 60 },
]

function todayISO(): string {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

function formatPrice(n: number): string {
  return `$${n.toFixed(2)}`
}

export default function Booking() {
  // Form state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')
  const [service, setService] = useState<string>(SERVICES[0].id)
  const [guests, setGuests] = useState<number>(1)
  const [slot, setSlot] = useState('')
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null)
  const [touched, setTouched] = useState<{ [k: string]: boolean }>({})

  // Lightweight ML-ish: load previous bookings to recommend a service
  const [recommendedService, setRecommendedService] = useState<string | null>(null)

  // Availability (mocked): derive slots from date for a touch of realism
  const availableSlots = useMemo<string[]>(() => {
    if (!date) return []
    const base = ['09:00', '11:00', '13:00', '15:00']
    const seed = date.split('-').join('')
    const numToRemove = Math.abs(seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % 2
    // remove up to 1 slot for variety
    const slots = base.slice()
    if (numToRemove > 0) slots.pop()
    return slots
  }, [date])

  // Ensure slot is valid for the selected date
  useEffect(() => {
    if (slot && !availableSlots.includes(slot)) {
      setSlot('')
    }
  }, [availableSlots, slot])

  // Read booking history to suggest a service
  useEffect(() => {
    try {
      const histRaw = localStorage.getItem('bookingHistory')
      if (histRaw) {
        const hist = JSON.parse(histRaw) as { serviceId: string }[]
        if (Array.isArray(hist) && hist.length > 0) {
          const freq = new Map<string, number>()
          hist.forEach((b) => freq.set(b.serviceId, (freq.get(b.serviceId) || 0) + 1))
          let top: string | null = null
          let max = 0
          freq.forEach((count, id) => { if (count > max) { max = count; top = id } })
          if (top) setRecommendedService(top)
        }
      }
    } catch {
      // ignore
    }
  }, [])

  // Apply recommendation once
  useEffect(() => { if (recommendedService) setService(recommendedService) }, [recommendedService])

  const todayMin = todayISO()

  const selectedService = SERVICES.find((s) => s.id === service) ?? SERVICES[0]
  const estimatedTotal = selectedService.price * Math.max(1, guests)

  function emailValid(e: string) {
    // simple email validation
    return /^\S+@\S+\.\S+$/.test(e)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Touch all fields for validation UI
    setTouched({ name: true, email: true, date: true, slot: true, service: true, guests: true })

    const ok = name.trim().length >= 2 && emailValid(email) && !!date && !!slot && guests > 0
    if (!ok) {
      setStatus({ ok: false, message: 'Please complete all required fields with valid information.' })
      return
    }
  // simulate API call
  setStatus({ ok: true, message: 'Booking request received. We will contact you shortly to confirm details.' })

  // Persist to localStorage as a lightweight history (ML-ish signal)
  try {
    const histRaw = localStorage.getItem('bookingHistory')
    const hist = histRaw ? JSON.parse(histRaw) : []
    const newRecord = { serviceId: service, date, guests }
    hist.push(newRecord)
    localStorage.setItem('bookingHistory', JSON.stringify(hist))
  } catch {
    // ignore persistence errors
  }
  }

  function resetForm() {
    setName('')
    setEmail('')
    setPhone('')
    setDate('')
    setService(SERVICES[0].id)
    setGuests(1)
    setSlot('')
    setNotes('')
    setStatus(null)
    setTouched({})
  }

  // Simple inline calendar-like helper: show a tiny grid for the selected date (optional flourish)
  // For now we keep it lightweight and rely on native date input.

  return (
    <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Booking</h2>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white rounded-md p-6 shadow-md"
            aria-label="Booking form"
          >
            {status?.ok ? (
              <div role="status" aria-live="polite" className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-md" style={{ marginBottom: 8 }}>
                {status.message}
              </div>
            ) : status?.ok === false ? (
              <div role="alert" aria-live="polite" className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md" style={{ marginBottom: 8 }}>
                {status.message}
              </div>
            ) : null}

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name</label>
              <input id="name" value={name} onChange={(e) => setName(e.target.value)} onBlur={() => setTouched((t) => ({ ...t, name: true }))} className="mt-1 w-full border rounded-md px-3 py-2" placeholder="Your full name" />
              {touched.name && name.trim().length < 2 && (
                <p className="text-sm text-red-600 mt-1">Please enter your full name.</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => setTouched((t) => ({ ...t, email: true }))} className="mt-1 w-full border rounded-md px-3 py-2" placeholder="you@example.com" />
              {touched.email && !emailValid(email) && (
                <p className="text-sm text-red-600 mt-1">Please provide a valid email address.</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="phone">Phone</label>
              <input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" placeholder="Optional" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="date">Date</label>
              <input id="date" type="date" min={todayMin} value={date} onChange={(e) => setDate(e.target.value)} onBlur={() => setTouched((t) => ({ ...t, date: true }))} className="mt-1 w-full border rounded-md px-3 py-2" />
              {touched.date && !date && <p className="text-sm text-red-600 mt-1">Please select a date.</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="service">Service</label>
              <select id="service" value={service} onChange={(e) => { setService(e.target.value); setSlot(''); }} onBlur={() => setTouched((t) => ({ ...t, service: true }))} className="mt-1 w-full border rounded-md px-3 py-2">
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>{s.name} — {formatPrice(s.price)} • {s.duration}m</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="guests">Guests</label>
              <input id="guests" type="number" min={1} max={6} value={guests} onChange={(e) => setGuests(Number(e.target.value))} onBlur={() => setTouched((t) => ({ ...t, guests: true }))} className="mt-1 w-full border rounded-md px-3 py-2" />
              {touched.guests && (guests < 1) && <p className="text-sm text-red-600 mt-1">Must be at least 1 guest.</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="slot">Time Slot</label>
              <select id="slot" value={slot} onChange={(e) => setSlot(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" disabled={!date || availableSlots.length === 0}>
                <option value="">{date ? 'Choose a time' : 'Select a date first'}</option>
                {availableSlots.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {date && availableSlots.length === 0 && (
                <p className="text-sm text-gray-600 mt-1">No slots available for this date. Try another day.</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="notes">Notes</label>
              <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" placeholder="Any special requests..." />
            </div>
            <div className="flex space-x-4 mt-2">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md" aria-label="Submit booking">Submit</button>
              <button type="button" onClick={resetForm} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md">Reset</button>
              <Link to="/contact" className="text-sm text-gray-600 inline-flex items-center">Need help?</Link>
            </div>
          </form>

          <aside className="bg-white rounded-md p-6 shadow-md" aria-label="Booking summary">
            <h3 className="text-lg font-semibold mb-2">Summary</h3>
            <p className="text-sm text-gray-700 mb-1">Service: {selectedService.name}</p>
            <p className="text-sm text-gray-700 mb-1">Date: {date || '—'}</p>
            <p className="text-sm text-gray-700 mb-1">Time: {slot || '—'}</p>
            <p className="text-sm text-gray-700 mb-1">Guests: {guests}</p>
            <p className="text-sm text-gray-700 mb-1">Est. Total: <strong>{formatPrice(estimatedTotal)}</strong></p>
            <p className="text-xs text-gray-500 mt-2">Prices are estimates and subject to change.</p>
          </aside>
        </div>
      </div>
    </section>
  )
}
