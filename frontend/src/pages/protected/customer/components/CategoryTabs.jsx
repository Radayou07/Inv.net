import {
  Apple,
  BriefcaseBusiness,
  Coffee,
  HeartPulse,
  Laptop,
  Watch,
} from 'lucide-react'

const icons = {
  Drinks: Coffee,
  Electronics: Laptop,
  Food: Apple,
  'Office Supplies': BriefcaseBusiness,
  Health: HeartPulse,
  Accessories: Watch,
}

function CategoryTabs({
  categories,
  selectedCategory,
  onSelectCategory,
  includeAll = false,
}) {
  const items = includeAll ? ['All Categories', ...categories] : categories

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {items.map((category) => {
        const Icon = icons[category]
        const isSelected = selectedCategory === category

        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
            className={`flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-bold transition sm:px-5 ${
              isSelected
                ? 'border-brand-600 bg-brand-600 text-white shadow-sm'
                : 'border-slate-200 bg-white text-slate-600 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700'
            }`}
          >
            {Icon ? <Icon size={18} /> : null}
            {category}
          </button>
        )
      })}
    </div>
  )
}

export default CategoryTabs
