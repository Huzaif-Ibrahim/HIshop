import { Route, Routes } from 'react-router-dom'
import Products from './pages/products/Products'
import ProductDetails from './pages/productdetails/ProductDetails'
import Cart from './pages/cart/Cart'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/products/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </>
  )
}

export default App