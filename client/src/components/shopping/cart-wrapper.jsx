import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { ShoppingBag } from "lucide-react";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md p-0 flex flex-col h-full border-l border-slate-100">
      <SheetHeader className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#1a4d3e]">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <SheetTitle className="text-xl font-bold text-slate-900">
            Your Cart
          </SheetTitle>
        </div>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <UserCartItemsContent cartItem={item} key={item.productId} />
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <div>
              <p className="text-slate-900 font-bold">Your cart is empty</p>
              <p className="text-slate-400 text-sm">
                Looks like you haven't added anything yet.
              </p>
            </div>
            <Button
              onClick={() => {
                navigate("/shop/listing");
                setOpenCartSheet(false);
              }}
              className="bg-[#1a4d3e] hover:bg-[#143d31] rounded-xl font-bold"
            >
              Start Shopping
            </Button>
          </div>
        )}
      </div>

      {cartItems && cartItems.length > 0 && (
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                Subtotal
              </p>
              <p className="text-2xl font-bold text-slate-900">
                ₹{totalCartAmount.toLocaleString()}
              </p>
            </div>
            <p className="text-slate-400 text-xs">
              Shipping calculated at checkout
            </p>
          </div>
          <Button
            onClick={() => {
              navigate("/shop/checkout");
              setOpenCartSheet(false);
            }}
            className="w-full h-14 bg-[#1a4d3e] hover:bg-[#143d31] text-white rounded-2xl font-bold text-lg shadow-lg shadow-green-900/10 transition-all hover:scale-[1.02]"
          >
            Checkout Now
          </Button>
        </div>
      )}
    </SheetContent>
  );
}

export default UserCartWrapper;
