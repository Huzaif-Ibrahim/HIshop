import { useContext, useState } from 'react'
import { ShoppingContext } from '../../context'
import { Check, MoreHorizontal, ShoppingBag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Products = () => {

    const { productsData, loading, cartItems, handleAddToCart } = useContext(ShoppingContext)
    const navigate = useNavigate()

    const openProductDetail = (productId) => {
        navigate(`/products/${productId}`)
    }

    if (loading) return (
        <>
            <section className="py-16 mt-12 max-w-7xl mx-auto">
                <h2 className='text-5xl text-neutral-200 font-bold text-center mb-12'>Featured Products</h2>
                <div className="flex items-center justify-center h-64">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </section>
        </>

    )

    return (
        <section className="py-16 mt-12 max-w-7xl mx-auto px-4">
            <h2 className='text-5xl text-neutral-200 font-bold text-center mb-12'>Featured Products</h2>
            <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8">
                {productsData ?
                    productsData.map(product =>
                        <div key={product.id} className='h-full w-full rounded bg-neutral-300 overflow-hidden flex flex-col p-4 text-left'>
                            <div onClick={() => openProductDetail(product.id)} className='border-b border-neutral-400/50 mb-4 h-64 w-full overflow-hidden'>
                                <img src={product.images[0]} alt={product.title} className='hover:scale-110 transition-all duration-500 h-full w-full' />
                            </div>
                            <div className='w-full h-48'>
                                <h3 className='font-semibold text-lg'>{product.title}</h3>
                                <p className='text-sm text-neutral-700'>{product.description}</p>
                                <h4 className='font-bold text-xl mt-4'>${product.price}</h4>
                                <p className='text-sm text-green-700'>{product.discountPercentage}% Off</p>
                            </div>
                            <div className="grid grid-cols-2 gap-1 h-10 mt-4">

                                <button className='bg-neutral-400/50 text-black flex rounded h-full w-full justify-center items-center gap-2 hover:bg-neutral-400 transition-all duration-300 cursor-pointer' onClick={() => openProductDetail(product.id)} >View Details</button>
                                {cartItems.findIndex(item => item.id === product.id) > -1 ? (
                                    <button onClick={() => navigate('/cart')} className='bg-amber-400 text-white h-full w-full flex gap-0 justify-center items-center font-semibold hover:bg-amber-500 transition-all duration-500 cursor-pointer rounded ease-out'>
                                        <Check />Added
                                    </button>
                                ) : (

                                    <button onClick={() => handleAddToCart(product)} className='bg-amber-400 text-white h-full w-full rounded flex gap-2 justify-center items-center font-semibold hover:bg-amber-500 transition-all duration-500 cursor-pointer'>
                                        <ShoppingBag />Add to cart
                                    </button>
                                )}
                            </div>
                        </div>
                    )
                    : <h3>No data found</h3>}
            </div>
        </section>
    )
}

export default Products