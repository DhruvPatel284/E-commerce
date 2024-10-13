'use client'

import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { CreditCard, Package, User, MapPin, Plus, Minus, ShoppingBag, Truck } from "lucide-react"
import { setOrderData } from "@/redux/actions"
import { InitialState, OrderProduct } from "@/redux/types"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "react-hot-toast"
import StripePaymentForm from "../Stripe"
import { Button } from "../ui/Button"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

interface Product {
  product_name: string
  product_description: string
  price: number
  image: string
  id: string
  category: string
  stock: number
  quantity: number
}

interface User {
  id: string
  email: string
  phoneno?: string
  username?: string
  address?: string
  pincode?: number
  state?: string
  city?: string
  country?: string
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5 }
}

export default function PaymentPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const temp = searchParams.get('quantity')
  const quantity = Number(temp)
  const [productQuantity, setProductQuantity] = useState<number>(quantity)
  const userData = useSelector((state: InitialState) => state.userData)
  const orderData = useSelector((state: InitialState) => state.orders)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(true)
  const [product, setProduct] = useState<Product>({
    product_name: "",
    product_description: "",
    price: 0,
    image: "",
    id: "",
    category: "",
    stock: 0,
    quantity: 0
  })
  const [userInfo, setUserInfo] = useState<User>({
    id: "",
    email: "",
    phoneno: "",
    username: "",
    address: "",
    pincode: 0,
    state: "",
    city: "",
    country: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userData.id) {
          toast.error("Please log in first")
          router.push("/signin")
          return
        }

        const [userRes, productRes] = await Promise.all([
          axios.get(`/api/user/Auth/getPersonalInfo/${userData.id}`),
          axios.post(`/api/user/product/getProduct/[productId]`, { productId: params.productId })
        ])

        setUserInfo(userRes.data.user)
        setProduct(productRes.data)
        setLoading(false)
      } catch (e) {
        console.error("Error fetching data:", e)
        toast.error("Failed to load payment information")
      }
    }
    fetchData()
  }, [userData.id, params.productId])

  const handleQuantityChange = (change: number) => {
    setProductQuantity(prev => Math.max(1, prev + change))
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <Skeleton className="h-12 w-2/3 mx-auto" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 py-12">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-slate-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <CreditCard className="inline-block mr-3 mb-1 text-slate-700" />
          Complete Your Purchase
        </motion.h1>

        <div className="grid gap-8 md:grid-cols-2">
          <AnimatePresence>
            <motion.div {...fadeInUp}>
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
                  <CardTitle className="flex items-center text-2xl">
                    <ShoppingBag className="mr-2" />
                    Product Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-6">
                    <img src={product.image} alt={product.product_name} className="w-32 h-32 object-cover rounded-lg shadow-md" />
                    <div>
                      <h3 className="font-semibold text-xl text-slate-800 mb-2">{product.product_name}</h3>
                      <p className="text-slate-600 line-clamp-2 mb-4">{product.product_description}</p>
                      <div className="flex items-center space-x-3 bg-slate-100 rounded-full p-1 w-fit">
                        <Button size="sm" variant="ghost" className="rounded-full" onClick={() => handleQuantityChange(-1)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-medium text-lg w-8 text-center text-slate-800">{productQuantity}</span>
                        <Button size="sm" variant="ghost" className="rounded-full" onClick={() => handleQuantityChange(1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-slate-50">
                  <div className="w-full flex justify-between items-center">
                    <span className="text-lg font-semibold text-slate-700">Total:</span>
                    <span className="text-3xl font-bold text-slate-800">₹{product.price * productQuantity}</span>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp}>
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
                  <CardTitle className="flex items-center text-2xl">
                    <User className="mr-2" />
                    Your Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg flex items-center text-slate-800 mb-2">
                        <User className="mr-2 text-slate-600" /> Personal Details
                      </h3>
                      <p className="text-slate-600"><span className="font-medium">Name:</span> {userInfo.username}</p>
                      <p className="text-slate-600"><span className="font-medium">Email:</span> {userInfo.email}</p>
                      <p className="text-slate-600"><span className="font-medium">Phone:</span> {userInfo.phoneno}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg flex items-center text-slate-800 mb-2">
                        <Truck className="mr-2 text-slate-600" /> Shipping Address
                      </h3>
                      <p className="text-slate-600">{userInfo.address}</p>
                      <p className="text-slate-600">{userInfo.city}, {userInfo.state} {userInfo.pincode}</p>
                      <p className="text-slate-600">{userInfo.country}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-slate-50">
                  <Button variant="outline" className="w-full text-slate-800 border-slate-300 hover:bg-slate-100" onClick={() => router.push('/profile')}>
                    Edit Information
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="overflow-hidden shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
              <CardTitle className="text-2xl flex items-center">
                <CreditCard className="mr-2" />
                Secure Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Elements stripe={stripePromise}>
                <StripePaymentForm
                  customerName={userInfo.username || ""}
                  product={product}
                  userId={userInfo.id}
                  ProductQuantity={productQuantity}
                  phoneno={userInfo.phoneno}
                 orderData={orderData}
                />
              </Elements>
            </CardContent>
            <CardFooter className="bg-slate-50">
              <p className="text-sm text-slate-500 text-center w-full">
                For testing, use card number: 4242 4242 4242 4242 with any future expiry date and CVC.
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}