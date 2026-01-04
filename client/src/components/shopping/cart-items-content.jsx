import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is updated successfully",
        });
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item deleted",
        });
      }
    });
  }

  return (
    <div className="flex gap-4 group">
      <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-50 flex-shrink-0">
        <img
          src={cartItem?.image}
          alt={cartItem?.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-bold text-slate-900 text-sm line-clamp-2 leading-tight">
              {cartItem?.title}
            </h3>
            <button
              onClick={() => handleCartItemDelete(cartItem)}
              className="text-slate-300 hover:text-red-500 transition-colors p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-slate-400 text-xs mt-1 font-medium">
            ₹
            {(cartItem?.salePrice > 0
              ? cartItem?.salePrice
              : cartItem?.price
            ).toLocaleString()}{" "}
            / unit
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-100">
            <Button
              variant="ghost"
              className="w-7 h-7 rounded-lg hover:bg-white hover:shadow-sm"
              size="icon"
              disabled={cartItem?.quantity === 1}
              onClick={() => handleUpdateQuantity(cartItem, "minus")}
            >
              <Minus className="w-3 h-3" />
            </Button>
            <span className="w-8 text-center font-bold text-sm text-slate-900">
              {cartItem?.quantity}
            </span>
            <Button
              variant="ghost"
              className="w-7 h-7 rounded-lg hover:bg-white hover:shadow-sm"
              size="icon"
              onClick={() => handleUpdateQuantity(cartItem, "plus")}
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          <p className="font-bold text-slate-900">
            ₹
            {(
              (cartItem?.salePrice > 0
                ? cartItem?.salePrice
                : cartItem?.price) * cartItem?.quantity
            ).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserCartItemsContent;
