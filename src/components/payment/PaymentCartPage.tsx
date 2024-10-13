"use client";
import axios from "axios";
import { ActivitySquareIcon, CreditCard, ShoppingBag, User, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { setCartData } from "@/redux/actions";
import { CartProduct, InitialState } from "@/redux/types";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

interface User {
  id: string;
  email: string;
  phoneno?: string;
  username?: string;
  address?: string;
  pincode?: number;
  state?: string;
  city?: string;
  country?: string;
}

const PaymentCartPage = () => {
  const userData = useSelector((state: InitialState) => state.userData);
  const cartData = useSelector((state: InitialState) => state.cart);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPrice, setTotalPrice] = useState<number>(0);
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
  });

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = userData.id;
        const res = await axios.get(`/api/user/Auth/getPersonalInfo/${userId}`);
        setUserInfo(res.data.user);

        const totalAmount = cartData.products.reduce((acc: number, product: CartProduct) => {
          return acc + product.price * product.quantity;
        }, 0);

        setTotalPrice(totalAmount);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch user data.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userData.id, cartData.products]);

  const handlePayment = async () => {
    if (!userInfo.phoneno) {
      toast.error("Please fill all details.");
      router.push("/profile");
      return;
    }

    try {
      const response = await axios.post(`/api/user/order/addOrder`, {
        userId: userInfo.id,
        products: cartData.products,
        total: totalPrice,
      });

      await axios.post(`/api/user/cart/clear/${cartData.id}`);
      dispatch(setCartData({ products: [], id: "" }));
      toast.success("Product ordered successfully!");
      router.push("/order");
    } catch (error) {
      toast.error("Product order failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-slate-800">
          <ActivitySquareIcon className="inline-block mr-3 mb-1" />
          Complete Your Purchase
        </h1>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
              <CardTitle className="flex items-center text-2xl">
                <ShoppingBag className="mr-2" />
                Product Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {!loading &&
                cartData.products.map((product: CartProduct) => (
                  <div key={product.product_name} className="flex items-center space-x-6">
                    <img
                      src={product.image}
                      alt={product.product_name}
                      className="w-32 h-32 object-cover rounded-lg shadow-md"
                    />
                    <div>
                      <h3 className="font-semibold text-xl text-slate-800 mb-2">
                        {product.product_name}
                      </h3>
                      <p className="text-slate-600 mb-4">{product.product_description}</p>
                    </div>
                  </div>
                ))}
            </CardContent>
            <CardFooter className="bg-slate-50">
              <div className="w-full flex justify-between items-center">
                <span className="text-lg font-semibold text-slate-700">Total:</span>
                <span className="text-3xl font-bold text-slate-800">₹{totalPrice}</span>
              </div>
            </CardFooter>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
              <CardTitle className="flex items-center text-2xl">
                <User className="mr-2" />
                Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-slate-800 mb-2">
                    <User className="mr-2 text-slate-600" /> Personal Details
                  </h3>
                  <p className="text-slate-600">
                    <span className="font-medium">Name:</span> {userInfo.username}
                  </p>
                  <p className="text-slate-600">
                    <span className="font-medium">Email:</span> {userInfo.email}
                  </p>
                  <p className="text-slate-600">
                    <span className="font-medium">Phone:</span> {userInfo.phoneno}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-slate-800 mb-2">
                    <MapPin className="mr-2 text-slate-600" /> Shipping Address
                  </h3>
                  <p className="text-slate-600">{userInfo.address}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50">
              <Button variant="outline" className="w-full text-slate-800 border-slate-300 hover:bg-slate-100">
                Edit Information
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card className="mt-8 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
            <CardTitle className="text-2xl flex items-center">
              <CreditCard className="mr-2" />
              Secure Payment
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label htmlFor="card-number" className="block text-sm font-medium text-slate-700 mb-1">
                    Card Number
                  </label>
                  <input type="text" id="card-number" placeholder="1234 5678 9012 3456" className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label htmlFor="expiry" className="block text-sm font-medium text-slate-700 mb-1">
                    Expiry Date
                  </label>
                  <input type="text" id="expiry" placeholder="MM/YY" className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label htmlFor="cvc" className="block text-sm font-medium text-slate-700 mb-1">
                    CVC
                  </label>
                  <input type="text" id="cvc" placeholder="123" className="w-full p-2 border rounded" />
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={handlePayment}>
                Pay Now
              </Button>
            </div>
          </CardContent>
          <CardFooter className="bg-slate-50">
            <p className="text-sm text-slate-500 text-center w-full">
              For testing, use card number: 4242 4242 4242 4242 with any future expiry date and CVC.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PaymentCartPage;