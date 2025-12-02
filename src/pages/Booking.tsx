import { Link } from 'react-router-dom'
import React, { useEffect, useMemo, useState } from 'react'

type Service = {
  id: string
  name: string
  duration: number // minutes
  price: number
}

type BookingRecord = {
  serviceId: string
  date: string
  guests: number
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
  const [remember, setRemember] = useState(false)

  // Premium: saved prefs and history
  useEffect(() => {
    try {
      const prefsRaw = localStorage.getItem('bookingPrefs')
      if (prefsRaw) {
        const prefs = JSON.parse(prefsRaw)
        if (prefs.name) setName(prefs.name)
        if (prefs.email) setEmail(prefs.email)
        setRemember(!!prefs.name || !!prefs.email)
      }
    } catch { /* ignore */ }
  }, [])

  // Availability (mocked): derive slots from date for a touch of realism
  const availableSlots = useMemo<string[]>(() => {
    if (!date) return []
    const base = ['09:00', '11:00', '13:00', '15:00']
    const seed = date.split('-').join('')
    const numToRemove = Math.abs(seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % 2
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

  const todayMin = todayISO()

  const selectedService = SERVICES.find((s) => s.id === service) ?? SERVICES[0]
  const estimatedTotal = selectedService.price * Math.max(1, guests)

  function emailValid(e: string) {
    return /^\S+@\S+\.\S+$/.test(e)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
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
      const hist: BookingRecord[] = histRaw ? JSON.parse(histRaw) : []
      const newRecord: BookingRecord = { serviceId: service, date, guests }
      hist.push(newRecord)
      localStorage.setItem('bookingHistory', JSON.stringify(hist))
    } catch {
      // ignore persistence errors
    }

    if (remember) {
      const prefs = { name, email }
      localStorage.setItem('bookingPrefs', JSON.stringify(prefs))
    } else {
      localStorage.removeItem('bookingPrefs')
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

  return (
    <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Booking</h2>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white rounded-xl p-6 shadow-md"
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

            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-gray-700">Booking Details</div>
              <div className="h-2 w-28 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full" aria-hidden />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name</label>
              <input id="name" value={name} onChange={(e) => setName(e.target.value)} onBlur={() => setTouched((t) => ({ ...t, name: true }))} className="mt-1 w-full rounded-md px-3 py-2 bg-white/70 text-black border border-gray-300" placeholder="Your full name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => setTouched((t) => ({ ...t, email: true }))} className="mt-1 w-full rounded-md px-3 py-2 bg-white/70 text-black border border-gray-300" placeholder="you@example.com" />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700" htmlFor="date">Date</label>
                <input id="date" type="date" min={todayMin} value={date} onChange={(e) => setDate(e.target.value)} onBlur={() => setTouched((t) => ({ ...t, date: true }))} className="mt-1 w-full rounded-md px-3 py-2 bg-white/70 text-black border border-gray-300" />
              </div>
              <div className="w-40">
                <label className="block text-sm font-medium text-gray-700" htmlFor="slot">Slot</label>
                <select id="slot" value={slot} onChange={(e) => setSlot(e.target.value)} className="mt-1 w-full rounded-md px-3 py-2 bg-white/70 text-black border border-gray-300" disabled={!date || availableSlots.length === 0}>
                  <option value="">{date ? 'Choose a time' : 'Select a date first'}</option>
                  {availableSlots.map((s) => (<option key={s} value={s}>{s}</option>))}
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700" htmlFor="service">Service</label>
                <select id="service" value={service} onChange={(e) => { setService(e.target.value); setSlot(''); }} onBlur={() => setTouched((t) => ({ ...t, service: true }))} className="mt-1 w-full rounded-md px-3 py-2 bg-white/70 text-black border border-gray-300">
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>{s.name} — ${s.price} • {s.duration}m</option>
                  ))}
                </select>
              </div>
              <div className="w-28">
                <label className="block text-sm font-medium text-gray-700" htmlFor="guests">Guests</label>
                <input id="guests" type="number" min={1} max={6} value={guests} onChange={(e) => setGuests(Number(e.target.value))} onBlur={() => setTouched((t) => ({ ...t, guests: true }))} className="mt-1 w-full rounded-md px-3 py-2 bg-white/70 text-black border border-gray-300" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="notes">Notes</label>
              <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2 bg-white/70 text-black border-gray-300" placeholder="Any special requests..." />
            </div>
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" checked={remember} onChange={(e)=>setRemember(e.target.checked)} /> Remember me
              </label>
              <button type="submit" className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black px-4 py-2 rounded-md font-semibold">Submit</button>
            </div>
          </form>

          <aside className="bg-white/5 border border-white/20 rounded-xl p-6 shadow-md" aria-label="Booking summary">
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
