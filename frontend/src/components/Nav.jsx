import * as React from "react"
import { Menu, X, Home, ShoppingCart, Moon, Sun } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { cart_get } from "../redux/counter/cartDetail";
import { Login,Logout } from "../redux/counter/signedIn";
export default function Navbar() {
  const navigate=useNavigate();
  const dispatch=useDispatch()
  React.useEffect(()=>{
    if(signedIn){
      dispatch(cart_get());
      }
  },[])
  const { data, error } = useSelector((state) => state.cart_all)
  const {signedIn}=useSelector((state)=>state.isLoggedIn)
  const [isOpen, setIsOpen] = React.useState(false)
  const [cartCount, setCartCount] = React.useState(3) // Example cart count
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
 
  // Close mobile menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target
      if (isOpen && !target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and brand */}
            <div className="flex font-mono text-xl gap-4 items-center tracking-wide">
            <img
            src="https://dynamic.design.com/preview/logodraft/74e0bb8c-6f0b-4366-b75b-fbd39783c3b3/image/large.png"
            alt=""
            className="h-10 w-10 rounded-full"
          />
            StyleHub
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-12">
              <Link to='/'>
                <Home className="w-5 h-5 mr-2" />
                
              </Link>
              <button onClick={()=>{
                signedIn?navigate('/cart'):navigate('/auth')
              }} className="relative">
                <ShoppingCart className="w-5 h-5 mr-2" />
                
                {signedIn && data?.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white bg-violet-600 rounded-full w-4 h-4 text-xs flex items-center justify-center">
                    {data?.length}
                  </span>
                )}
              </button>
             
              <button onClick={()=>{
                if(signedIn){
                  localStorage.removeItem('auth-token');
                  dispatch(Logout())
                }
                else{
                  navigate('/auth')
                }
              }}>
                {signedIn ? "Sign Out" : "Sign In"}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
               
                onClick={toggleMenu}
                aria-label="Toggle menu"
                className="menu-button"
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile menu sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 w-[220px] border-r z-50 md:hidden mobile-menu bg-slate-50"
          >
            <div className="flex flex-col h-full">
              {/* Mobile menu header */}
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-bold font-sans text-xl tracking-wide">Menu</span>
                <button
                  
                  onClick={toggleMenu}
                  className="menu-button"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile menu items */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 space-y-3">
                  <Link to='/'
                    onClick={()=>{setIsOpen(false)}}
                    className="w-fit flex items-center justify-evenlyn text-lg my-2"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    Home
                  </Link>
                  <Link to='/cart'
                    onClick={()=>{setIsOpen(false)}}
                    className="w-fit flex items-center justify-evenly text-lg my-2"
                  >
                    <ShoppingCart className="w-5 h-5 mr-4" />
                    Cart
                    {signedIn && data?.length > 0 && (
                      <span className="absolute top-[7.9rem] left-8 bg-primary text-white bg-violet-900 rounded-full w-3 h-3 text-xs flex items-center justify-center">
                        {data?.length}
                      </span>
                    )}
                  </Link>
                 
                </div>
              </div>

              {/* Mobile menu footer */}
              <div className="p-4 border-t">
                <Link to='/auth'
                  className="w-full justify-center"
                  
                >
                  {signedIn?"Sign Out" : "Sign In"}
                  
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

