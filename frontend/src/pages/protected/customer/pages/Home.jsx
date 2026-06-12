import {
  ArrowRight,
  Headphones,
  Search,
  ShieldCheck,
  Sparkles,
  Truck,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import warehouseHero from '../assets/warehouse-hero.png'
import CategoryTabs from '../components/CategoryTabs'
import ProductCard from '../components/ProductCard'
import RecentOrders from '../components/RecentOrders'
import SpecialOffer from '../components/SpecialOffer'
import { categories, offers, orders, products } from '../data/mockData'

const benefits = [
  {
    title: 'Quality Products',
    description: 'Carefully selected items from trusted suppliers.',
    icon: Sparkles,
  },
  {
    title: 'Fast Delivery',
    description: 'Reliable fulfillment from the nearest warehouse.',
    icon: Truck,
  },
  {
    title: 'Secure Payments',
    description: 'Protected checkout and payment processing.',
    icon: ShieldCheck,
  },
  {
    title: '24/7 Support',
    description: 'Helpful support whenever you need it.',
    icon: Headphones,
  },
]

function Home() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Drinks')
  const featuredProducts = products.filter((product) => product.featured)

  const submitSearch = (event) => {
    event.preventDefault()
    const query = searchTerm.trim()
    navigate(query ? `/products?search=${encodeURIComponent(query)}` : '/products')
  }

  const selectCategory = (category) => {
    setSelectedCategory(category)
    navigate(`/products?category=${encodeURIComponent(category)}`)
  }

  return (
    <div className="page-enter">
      <section className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8">
        <div className="relative min-h-[380px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
          <img
            src={warehouseHero}
            alt="Organized warehouse inventory ready for delivery"
            className="absolute inset-0 h-full w-full object-cover object-center md:object-right"
          />
          <div className="absolute inset-0 bg-white/26 md:bg-gradient-to-r md:from-white md:via-white/95 md:to-transparent" />
          <div className="relative flex min-h-[380px] max-w-2xl flex-col justify-center p-6 sm:p-10 lg:p-14">
            <h1 className="max-w-[640px] text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-[52px] lg:leading-[1.08]">
              Everything you need, all in one place
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
              Browse quality inventory across every category, with fast
              delivery, secure checkout, and support you can count on.
            </p>
            <form
              onSubmit={submitSearch}
              className="mt-7 flex max-w-xl rounded-2xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-900/8"
            >
              <label className="flex min-w-0 flex-1 items-center gap-3 px-3">
                <Search size={20} className="shrink-0 text-slate-400" />
                <span className="sr-only">Search products</span>
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search products, categories, or keywords"
                  className="min-w-0 flex-1 bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:text-base"
                />
              </label>
              <button
                type="submit"
                className="rounded-xl bg-brand-600 px-5 text-sm font-bold text-white transition hover:bg-brand-700 sm:px-7"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-4 sm:px-6 lg:px-8">
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={selectCategory}
        />
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-6 px-4 py-6 sm:px-6 lg:px-8 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-brand-600">Curated for you</p>
              <h2 className="mt-1 text-3xl font-black tracking-tight text-slate-950">
                Featured Products
              </h2>
            </div>
            <Link
              to="/products"
              className="hidden items-center gap-1 text-sm font-bold text-brand-600 hover:text-brand-700 sm:flex"
            >
              View all products
              <ArrowRight size={17} />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <aside className="space-y-5">
          <RecentOrders orders={orders.slice(0, 4)} />
          <SpecialOffer offers={offers} />
        </aside>
      </section>

      <section className="mt-6 border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-[1440px] gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ title, description, icon: Icon }) => (
            <div key={title} className="flex gap-4 bg-white px-6 py-8">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                <Icon size={22} />
              </span>
              <div>
                <h3 className="font-black text-slate-950">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
