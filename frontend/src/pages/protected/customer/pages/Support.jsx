import { Clock3, Headphones, Mail, Phone, Send } from 'lucide-react'
import { useState } from 'react'

const initialForm = {
  subject: '',
  email: '',
  message: '',
}

function Support() {
  const [formData, setFormData] = useState(initialForm)

  const updateField = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const sendMessage = (event) => {
    event.preventDefault()
    window.alert('Your support message was submitted in this mock UI.')
    setFormData(initialForm)
  }

  return (
    <div className="page-enter mx-auto max-w-[1100px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <p className="text-sm font-bold text-brand-600">We are here to help</p>
      <h1 className="mt-1 text-4xl font-black tracking-tight text-slate-950">
        Support
      </h1>
      <p className="mt-2 max-w-2xl text-slate-500">
        Tell us what you need and our customer support team will get back to
        you.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <form
          onSubmit={sendMessage}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        >
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
            <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <Headphones size={21} />
            </span>
            <div>
              <h2 className="text-xl font-black text-slate-950">
                Contact Support
              </h2>
              <p className="text-sm text-slate-500">
                We usually reply within one business day.
              </p>
            </div>
          </div>
          <div className="mt-6 space-y-5">
            <label className="block">
              <span className="text-sm font-bold text-slate-700">Subject</span>
              <select
                name="subject"
                value={formData.subject}
                onChange={updateField}
                required
                className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
              >
                <option value="">Select a subject</option>
                <option>Order status</option>
                <option>Product question</option>
                <option>Payment issue</option>
                <option>Returns and refunds</option>
                <option>Other</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-bold text-slate-700">
                Email address
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={updateField}
                required
                placeholder="you@example.com"
                className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
              />
            </label>
            <label className="block">
              <span className="text-sm font-bold text-slate-700">Message</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={updateField}
                required
                rows="7"
                placeholder="How can we help?"
                className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 font-bold text-white transition hover:bg-brand-700"
          >
            <Send size={18} />
            Send Message
          </button>
        </form>

        <aside className="space-y-4">
          <div className="rounded-2xl bg-brand-600 p-6 text-white shadow-card">
            <Headphones size={30} />
            <h2 className="mt-5 text-2xl font-black">Need quick help?</h2>
            <p className="mt-2 text-sm leading-6 text-blue-100">
              Our support team can help with products, orders, payments, and
              account questions.
            </p>
          </div>
          {[
            {
              label: 'Email',
              value: 'support@icms.com',
              icon: Mail,
            },
            {
              label: 'Phone',
              value: '+66 2 555 0199',
              icon: Phone,
            },
            {
              label: 'Support hours',
              value: 'Available 24/7',
              icon: Clock3,
            },
          ].map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <Icon size={20} />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                  {label}
                </p>
                <p className="mt-1 text-sm font-black text-slate-900">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  )
}

export default Support
