import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ShoppingContext } from '../../context'
import { ArrowLeft, Check, Info, LucideCloudLightning, ShoppingBag, Star, Tag, User2Icon } from 'lucide-react'

const ProductDetails = () => {

  const navigate = useNavigate()

  const { loading, singleProduct, setSingleProduct, setLoading, handleAddToCart, cartItems } = useContext(ShoppingContext)

  const { id } = useParams()

  const fetchSingleProduct = async () => {
    setLoading(true)
    const response = await fetch(`https://dummyjson.com/products/${id}`)
    const data = await response.json()
    setSingleProduct(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchSingleProduct()
  }, [id])

  if (loading || !singleProduct) {
    return (
      <section className="py-16 mt-48 max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="py-16 mt-12 max-w-7xl mx-auto text-neutral-300 px-4">
        <div className="container grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-8 lg:gap-16">

          <div className="box-1 flex flex-col gap-4 relative">
            <div className="img h-120 w-full bg-neutral-300 overflow-hidden">
              <img src={singleProduct.thumbnail} alt={singleProduct.title} className='h-full w-full object-contain hover:scale-110 transition-all duration-500' />
            </div>

            <div className='absolute -top-10 left-0 cursor-pointer' onClick={()=> navigate(-1)}><ArrowLeft color='white' size={30}/></div>

            <div onClick={()=>handleAddToCart(singleProduct)} className="buttons grid grid-cols-2 gap-4 w-full">
              {cartItems.findIndex(item => item.id === singleProduct.id) > -1 ? (
                <button onClick={()=>navigate('/cart')} className='uppercase bg-amber-400 text-white py-4 flex gap-2 justify-center items-center font-semibold hover:bg-amber-500 transition-all duration-500 cursor-pointer'>
                <Check />Added to cart
              </button>
              ):(
                
              <button className='uppercase bg-amber-400 text-white py-4 flex gap-2 justify-center items-center font-semibold hover:bg-amber-500 transition-all duration-500 cursor-pointer'>
                <ShoppingBag />add to cart
              </button>
              )}

              <button onClick={()=>navigate('/cart')} className='uppercase bg-amber-600 text-white flex justify-center items-center gap-2 py-4 font-semibold hover:bg-amber-700 transition-all duration-500 cursor-pointer'>
                <LucideCloudLightning />buy now
              </button>
            </div>
          </div>


          <div className="text flex flex-col font-medium">

            <div className="tags flex gap-1 text-neutral-400 font-light">
              {
                singleProduct.tags.map((e, i) => <p key={i}>#{e}</p>)
              }
            </div>

            <p className="title text-2xl tight leading-6">{singleProduct.title}</p>

            <div className="ratings px-2 py-1 flex justify-center items-center gap-1 bg-green-600 w-fit rounded mt-4">
              {singleProduct.rating}<Star color='white' size={15} fill='white' />
            </div>

            <div className="price flex items-end gap-2 mt-6">
              <h5 className='text-4xl'>${singleProduct.price}</h5>
              <p className='text-green-600'>{singleProduct.discountPercentage}% Off</p>
            </div>

            <div className="info flex flex-col gap-1 mt-6">
              <p className='text-xl'>Information :</p>
              <div className="infos flex flex-col">
                <p className='flex items-center gap-1'><Info size={20} />{singleProduct.warrantyInformation}</p>
                <p className='flex items-center gap-1'><Info size={20} />{singleProduct.shippingInformation}</p>
              </div>
            </div>

            <p className='text-xl mt-4'>Stock : {singleProduct.stock}</p>

            {singleProduct.brand && (
              <p className='text-xl italic px-4 py-1 mt-4 w-fit border border-neutral-500'>{singleProduct.brand}</p>
            )}

            <p className='text-sm mt-4'><span className='text-lg'>Description : </span>{singleProduct.description}</p>
          </div>

        </div>

        <h5 className='uppercase mt-0 md:mt-12 mb-6 text-3xl'>reviews :</h5>

        <div className="reviews-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-8">
          {singleProduct.reviews.map((review, index) => {
            return (
              <div key={index} className='p-4 flex flex-col gap-2 bg-neutral-300 text-black rounded'>
                <p className='text-sm text-neutral-500'>{review.date}</p>
                <p className={`${review.rating > 3 ? 'bg-green-600' : 'bg-amber-400'} text-sm flex items-center gap-1 rounded w-fit px-2 py-1 text-white`}>{review.rating}<Star size={15} fill='white' /></p>

                <div className="nameNemail flex gap-2 mt-4">
                  <div className='rounded-full bg-neutral-400 p-2'>
                    <User2Icon color='black' />
                  </div>
                  <div className="flex flex-col">
                    <p className='text-sm'>{review.reviewerName}</p>
                    <p className='text-sm text-neutral-500'>{review.reviewerEmail}</p>
                  </div>
                </div>

                <p className='italic text-lg'>"{review.comment}"</p>
              </div>
            )
          })}
        </div>



      </section>
    </>
  )
}

export default ProductDetails