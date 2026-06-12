import {
  ArrowLeft,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/formatters'

function Cart({ cartItems, onUpdateQuantity, onRemoveItem }) {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )
  const deliveryFee = cartItems.length > 0 && subtotal < 100 ? 5 : 0
  const total = subtotal + deliveryFee

  const checkout = () => {
    window.alert('Checkout will be connected to your payment API.')
  }

  return (
    <div className="page-enter mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div>
        <p className="text-sm font-bold text-brand-600">Ready when you are</p>
        <h1 className="mt-1 text-4xl font-black tracking-tight text-slate-950">
          Your Cart
        </h1>
        <p className="mt-2 text-slate-500">
          Review quantities and totals before checkout.
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white px-6 py-20 text-center shadow-sm">
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-brand-50 text-brand-600">
            <ShoppingBag size={34} />
          </span>
          <h2 className="mt-5 text-2xl font-black text-slate-950">
            Your cart is empty
          </h2>
          <p className="mx-auto mt-2 max-w-md text-slate-500">
            Explore the catalog and add products you would like to order.
          </p>
          <Link
            to="/products"
            className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-brand-600 px-6 font-bold text-white transition hover:bg-brand-700"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="hidden grid-cols-[minmax(0,1fr)_110px_140px_110px_48px] gap-4 border-b border-slate-100 bg-slate-50 px-6 py-4 text-xs font-black uppercase tracking-[0.12em] text-slate-400 md:grid">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
              <span />
            </div>
            <div className="divide-y divide-slate-100">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid gap-4 p-4 sm:grid-cols-[96px_minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_110px_140px_110px_48px] md:items-center md:px-6 md:py-5"
                >
                  <div className="flex min-w-0 items-center gap-4 sm:col-span-2 md:col-span-1">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="size-20 rounded-xl bg-slate-100 object-cover"
                    />
                    <div className="min-w-0">
                      <h2 className="truncate font-black text-slate-950">
                        {item.name}
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        {item.category}
                      </p>
                      <p className="mt-1 text-xs font-bold text-emerald-600">
                        In stock
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-slate-700 md:text-base">
                    <span className="mr-2 text-xs text-slate-400 md:hidden">
                      Price
                    </span>
                    {formatCurrency(item.price)}
                  </p>
                  <div className="flex w-fit items-center rounded-xl border border-slate-200 p-1">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="grid size-9 place-items-center rounded-lg text-slate-600 transition hover:bg-slate-100"
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-10 text-center text-sm font-black text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="grid size-9 place-items-center rounded-lg text-slate-600 transition hover:bg-slate-100"
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <p className="font-black text-slate-950">
                    <span className="mr-2 text-xs font-normal text-slate-400 md:hidden">
                      Total
                    </span>
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    className="grid size-10 place-items-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:sticky xl:top-24">
            <h2 className="text-2xl font-black tracking-tight text-slate-950">
              Order Summary
            </h2>
            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Delivery</span>
                <span className="font-bold text-slate-900">
                  {deliveryFee === 0 ? 'Free' : formatCurrency(deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-5 text-lg font-black text-slate-950">
                <span>Total</span>
                <span className="text-brand-600">{formatCurrency(total)}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={checkout}
              className="mt-6 flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 font-bold text-white transition hover:bg-brand-700"
            >
              <ShieldCheck size={19} />
              Checkout
            </button>
            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <div className="flex gap-3 text-sm">
                <Truck className="shrink-0 text-brand-600" size={19} />
                <div>
                  <p className="font-bold text-slate-900">Fast delivery</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Orders over $100 qualify for free delivery.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}

      <Link
        to="/products"
        className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700"
      >
        <ArrowLeft size={17} />
        Continue shopping
      </Link>
    </div>
  )
}

export default Cart
