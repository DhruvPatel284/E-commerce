'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { motion } from "framer-motion"
import { Package, ShoppingBag, Truck } from "lucide-react"
import { setOrderData } from "@/redux/actions"
import { InitialState, Order, OrderProduct } from "@/redux/types"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

enum OrderStatus {
  Pending = "Pending",
  Delivered = "Delivered",
  Cancelled = "Cancelled"
}

const OrderPage = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const dispatch = useDispatch()
  const userData = useSelector((state: InitialState) => state.userData)
  const orders = useSelector((state: InitialState) => state.orders)
  const router = useRouter()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (userData.id) {
          const orderResponse = await axios.post(`api/user/order/getOrder/${userData.id}`)
          dispatch(setOrderData(orderResponse.data))
          setLoading(false)
        }
      } catch (e) {
        console.error("Error fetching orders:", e)
        setLoading(false)
      }
    }
    fetchOrders()
  }, [userData.id, dispatch])

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Pending:
        return <Package className="w-5 h-5 text-yellow-500" />
      case OrderStatus.Delivered:
        return <Truck className="w-5 h-5 text-green-500" />
      case OrderStatus.Cancelled:
        return <ShoppingBag className="w-5 h-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Pending:
        return "bg-yellow-100 text-yellow-800"
      case OrderStatus.Delivered:
        return "bg-green-100 text-green-800"
      case OrderStatus.Cancelled:
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-40 w-full rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <ShoppingBag className="w-24 h-24 text-gray-400 mb-4" />
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 text-center">No Orders Yet</h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">Looks like you haven&apos;t placed any orders. Start shopping to see your orders here!</p>
        <button
          onClick={() => router.push('/')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
        >
          Start Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order: Order, orderIndex: number) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: orderIndex * 0.1 }}
          >
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Order #{order.id.slice(-6)}</span>
                  <Badge className={`${getStatusColor(order.status as OrderStatus)} flex items-center gap-1`}>
                    {getStatusIcon(order.status as OrderStatus)}
                    {order.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {order.products.map((product: OrderProduct) => (
                  <div
                    key={product.id}
                    className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 py-4 border-b border-gray-200 last:border-b-0"
                    onClick={() => router.push(`order/${order.id}`)}
                  >
                    <img
                      src={product.image}
                      alt={product.product_name}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="font-semibold text-lg mb-1">{product.product_name}</h3>
                      <p className="text-gray-600 mb-2">Quantity: {product.quantity}</p>
                      <p className="font-bold text-lg text-blue-600">₹{product.price}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default OrderPage