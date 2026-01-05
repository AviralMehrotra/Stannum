import Address from "@/components/shopping/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { createNewOrder, capturePayment } from "@/store/shop/order-slice";
import { useToast } from "@/hooks/use-toast";
import { ShoppingBag, CreditCard, ShieldCheck, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function handleRazorpayPayment() {
    if (cartItems.items.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "razorpay",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    setIsPaymentLoading(true);

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: totalCartAmount * 100,
          currency: "INR",
          name: "Stannum.",
          description: "Premium Tech Purchase",
          image: "/logo.png", // Add your logo path here
          order_id: data.payload.razorpayOrderId,
          handler: function (response) {
            // Handle success
            dispatch(
              capturePayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: data.payload.orderId,
              })
            ).then((captureData) => {
              if (captureData?.payload?.success) {
                setIsPaymentLoading(false);
                toast({
                  title: "Payment Successful! Your order has been placed.",
                });
                navigate("/shop/payment-success");
              } else {
                setIsPaymentLoading(false);
                toast({
                  title: "Payment verification failed. Please contact support.",
                  variant: "destructive",
                });
              }
            });
          },
          prefill: {
            name: user?.userName,
            email: user?.email,
          },
          theme: {
            color: "#1a4d3e",
          },
          modal: {
            ondismiss: function () {
              setIsPaymentLoading(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        setIsPaymentLoading(false);
        toast({
          title: "Failed to create order. Please try again.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Hero Header */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={img}
          alt="Checkout"
          className="h-full w-full object-cover object-center brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">Checkout</h1>
          <div className="flex items-center gap-2 text-sm font-medium text-white/80">
            <span>Cart</span>
            <ArrowRight className="w-4 h-4" />
            <span className="text-white">Shipping & Payment</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Address Selection */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-2xl bg-[#1a4d3e] text-white shadow-lg shadow-green-900/10">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Shipping Address
              </h2>
            </div>
            <Address
              selectedId={currentSelectedAddress}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
            />
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-2xl shadow-green-900/5">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 rounded-2xl bg-slate-50 text-[#1a4d3e]">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Order Summary
                  </h2>
                </div>

                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {cartItems &&
                  cartItems.items &&
                  cartItems.items.length > 0 ? (
                    cartItems.items.map((cartItem) => (
                      <UserCartItemsContent
                        key={cartItem.productId}
                        cartItem={cartItem}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-slate-400">Your cart is empty</p>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Subtotal</span>
                    <span className="text-slate-900 font-bold">
                      ₹{totalCartAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Shipping</span>
                    <span className="text-green-600 font-bold uppercase text-xs tracking-widest">
                      Free
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                    <span className="text-lg font-bold text-slate-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-[#1a4d3e]">
                      ₹{totalCartAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleRazorpayPayment}
                  disabled={isPaymentLoading || cartItems?.items?.length === 0}
                  className="w-full h-14 bg-[#1a4d3e] hover:bg-[#143d31] text-white rounded-2xl font-bold text-lg shadow-lg shadow-green-900/10 transition-all active:scale-[0.98] flex items-center justify-center gap-3 mt-8"
                >
                  {isPaymentLoading ? (
                    "Processing..."
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Pay with Razorpay
                    </>
                  )}
                </Button>

                <div className="mt-6 flex items-center justify-center gap-2 text-slate-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Secure Checkout
                  </span>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-[#1a4d3e] rounded-3xl p-6 text-white/90 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-xl border border-white/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold">100% Secure Payments</p>
                  <p className="text-xs text-white/60">
                    Your data is protected by industry-standard encryption.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
