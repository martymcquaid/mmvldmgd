import { useEffect, useMemo, useState } from 'react'

type Service = {
  id: string
  name: string
  duration: number
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

function money(n: number) {
  return `$${n.toFixed(2)}`
}

function emailValid(e: string) {
  return /^\S+@\S+\.\S+$/.test(e)
}

export default function Booking() {
  // 4-step wizard state
  const [step, setStep] = useState(1)
  const [service, setService] = useState<string>(SERVICES[0].id)
  const [guests, setGuests] = useState<number>(1)
  const [date, setDate] = useState('')
  const [slot, setSlot] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  // Availability (mock): per-date slots
  const availableSlots = useMemo<string[]>(() => {
    if (!date) return []
    const base = ['09:00', '11:00', '13:00', '15:00']
    const seed = date.replace(/-/g, '')
    const drop = Math.abs(seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % 2
    const s = base.slice()
    if (drop > 0) s.pop()
    return s
  }, [date])

  useEffect(() => {
    if (slot && !availableSlots.includes(slot)) setSlot('')
  }, [availableSlots, slot])

  const selected = SERVICES.find((s) => s.id === service) ?? SERVICES[0]
  const estTotal = selected.price * Math.max(1, guests)

  function next() {
    if (step === 4) return
    // Validation per step
    if (step === 1 && (!service || guests < 1)) {
      setStatus('Please choose a service and at least 1 guest.')
      return
    }
    if (step === 2 && (!date || !slot)) {
      setStatus('Please select a date and time slot.')
      return
    }
    if (step === 3 && (!name.trim() || !emailValid(email))) {
      setStatus('Please provide a valid name and email.')
      return
    }
    setStatus(null)
    setStep((s) => Math.min(4, s + 1))
  }

  function back() {
    setStatus(null)
    setStep((s) => Math.max(1, s - 1))
  }

  function submit() {
    if (!date || !slot || !name.trim() || !emailValid(email)) {
      setStatus('Please complete all required fields.')
      return
    }
    setStatus('Booking confirmed. We will email you with details.')
    try {
      const histRaw = localStorage.getItem('bookingHistory')
      const hist: BookingRecord[] = histRaw ? JSON.parse(histRaw) : []
      hist.push({ serviceId: service, date, guests })
      localStorage.setItem('bookingHistory', JSON.stringify(hist))
    } catch {}
  }

  const serviceLabel = `${selected.name} — ${selected.price}$ • ${selected.duration}m`

  const SummaryPanel = (
    <div className="bg-white/5 border border-white/20 rounded-md p-4 space-y-2 text-sm text-gray-700">
      <div><strong>Service</strong>: {serviceLabel}</div>
      <div><strong>Date</strong>: {date || '—'}</div>
      <div><strong>Time</strong>: {slot || '—'}</div>
      <div><strong>Guests</strong>: {guests}</div>
      <div><strong>Est. Total</strong>: {money(estTotal)}</div>
    </div>
  )

  return (
    <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Booking</h2>
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white/10 border border-white/20 rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold text-gray-700">Step {step} of 4</div>
              <div className="flex gap-2 text-xs text-gray-500">
                {[1,2,3,4].map(n => (
                  <span key={n} className={`h-2 w-6 rounded-full ${n <= step ? 'bg-yellow-500' : 'bg-gray-300'}`} />
                ))}
              </div>
            </div>

            {step >= 1 && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Service</label>
                  <select value={service} onChange={(e)=>setService(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2">
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>{s.name} — {s.price}$ • {s.duration}m</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Guests</label>
                  <input type="number" min={1} max={6} value={guests} onChange={(e)=>setGuests(Number(e.target.value))} className="mt-1 w-full border rounded-md px-3 py-2" />
                </div>
              </div>
            )}

            {step >= 2 && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Time Slot</label>
                  <select value={slot} onChange={(e)=>setSlot(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" disabled={!date || availableSlots.length===0}>
                    <option value="">{date ? 'Choose a time' : 'Select a date first'}</option>
                    {availableSlots.map((s)=> <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            )}

            {step >= 3 && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input value={name} onChange={(e)=>setName(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" placeholder="you@example.com" />
                </div>
              </div>
            )}

            {step >= 4 && (
              <div className="pt-2">
                {SummaryPanel}
                <div className="mt-2 text-sm text-gray-600">This is a premium mock. In production, a real API call would occur here.</div>
              </div>
            )}

            <div className="flex items-center justify-between mt-4">
              {step > 1 && (
                <button onClick={back} className="px-4 py-2 rounded-md bg-gray-200">Back</button>
              )}
              {step < 4 ? (
                <button onClick={next} className="px-4 py-2 rounded-md bg-amber-500 text-black font-semibold">Next</button>
              ) : (
                <button onClick={submit} className="px-4 py-2 rounded-md bg-amber-600 text-black font-semibold">Confirm Booking</button>
              )}
            </div>
            {status && (
              <div role="status" aria-live="polite" className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-md mt-2">
                {status}
              </div>
            )}
          </div>
          <aside className="bg-white/5 border border-white/20 rounded-md p-6 shadow-md" aria-label="Booking summary">
            <div className="text-lg font-semibold mb-2">Summary</div>
            {currentSummary}
          </aside>
        </div>
      </div>
    </section>
  )
}
