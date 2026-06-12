import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/formatters'

function ProductCard({ product }) {
  const isOutOfStock = product.stock === 0
  const isLowStock = product.stock > 0 && product.stock <= 8

  return (
    <Link
      to={`/products/${product.id}`}
      className="group block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
      aria-label={`Open details for ${product.name}`}
    >
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:border-brand-200 group-hover:shadow-card">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
            loading="lazy"
          />
          <span className="absolute left-3 top-3 rounded-lg bg-white/92 px-2.5 py-1 text-xs font-bold text-slate-600 shadow-sm backdrop-blur">
            {product.category}
          </span>
          <span className="absolute right-3 top-3 grid size-9 translate-y-1 place-items-center rounded-full bg-white text-brand-600 opacity-0 shadow-md transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight size={17} />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="line-clamp-2 min-h-12 text-base font-bold leading-6 text-slate-950 transition group-hover:text-brand-700">
            {product.name}
          </h3>
          <div className="mt-auto flex items-end justify-between gap-3 pt-3">
            <span className="text-xl font-black tracking-tight text-slate-950">
              {formatCurrency(product.price)}
            </span>
            <span
              className={`flex items-center gap-1.5 text-xs font-bold ${
                isOutOfStock
                  ? 'text-red-600'
                  : isLowStock
                    ? 'text-amber-600'
                    : 'text-emerald-600'
              }`}
            >
              <span className="size-2 rounded-full bg-current" />
              {isOutOfStock
                ? 'Out of stock'
                : isLowStock
                  ? `${product.stock} left`
                  : 'In stock'}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default ProductCard
