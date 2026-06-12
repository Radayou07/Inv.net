import { Search, SlidersHorizontal } from 'lucide-react'
import { useDeferredValue, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CategoryTabs from '../components/CategoryTabs'
import ProductCard from '../components/ProductCard'
import { categories, products } from '../data/mockData'

function Products() {
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || 'All Categories'
  const [selectedCategory, setSelectedCategory] = useState(
    categories.includes(initialCategory) ? initialCategory : 'All Categories',
  )
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const deferredSearchTerm = useDeferredValue(searchTerm)

  const filteredProducts = useMemo(() => {
    const normalizedSearch = deferredSearchTerm.trim().toLowerCase()

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All Categories' ||
        product.category === selectedCategory
      const matchesSearch =
        !normalizedSearch ||
        `${product.name} ${product.category} ${product.description}`
          .toLowerCase()
          .includes(normalizedSearch)

      return matchesCategory && matchesSearch
    })
  }, [deferredSearchTerm, selectedCategory])

  return (
    <div className="page-enter mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold text-brand-600">Browse inventory</p>
          <h1 className="mt-1 text-4xl font-black tracking-tight text-slate-950">
            Products
          </h1>
          <p className="mt-2 max-w-2xl text-slate-500">
            Find dependable products across every category and add them
            directly to your cart.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
          <SlidersHorizontal size={17} />
          {filteredProducts.length}{' '}
          {filteredProducts.length === 1 ? 'product' : 'products'}
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <label className="flex min-h-13 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-brand-500 focus-within:bg-white">
          <Search className="text-slate-400" size={20} />
          <span className="sr-only">Search products</span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by product name, category, or keyword"
            className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:text-base"
          />
        </label>
        <div className="mt-4">
          <CategoryTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            includeAll
          />
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
          <Search className="mx-auto text-slate-300" size={44} />
          <h2 className="mt-4 text-xl font-black text-slate-900">
            No products found
          </h2>
          <p className="mt-2 text-slate-500">
            Try a different search term or category.
          </p>
        </div>
      )}
    </div>
  )
}

export default Products
