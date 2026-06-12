import { ArrowRight, PackageCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/formatters'

const statusClasses = {
  Delivered: 'bg-emerald-50 text-emerald-700',
  Processing: 'bg-blue-50 text-blue-700',
  Pending: 'bg-amber-50 text-amber-700',
  Cancelled: 'bg-red-50 text-red-700',
}

function RecentOrders({ orders }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
            Your activity
          </p>
          <h2 className="mt-1 text-xl font-black tracking-tight text-slate-950">
            Recent Orders
          </h2>
        </div>
        <Link
          to="/orders"
          className="flex items-center gap-1 text-sm font-bold text-brand-600 hover:text-brand-700"
        >
          View all
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="mt-4 divide-y divide-slate-100">
        {orders.map((order) => (
          <div key={order.id} className="flex items-center gap-3 py-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-brand-600">
              <PackageCheck size={19} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-slate-900">
                #{order.id}
              </p>
              <p className="text-xs text-slate-500">{order.date}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-slate-900">
                {formatCurrency(order.total)}
              </p>
              <span
                className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${statusClasses[order.status]}`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RecentOrders
