import { CalendarDays, Mail, MapPin, Phone, Save, UserRound } from 'lucide-react'
import { useState } from 'react'
import { customer } from '../data/mockData'

function Profile() {
  const [formData, setFormData] = useState(customer)

  const updateField = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const saveProfile = (event) => {
    event.preventDefault()
    window.alert('Profile changes are saved in this mock UI only.')
  }

  return (
    <div className="page-enter mx-auto max-w-[1100px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <p className="text-sm font-bold text-brand-600">Account settings</p>
      <h1 className="mt-1 text-4xl font-black tracking-tight text-slate-950">
        Profile
      </h1>
      <p className="mt-2 text-slate-500">
        Review and update your customer information.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <span className="mx-auto grid size-24 place-items-center rounded-full bg-brand-50 text-brand-600">
            <UserRound size={42} strokeWidth={1.7} />
          </span>
          <h2 className="mt-5 text-2xl font-black text-slate-950">
            {formData.name}
          </h2>
          <p className="mt-1 text-sm text-slate-500">{formData.email}</p>
          <div className="mt-6 space-y-4 border-t border-slate-100 pt-6 text-left">
            <div className="flex gap-3 text-sm text-slate-600">
              <Phone size={18} className="shrink-0 text-brand-600" />
              <span>{formData.phone}</span>
            </div>
            <div className="flex gap-3 text-sm text-slate-600">
              <MapPin size={18} className="shrink-0 text-brand-600" />
              <span>{formData.address}</span>
            </div>
            <div className="flex gap-3 text-sm text-slate-600">
              <CalendarDays size={18} className="shrink-0 text-brand-600" />
              <span>Member since {formData.memberSince}</span>
            </div>
          </div>
        </aside>

        <form
          onSubmit={saveProfile}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        >
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
            <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <UserRound size={20} />
            </span>
            <div>
              <h2 className="text-xl font-black text-slate-950">
                Edit Profile
              </h2>
              <p className="text-sm text-slate-500">
                Keep your delivery details up to date.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-bold text-slate-700">Full name</span>
              <input
                name="name"
                value={formData.name}
                onChange={updateField}
                className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
              />
            </label>
            <label className="block">
              <span className="text-sm font-bold text-slate-700">
                Email address
              </span>
              <div className="relative mt-2">
                <Mail
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={updateField}
                  className="min-h-12 w-full rounded-xl border border-slate-200 pl-11 pr-4 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                />
              </div>
            </label>
            <label className="block">
              <span className="text-sm font-bold text-slate-700">
                Phone number
              </span>
              <input
                name="phone"
                value={formData.phone}
                onChange={updateField}
                className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
              />
            </label>
            <label className="block">
              <span className="text-sm font-bold text-slate-700">
                Member since
              </span>
              <input
                value={formData.memberSince}
                disabled
                className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-500"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-bold text-slate-700">
                Delivery address
              </span>
              <textarea
                name="address"
                value={formData.address}
                onChange={updateField}
                rows="3"
                className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 font-bold text-white transition hover:bg-brand-700 sm:w-auto"
          >
            <Save size={18} />
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}

export default Profile
