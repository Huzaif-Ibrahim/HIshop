import { createContext, useEffect, useState } from "react";

export const ShoppingContext = createContext()

const ShoppingContextState = ({ children }) => {

  const [loading, setLoading] = useState(true)
  const [productsData, setProductsData] = useState([])
  const [singleProduct, setSingleProduct] = useState(null)
  const [cartItems, setCartItems] = useState([])
  // const [cartQuantity, setCartQuantity] = useState(cartItems.length)
  const cartQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const productsFetcher = async () => {
    const response = await fetch('https://dummyjson.com/products')
    const data = await response.json()
    setProductsData(data.products)
    setLoading(false)
  }

  useEffect(() => {
    productsFetcher()
    const stored = localStorage.getItem('cartItems');
    const parsed = stored ? JSON.parse(stored) : [];
    setCartItems(Array.isArray(parsed) ? parsed : []);
  }, [])

  const handleAddToCart = (data) => {
    const cartCpy = [...cartItems]
    const isPresent = cartCpy.findIndex(item => item.id === data.id)

    if (isPresent === -1) {
      cartCpy.push({
        ...data,
        quantity: 1,
        totalPrice: data.price
      })
    } else {
      const existingItems = cartCpy[isPresent]
      cartCpy[isPresent] = {
        ...existingItems,
        quantity: existingItems.quantity + 1,
        totalPrice: (existingItems.quantity + 1) * existingItems.price
      }
    }

    setCartItems(cartCpy)
    localStorage.setItem('cartItems', JSON.stringify(cartCpy));
  }


  const handleRemove = (data, isRemoveFull) => {
    const cpycart = [...cartItems]
    const index = cpycart.findIndex(elem => elem.id === data.id)

    if (isRemoveFull) {
      cpycart.splice(index, 1)
    }
    else{
      cpycart[index] = {
        ...cpycart[index],
        quantity : (cpycart[index].quantity - 1),
        totalPrice : (cpycart[index].quantity - 1)* cpycart[index].price,
         }
    }

    localStorage.setItem("cartItems", JSON.stringify(cpycart));
    setCartItems(cpycart)
  }


  // const addQuantity = (data) => {
  //   const cpyCart = [...cartItems]
  //   const index = cpyCart.findIndex(item => item.id === data.id)
  //   cpyCart[index] = {
  //     ...cpyCart[index],
  //     quantity : cpyCart[index].quantity + 1,
  //     totalPrice : (cpyCart[index].quantity + 1)* cpyCart[index].price
  //   }

  //   setCartItems(cpyCart)
  // }

  return (
    <ShoppingContext.Provider value={{
      productsData,
      loading,
      singleProduct,
      setSingleProduct,
      setLoading,
      handleAddToCart,
      cartQuantity,
      cartItems, 
      handleRemove
    }}>
      {children}
    </ShoppingContext.Provider>
  )
}

export default ShoppingContextState