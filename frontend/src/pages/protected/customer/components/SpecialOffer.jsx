import { ArrowUpRight, BadgePercent, Copy } from 'lucide-react'

const colorClasses = {
  blue: 'border-blue-100 bg-blue-50 text-blue-700',
  amber: 'border-amber-100 bg-amber-50 text-amber-800',
}

function SpecialOffer({ offers }) {
  const copyCode = (code) => {
    navigator.clipboard?.writeText(code)
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
            Limited time
          </p>
          <h2 className="mt-1 text-xl font-black tracking-tight text-slate-950">
            Special Offers
          </h2>
        </div>
        <BadgePercent className="text-brand-600" size={24} />
      </div>

      <div className="mt-4 space-y-3">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={`rounded-xl border p-4 ${colorClasses[offer.color]}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-black">{offer.title}</h3>
                <p className="mt-1 text-xs opacity-80">{offer.description}</p>
              </div>
              <ArrowUpRight size={18} />
            </div>
            <button
              type="button"
              onClick={() => copyCode(offer.code)}
              className="mt-3 flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2 text-xs font-black shadow-sm transition hover:bg-white"
              title="Copy offer code"
            >
              <Copy size={14} />
              {offer.code}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SpecialOffer
