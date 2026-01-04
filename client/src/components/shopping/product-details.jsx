import { StarIcon, ShoppingCart, X, MessageSquare, User } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Badge } from "../ui/badge";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const { cartItems } = useSelector((state) => state.shopCart);

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="p-0 border-none max-w-[95vw] sm:max-w-[85vw] lg:max-w-[1000px] bg-white rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full max-h-[90vh]">
          {/* Left: Image Section */}
          <div className="relative bg-slate-50 p-8 flex items-center justify-center">
            <div className="relative aspect-square w-full max-w-[500px] rounded-[2rem] overflow-hidden shadow-2xl shadow-green-900/10">
              <img
                src={productDetails?.image}
                alt={productDetails?.title}
                className="w-full h-full object-cover"
              />
            </div>
            {productDetails?.salePrice > 0 && (
              <Badge className="absolute top-12 left-12 bg-[#1a4d3e] text-white border-none px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest">
                Sale
              </Badge>
            )}
          </div>

          {/* Right: Content Section */}
          <div className="flex flex-col h-full overflow-hidden">
            <div className="p-8 lg:p-12 overflow-y-auto flex-1 space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="border-slate-200 text-slate-500 font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full"
                  >
                    {productDetails?.category}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-slate-200 text-slate-500 font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full"
                  >
                    {productDetails?.brand}
                  </Badge>
                </div>
                <DialogTitle className="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                  {productDetails?.title}
                </DialogTitle>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${
                          i < 4
                            ? "fill-[#1a4d3e] text-[#1a4d3e]"
                            : "fill-slate-200 text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-slate-400">
                    (4.5 Reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-slate-900">
                  ₹
                  {(productDetails?.salePrice > 0
                    ? productDetails?.salePrice
                    : productDetails?.price || 0
                  ).toLocaleString()}
                </span>
                {productDetails?.salePrice > 0 && (
                  <span className="text-xl text-slate-400 line-through font-medium">
                    ₹{(productDetails?.price || 0).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Description
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {productDetails?.description}
                </p>
              </div>

              {/* Reviews Section */}
              <div className="space-y-6 pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Customer Reviews
                  </h3>
                  <button className="text-[11px] font-bold text-[#1a4d3e] hover:underline">
                    View All
                  </button>
                </div>

                <div className="space-y-6">
                  {[1, 2].map((review) => (
                    <div key={review} className="flex gap-4">
                      <Avatar className="w-10 h-10 rounded-xl border-none bg-slate-100">
                        <AvatarFallback className="bg-slate-100 text-[#1a4d3e] font-bold">
                          AM
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-900">
                            Aviral Mehrotra
                          </h4>
                          <span className="text-[10px] font-bold text-slate-400">
                            2 days ago
                          </span>
                        </div>
                        <div className="flex items-center gap-0.5 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className="w-3 h-3 fill-[#1a4d3e] text-[#1a4d3e]"
                            />
                          ))}
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Absolutely love this product! The quality is top-notch
                          and it exceeded my expectations.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-8 lg:px-12 lg:pb-12 bg-white border-t border-slate-50 space-y-4">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Write a review..."
                    className="h-14 pl-5 pr-12 bg-slate-50 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-[#1a4d3e]/20 transition-all"
                  />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1a4d3e] hover:scale-110 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <Button
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
                disabled={productDetails?.totalStock === 0}
                className="w-full h-14 bg-[#1a4d3e] hover:bg-[#143d31] text-white rounded-2xl font-bold text-lg shadow-lg shadow-green-900/10 transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                <ShoppingCart className="w-5 h-5" />
                {productDetails?.totalStock === 0
                  ? "Out of Stock"
                  : "Add to Cart"}
              </Button>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={handleDialogClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-900 hover:bg-white hover:scale-110 transition-all shadow-xl z-50"
        >
          <X className="w-5 h-5" />
        </button>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
