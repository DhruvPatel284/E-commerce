'use client'

import { useDispatch, useSelector } from "react-redux"
import { setCartData } from "@/redux/actions"
import { CartProduct, InitialState } from "@/redux/types"
import axios from "axios"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Minus, Plus, Trash2, ShoppingBag, CreditCard, ShoppingCart, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/Button"
import toast from "react-hot-toast"

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

export default function EnhancedCartPage() {
  const userData = useSelector((state: InitialState) => state.userData)
  const cartData = useSelector((state: InitialState) => state.cart)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(true)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const router = useRouter()

  useEffect(() => {
    const fetchingCartData = async () => {
      try {
        if (cartData && userData) {
          let amount = 0
          cartData.products.forEach((product: CartProduct) => {
            amount += product.price * product.quantity
          })
          setTotalPrice(amount)
          setLoading(false)
        }
      } catch (e) {
        console.error("Error fetching cart data:", e)
        toast.error("Error in cart")
      }
    }
    fetchingCartData()
  }, [cartData, userData])

  const deleteHandler = async (id: string) => {
    try {
      const filteredNewCartData = cartData.products?.filter(
        (product: CartProduct) => product.id !== id
      )
      const newCartValue = {
        id: cartData.id,
        products: filteredNewCartData,
      }
      const deletedResponse = await axios.post(
        `api/user/cart/update/${cartData.id}`,
        newCartValue
      )
      dispatch(setCartData(deletedResponse.data))
      toast.success("Item Removed")
    } catch (e) {
      console.error("Error deleting item:", e)
      toast.error("Item Removing error")

    }
  }

  const updateQuantity = async (id: string, newQuantity: number) => {
    try {
      const updatedProducts = cartData.products.map((product: CartProduct) => {
        if (product.id === id) {
          return { ...product, quantity: newQuantity }
        }
        return product
      })
      const newCartValue = {
        id: cartData.id,
        products: updatedProducts,
      }
      const response = await axios.post(
        `api/user/cart/update/${cartData.id}`,
        newCartValue
      )
      dispatch(setCartData(response.data))
      
    } catch (e) {
      console.error("Error updating quantity:", e)
     
    }
  }

  const handleBuyNow = (productId: string, quantity: number) => {
    router.push(`/payment/${productId}?quantity=${quantity}`)
  }

  if (!loading && cartData.products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div 
          className="flex flex-col items-center justify-center h-[calc(100vh-64px)] px-4"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={fadeIn}
        >
          <ShoppingBag className="w-32 h-32 text-gray-300 mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8 text-center max-w-md text-lg">Discover our latest collection and find something special just for you.</p>
          <Link href="/">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Your Exquisite Selection
        </motion.h1>
        {loading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className="h-40 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {cartData.products.map((product: CartProduct, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          <div className="w-full sm:w-1/3 h-60 sm:h-auto relative overflow-hidden">
                            <img 
                              src={product.image} 
                              alt={product.product_name} 
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                            />
                          </div>
                          <div className="flex-1 p-6 flex flex-col justify-between">
                            <div>
                              <h3 className="font-bold text-xl mb-2 text-gray-800">{product.product_name}</h3>
                              <p className="text-gray-600 line-clamp-2 mb-4">{product.product_description}</p>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between items-end">
                              <div className="flex items-center space-x-2 mb-4 sm:mb-0">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => updateQuantity(product.id, Math.max(1, product.quantity - 1))}
                                  className="rounded-full w-8 h-8"
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="font-medium text-lg">{product.quantity}</span>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => updateQuantity(product.id, product.quantity + 1)}
                                  className="rounded-full w-8 h-8"
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-2xl text-gray-800 mb-2">₹{product.price * product.quantity}</p>
                                <div className="flex flex-col sm:flex-row gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => deleteHandler(product.id)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Remove
                                  </Button>
                                  <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() => handleBuyNow(product.id, product.quantity)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                  >
                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                    Buy Now
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="sticky top-20 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-t-xl">
                    <CardTitle className="text-2xl font-bold">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between text-lg">
                        <span>Subtotal</span>
                        <span className="font-semibold">₹{totalPrice}</span>
                      </div>
                      <div className="flex justify-between text-lg">
                        <span>Shipping</span>
                        <span className="text-green-600 font-semibold">Free</span>
                      </div>
                      <div className="flex justify-between text-lg">
                        <span>Taxes</span>
                        <span className="italic text-gray-600">Calculated at checkout</span>
                      </div>
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <div className="flex justify-between text-xl font-bold">
                          <span>Total</span>
                          <span>₹{totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col items-stretch">
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
                      size="lg"
                      onClick={() => router.push('/payment/cart')}
                    >
                      <CreditCard className="mr-2 h-5 w-5" />
                      Proceed to Checkout
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}