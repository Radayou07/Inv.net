import {
  BatteryMedium,
  ChevronDown,
  ChevronRight,
  CircleGauge,
  Headphones,
  Minus,
  PackageCheck,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
  Wifi,
  ZoomIn,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  productDetailContent,
  products,
} from '../data/mockData'
import { formatCurrency } from '../utils/formatters'

const galleryModes = [
  { id: 'contain', label: 'Full product view' },
  { id: 'cover', label: 'Closer product view' },
  { id: 'zoom', label: 'Product detail view' },
]

const tabNames = ['Description', 'Specifications', 'Reviews']

function ProductDetails({ onAddToCart }) {
  const { productId } = useParams()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [productId])

  return (
    <ProductDetailsContent
      key={productId}
      productId={productId}
      onAddToCart={onAddToCart}
    />
  )
}

function ProductDetailsContent({ productId, onAddToCart }) {
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [galleryMode, setGalleryMode] = useState('contain')
  const [activeTab, setActiveTab] = useState('Description')
  const [addedToCart, setAddedToCart] = useState(false)

  const product = products.find((item) => item.id === Number(productId))
  const details = product ? productDetailContent[product.category] : null
  const reviewCount = product ? 180 + product.id * 73 : 0
  const rating = product ? (4.4 + (product.id % 4) * 0.1).toFixed(1) : '0.0'

  const relatedProducts = useMemo(() => {
    if (!product) {
      return []
    }

    const sameCategory = products.filter(
      (item) => item.id !== product.id && item.category === product.category,
    )
    const otherProducts = products.filter(
      (item) => item.id !== product.id && item.category !== product.category,
    )

    return [...sameCategory, ...otherProducts].slice(0, 4)
  }, [product])

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <PackageCheck className="mx-auto text-slate-300" size={54} />
        <h1 className="mt-5 text-3xl font-black text-slate-950">
          Product not found
        </h1>
        <p className="mt-2 text-slate-500">
          This product may no longer be available.
        </p>
        <Link
          to="/products"
          className="mt-7 inline-flex min-h-12 items-center rounded-xl bg-brand-600 px-6 font-bold text-white hover:bg-brand-700"
        >
          Back to Products
        </Link>
      </div>
    )
  }

  const isOutOfStock = product.stock === 0
  const isLowStock = product.stock > 0 && product.stock <= 8

  const addSelectedQuantity = () => {
    onAddToCart(product, quantity)
    setAddedToCart(true)
  }

  const buyNow = () => {
    onAddToCart(product, quantity)
    navigate('/cart')
  }

  return (
    <div className="page-enter mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500"
      >
        <Link to="/" className="transition hover:text-brand-600">
          Home
        </Link>
        <ChevronRight size={15} />
        <Link to="/products" className="transition hover:text-brand-600">
          Products
        </Link>
        <ChevronRight size={15} />
        <span className="text-slate-900">Product Details</span>
      </nav>

      <section className="mt-5 grid gap-7 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.82fr)] xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.82fr)_340px]">
        <div className="grid min-w-0 gap-3 sm:grid-cols-[84px_minmax(0,1fr)]">
          <div className="order-2 flex gap-3 overflow-x-auto pb-1 sm:order-1 sm:flex-col sm:overflow-visible">
            {galleryModes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setGalleryMode(mode.id)}
                className={`relative size-20 shrink-0 overflow-hidden rounded-xl border-2 bg-white p-1 transition ${
                  galleryMode === mode.id
                    ? 'border-brand-600 shadow-sm'
                    : 'border-slate-200 hover:border-brand-200'
                }`}
                aria-label={mode.label}
              >
                <img
                  src={product.image}
                  alt=""
                  className={`h-full w-full rounded-lg object-cover ${
                    mode.id === 'zoom'
                      ? 'scale-150'
                      : mode.id === 'contain'
                        ? 'object-contain'
                        : ''
                  }`}
                />
              </button>
            ))}
            <span className="hidden h-10 w-20 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 sm:grid">
              <ChevronDown size={18} />
            </span>
          </div>

          <div className="order-1 relative grid min-h-[360px] place-items-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:order-2 lg:min-h-[520px]">
            <img
              src={product.image}
              alt={product.name}
              className={`h-full max-h-[490px] w-full transition duration-500 ${
                galleryMode === 'contain'
                  ? 'object-contain'
                  : galleryMode === 'cover'
                    ? 'object-cover'
                    : 'scale-125 object-cover'
              }`}
            />
            <span className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white text-slate-600 shadow-md">
              <ZoomIn size={18} />
            </span>
          </div>
        </div>

        <div className="min-w-0 py-1">
          <p className="text-sm font-bold text-brand-600">{product.category}</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 lg:text-4xl">
            {product.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex text-amber-400" aria-label={`${rating} out of 5 stars`}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={18}
                  fill={star <= 4 ? 'currentColor' : 'none'}
                  strokeWidth={2}
                />
              ))}
            </div>
            <span className="text-sm font-bold text-slate-700">{rating}</span>
            <span className="text-sm text-slate-400">
              ({reviewCount.toLocaleString()} reviews)
            </span>
          </div>

          <p className="mt-5 text-3xl font-black tracking-tight text-slate-950">
            {formatCurrency(product.price)}
          </p>
          <p
            className={`mt-3 flex items-center gap-2 text-sm font-bold ${
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
                ? `Low stock - ${product.stock} remaining`
                : 'In Stock'}
          </p>

          <p className="mt-6 text-sm leading-7 text-slate-600">
            {product.description} Carefully selected for dependable quality,
            convenient ordering, and fast fulfillment from our inventory
            network.
          </p>

          <div className="mt-7">
            <h2 className="text-sm font-black text-slate-950">Key Features</h2>
            <ul className="mt-4 space-y-3">
              {details.features.map((feature, index) => {
                const icons = [Wifi, BatteryMedium, ShieldCheck, CircleGauge]
                const Icon = icons[index]

                return (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm leading-6 text-slate-600"
                  >
                    <Icon
                      size={17}
                      className="mt-1 shrink-0 text-brand-600"
                    />
                    {feature}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <aside className="space-y-4 lg:col-span-2 xl:col-span-1">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <label className="text-sm font-black text-slate-900">Quantity</label>
            <div className="mt-3 flex w-fit items-center overflow-hidden rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                className="grid size-12 place-items-center text-slate-600 transition hover:bg-slate-50"
                aria-label="Decrease quantity"
              >
                <Minus size={17} />
              </button>
              <span className="grid h-12 w-16 place-items-center border-x border-slate-200 font-black text-slate-950">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() =>
                  setQuantity((current) =>
                    Math.min(product.stock || 1, current + 1),
                  )
                }
                className="grid size-12 place-items-center text-slate-600 transition hover:bg-slate-50"
                aria-label="Increase quantity"
              >
                <Plus size={17} />
              </button>
            </div>

            <button
              type="button"
              onClick={addSelectedQuantity}
              disabled={isOutOfStock}
              className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 font-bold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              <ShoppingCart size={19} />
              {addedToCart ? 'Added to Cart' : 'Add to Cart'}
            </button>
            <button
              type="button"
              onClick={buyNow}
              disabled={isOutOfStock}
              className="mt-3 min-h-12 w-full rounded-xl border border-brand-500 px-5 font-bold text-brand-700 transition hover:bg-brand-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
            >
              Buy Now
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            {[
              {
                title: 'Fast Delivery',
                description: 'Delivery in 2-4 business days',
                icon: Truck,
              },
              {
                title: '24/7 Support',
                description: 'We are here to help anytime',
                icon: Headphones,
              },
              {
                title: 'Secure Payments',
                description: 'Safe and encrypted transactions',
                icon: ShieldCheck,
              },
            ].map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="flex gap-4 border-b border-slate-100 py-4 first:pt-0 last:border-0 last:pb-0"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon size={20} />
                </span>
                <div>
                  <h3 className="text-sm font-black text-slate-900">{title}</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex gap-6 overflow-x-auto border-b border-slate-200 px-5 sm:px-7">
          {tabNames.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`relative min-h-14 shrink-0 text-sm font-black transition ${
                activeTab === tab
                  ? 'text-brand-600'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab}
              {tab === 'Reviews' ? ` (${reviewCount.toLocaleString()})` : ''}
              {activeTab === tab ? (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-brand-600" />
              ) : null}
            </button>
          ))}
        </div>

        <div className="p-5 text-sm leading-7 text-slate-600 sm:p-7">
          {activeTab === 'Description' ? (
            <p>
              {product.description} This item is managed through the Inv.NET
              inventory system so customers can see current availability,
              order confidently, and receive reliable fulfillment updates.
            </p>
          ) : null}

          {activeTab === 'Specifications' ? (
            <dl className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {Object.entries(details.specifications).map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-5 border-b border-slate-100 pb-3"
                >
                  <dt className="font-bold text-slate-900">{label}</dt>
                  <dd className="text-right text-slate-500">{value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {activeTab === 'Reviews' ? (
            <div className="grid gap-5 md:grid-cols-[180px_minmax(0,1fr)]">
              <div className="rounded-xl bg-brand-50 p-5 text-center">
                <p className="text-4xl font-black text-slate-950">{rating}</p>
                <div className="mt-2 flex justify-center text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      fill={star <= 4 ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Based on {reviewCount.toLocaleString()} reviews
                </p>
              </div>
              <div>
                <h3 className="font-black text-slate-950">
                  Customers value its quality and reliability
                </h3>
                <p className="mt-2">
                  Review content will be loaded from the backend when the
                  customer review API is available.
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="mt-9">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            Related Products
          </h2>
          <Link
            to={`/products?category=${encodeURIComponent(product.category)}`}
            className="flex items-center gap-1 text-sm font-bold text-brand-600 hover:text-brand-700"
          >
            View all
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {relatedProducts.map((relatedProduct) => (
            <Link
              key={relatedProduct.id}
              to={`/products/${relatedProduct.id}`}
              className="group flex min-w-0 items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card"
            >
              <img
                src={relatedProduct.image}
                alt={relatedProduct.name}
                className="size-24 shrink-0 rounded-xl bg-slate-100 object-cover"
                loading="lazy"
              />
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 text-sm font-black text-slate-950 group-hover:text-brand-700">
                  {relatedProduct.name}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {relatedProduct.category}
                </p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="font-black text-slate-950">
                    {formatCurrency(relatedProduct.price)}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                    <span className="size-1.5 rounded-full bg-current" />
                    {relatedProduct.stock > 0 ? 'In stock' : 'Unavailable'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ProductDetails
