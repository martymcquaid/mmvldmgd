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
  const [remember, setRemember] = useState(true)

  const baseSlots = useMemo<string[]>(() => {
    if (!date) return []
    const base = ['09:00', '11:00', '13:00', '15:00']
    // deterministic variation by date
    const seed = date.split('-').join('')
    const drop = Math.abs(seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % 2
    const s = base.slice()
    if (drop > 0) s.pop()
    return s
  }, [date])

  useEffect(() => {
    if (slot && !baseSlots.includes(slot)) setSlot('')
  }, [baseSlots, slot])

  const selected = SERVICES.find((s) => s.id === service) ?? SERVICES[0]
  const estTotal = selected.price * Math.max(1, guests)

  const emailOk = (e: string) => /^\S+@\S+\.\S+$/.test(e)

  function next() {
    if (step === 4) return
    // validation per step
    if (step === 1) {
      if (!service || guests < 1) { setStatus('Please select a service and at least 1 guest.'); return }
    } else if (step === 2) {
      if (!date || !slot) { setStatus('Please select a date and time slot.'); return }
    } else if (step === 3) {
      if (name.trim().length < 2 || !emailOk(email)) { setStatus('Please enter a valid name and email.'); return }
    }
    setStatus(null)
    setStep((s) => s + 1)
  }

  function back() {
    if (step <= 1) return
    setStatus(null)
    setStep((s) => s - 1)
  }

  function confirm() {
    // Final confirmation
    if (!name.trim() || !emailOk(email) || !date || !slot) {
      setStatus('Please complete all required fields on the previous steps.')
      return
    }
    setStatus('Booking confirmed. We will email you shortly with details.')
    try {
      const histRaw = localStorage.getItem('bookingHistory')
      const hist: BookingRecord[] = histRaw ? JSON.parse(histRaw) : []
      hist.push({ serviceId: service, date, guests })
      localStorage.setItem('bookingHistory', JSON.stringify(hist))
    } catch {}
  }

  // UI
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

            {step === 1 && (
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
                <div className="text-sm text-gray-600">Estimated Total: <strong>{money(estTotal)}</strong></div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Time Slot</label>
                  <select value={slot} onChange={(e)=>setSlot(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" disabled={!date || !baseSlots.length}>
                    <option value="">{date ? 'Choose a time' : 'Select a date first'}</option>
                    {baseSlots.map((s) => (<option key={s} value={s}>{s}</option>))}
                  </select>
                </div>
              </div>
            )}

            {step === 3 && (
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

            {step === 4 && (
              <div className="space-y-2">
                <div className="text-sm text-gray-700">Summary</div>
                <div className="text-sm text-gray-600"><strong>Service:</strong> {SERVICES.find(s=>s.id===service)?.name}</div>
                <div className="text-sm text-gray-600"><strong>Date:</strong> {date || '—'}</div>
                <div className="text-sm text-gray-600"><strong>Time:</strong> {slot || '—'}</div>
                <div className="text-sm text-gray-600"><strong>Guests:</strong> {guests}</div>
                <div className="text-sm text-gray-600"><strong>Total:</strong> {money(estTotal)}</div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4">
            {step > 1 && (
              <button onClick={back} className="px-4 py-2 rounded-md bg-gray-200">Back</button>
            )}
            {step < 4 ? (
              <button onClick={next} className="px-4 py-2 rounded-md bg-amber-500 text-black font-semibold">Next</button>
            ) : (
              <button onClick={confirm} className="px-4 py-2 rounded-md bg-amber-600 text-black font-semibold">Confirm Booking</button>
            )}
            {status && (
              <div role={typeof status === 'string' ? 'alert' : 'status'} aria-live="polite" className={typeof status === 'string' ? 'bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md' : 'bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-md'}>
                {status}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
