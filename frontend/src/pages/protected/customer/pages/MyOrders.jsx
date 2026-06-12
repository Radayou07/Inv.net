import { ChevronRight, PackageOpen } from 'lucide-react'
import { orders } from '../data/mockData'
import { formatCurrency } from '../utils/formatters'

const statusClasses = {
  Delivered: 'bg-emerald-50 text-emerald-700 ring-emerald-600/15',
  Processing: 'bg-blue-50 text-blue-700 ring-blue-600/15',
  Pending: 'bg-amber-50 text-amber-700 ring-amber-600/15',
  Cancelled: 'bg-red-50 text-red-700 ring-red-600/15',
}

function MyOrders() {
  const showDetails = (orderId) => {
    window.alert(`Order details for ${orderId} will come from the backend API.`)
  }

  return (
    <div className="page-enter mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <p className="text-sm font-bold text-brand-600">Track every purchase</p>
      <h1 className="mt-1 text-4xl font-black tracking-tight text-slate-950">
        My Orders
      </h1>
      <p className="mt-2 max-w-2xl text-slate-500">
        Review your order history, totals, and current fulfillment status.
      </p>

      <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="hidden grid-cols-[1.4fr_1.2fr_0.7fr_0.8fr_0.8fr_130px] gap-4 border-b border-slate-100 bg-slate-50 px-6 py-4 text-xs font-black uppercase tracking-[0.12em] text-slate-400 md:grid">
          <span>Order</span>
          <span>Date</span>
          <span>Items</span>
          <span>Total</span>
          <span>Status</span>
          <span>Action</span>
        </div>
        <div className="divide-y divide-slate-100">
          {orders.map((order) => (
            <article
              key={order.id}
              className="grid gap-4 px-4 py-5 transition hover:bg-slate-50 sm:px-6 md:grid-cols-[1.4fr_1.2fr_0.7fr_0.8fr_0.8fr_130px] md:items-center"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <PackageOpen size={19} />
                </span>
                <div>
                  <p className="text-xs text-slate-400 md:hidden">Order</p>
                  <h2 className="font-black text-slate-950">#{order.id}</h2>
                </div>
              </div>
              <p className="text-sm font-medium text-slate-600">
                <span className="mr-2 text-xs text-slate-400 md:hidden">
                  Date
                </span>
                {order.date}
              </p>
              <p className="text-sm font-bold text-slate-700">
                <span className="mr-2 text-xs font-normal text-slate-400 md:hidden">
                  Items
                </span>
                {order.items}
              </p>
              <p className="font-black text-slate-950">
                <span className="mr-2 text-xs font-normal text-slate-400 md:hidden">
                  Total
                </span>
                {formatCurrency(order.total)}
              </p>
              <div>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-black ring-1 ring-inset ${statusClasses[order.status]}`}
                >
                  {order.status}
                </span>
              </div>
              <button
                type="button"
                onClick={() => showDetails(order.id)}
                className="flex min-h-10 items-center justify-center gap-1 rounded-xl border border-brand-200 px-3 text-sm font-bold text-brand-700 transition hover:bg-brand-50"
              >
                View details
                <ChevronRight size={15} />
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default MyOrders
