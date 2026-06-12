import { useState } from 'react'
import {
  Boxes,
  Headphones,
  Home,
  LogOut,
  Menu,
  PackageSearch,
  ShoppingCart,
  UserRound,
  X,
  ClipboardList,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Products', to: '/products', icon: PackageSearch },
  { label: 'My Orders', to: '/orders', icon: ClipboardList },
  { label: 'Cart', to: '/cart', icon: ShoppingCart, isCart: true },
  { label: 'Profile', to: '/profile', icon: UserRound },
  { label: 'Support', to: '/support', icon: Headphones },
]

function Navbar({ cartItemCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navClass = ({ isActive }) =>
    `relative flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
      isActive
        ? 'bg-brand-50 text-brand-700'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
    }`

  const handleLogout = () => {
    window.alert('Logout will be connected to your authentication service.')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="flex items-center gap-3"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="grid size-10 place-items-center rounded-xl bg-brand-600 text-white shadow-sm">
            <Boxes size={22} strokeWidth={2.2} />
          </span>
          <span>
            <span className="block text-xl font-black tracking-tight text-slate-950">
              Inv.NET
            </span>
            <span className="hidden text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 sm:block">
              Customer Store
            </span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main navigation">
          {navItems.map(({ label, to, icon: Icon, isCart }) => (
            <NavLink key={to} to={to} className={navClass}>
              <Icon size={17} strokeWidth={2} />
              <span>{label}</span>
              {isCart && cartItemCount > 0 ? (
                <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-brand-600 px-1.5 text-[10px] leading-5 text-white">
                  {cartItemCount}
                </span>
              ) : null}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={handleLogout}
            className="ml-1 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={17} />
            Logout
          </button>
        </nav>

        <div className="flex items-center gap-2 xl:hidden">
          <NavLink
            to="/cart"
            className="relative grid size-10 place-items-center rounded-xl bg-slate-100 text-slate-700"
            aria-label={`Cart with ${cartItemCount} items`}
          >
            <ShoppingCart size={20} />
            {cartItemCount > 0 ? (
              <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-brand-600 px-1 text-[10px] leading-5 text-white">
                {cartItemCount}
              </span>
            ) : null}
          </NavLink>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="grid size-10 place-items-center rounded-xl bg-brand-600 text-white"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <nav
          className="border-t border-slate-100 bg-white px-4 py-4 shadow-card xl:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto grid max-w-[1440px] gap-1 sm:grid-cols-2">
            {navItems.map(({ label, to, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={navClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </nav>
      ) : null}
    </header>
  )
}

export default Navbar
