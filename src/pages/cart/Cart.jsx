import React, { useContext } from 'react'
import { ShoppingContext } from '../../context'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const Cart = () => {

  const { cartItems , handleRemove , addQuantity , handleAddToCart } = useContext(ShoppingContext)
  const navigate = useNavigate()

  return (
    <section className='mt-20 w-full max-w-7xl px-4 mx-auto font-medium flex flex-col justify-center'>

    <div className="checkout z-19 shadow-black flex flex-col p-4 fixed bottom-4 right-4 bg-neutral-300 rounded-2xl text-black h-fit w-fit md:w-100">
      <h6 className='uppercase font-bold text-lg md:text-2xl py-1 border-b border-neutral-500/80'>Order Summary</h6>

      <p className='text-xl font-semibold mt-4'>Total : ${cartItems.reduce((acc ,curr) => acc + curr.totalPrice, 0).toFixed(2)}</p>

      <div className='grid grid-cols-2 gap-2 mt-4'>
        <button className='bg-black text-white py-1 w-full flex justify-center items-center rounded'>Checkout</button>
        <button onClick={()=>navigate('/')} className='bg-black text-white py-1 w-full flex justify-center items-center rounded'>Explore Store</button>
      </div>
    </div>

      <div className='flex items-center w-fit gap-2 mb-8'>
        <ArrowLeft color='white' className='cursor-pointer' size={30} onClick={()=> navigate(-1)}/>
        <h3 className='uppercase text-3xl text-white'>Cart</h3>
      </div>

      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {cartItems.length > 0 ?
          (
            cartItems.map((e,i) => {
              return (
            <div className='w-full bg-neutral-300 rounded flex gap-2 p-2' key={i}>
              <div className="h-36 w-36">
                <img src={e.thumbnail} alt={e.title} className='h-full w-full object-contain' />
              </div>

              <div className="text">
                <p className='text-lg'>{e.title}</p>
                <p className='text-xl font-semibold flex items-end gap-1'>${e.totalPrice.toFixed(2)}<span className='text-[12px] mb-1 font-light'>${e.price.toFixed(2)}/piece</span></p>
                <div className='flex items-center gap-2'>Quantity : 
                  <button onClick={()=>handleRemove(e,false)} className='rounded bg-neutral-400 w-6 h-6 disabled:opacity-50' disabled={e.quantity === 1}>-</button>
                  <p>{e.quantity}</p>
                  <button className='rounded bg-neutral-400 w-6 h-6' onClick={()=>handleAddToCart(e)}>+</button>
                </div>

                <button onClick={()=>handleRemove(e,true)} className='bg-neutral-950 px-4 py-2 text-white rounded mt-3'>Remove</button>
              </div>
            </div>
          )})
          ) : (
            <div className='text-white text-xl ml-10'>
              <p className='text-2xl'>No items here...🙁</p>
              <button onClick={()=>navigate('/')} className='cursor-pointer mt-4 px-4 py-1 bg-blue-600 rounded'>Explore Shop</button>
            </div>
          )
        }
  
      </div>
    </section>
  )
}

export default Cart