import { useMemo, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Cart from './pages/Cart'
import Home from './pages/Home'
import MyOrders from './pages/MyOrders'
import ProductDetails from './pages/ProductDetails'
import Products from './pages/Products'
import Profile from './pages/Profile'
import Support from './pages/Support'

function App() {
  const [cartItems, setCartItems] = useState([])

  const cartItemCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  )

  const addToCart = (product, quantity = 1) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id)

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }

      return [...currentItems, { ...product, quantity }]
    })
  }

  const updateQuantity = (productId, change) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    )
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-950">
        <Navbar cartItemCount={cartItemCount} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route
              path="/products/:productId"
              element={<ProductDetails onAddToCart={addToCart} />}
            />
            <Route
              path="/orders"
              element={<MyOrders />}
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeFromCart}
                />
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
