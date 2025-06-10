import { ShoppingCart } from "lucide-react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { ShoppingContext } from "../context"

const Navbar = () => {

    const {cartQuantity} = useContext(ShoppingContext)

  return (
    <nav className="py-4 border-b border-neutral-800 text-white fixed top-0 left-0 right-0 backdrop-blur-2xl bg-transparent z-20 w-screen">
        <div className="container md:max-w-7xl px-4 mx-auto flex justify-between items-center">
            <h3 className="italic text-2xl font-bold">HI<span className="underline text-2xl font-light">shop</span></h3>

            <div className="options">
                <ul className="flex gap-8 text-lg font-light">
                    <li>
                        <Link to={'/'}>Home</Link>
                    </li>
                    <li className="p-2 bg-neutral-300 rounded-full relative">
                        <Link to={'/cart'}><ShoppingCart size={15} color="black"/></Link>
                        <span className="absolute -bottom-1 -left-1 h-4 w-4 bg-amber-100 rounded-full text-[12px] flex items-center justify-center text-black">{cartQuantity}</span>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar