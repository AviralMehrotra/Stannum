import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ShoppingCart, Eye } from "lucide-react";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddToCart,
}) {
  return (
    <div className="group relative bg-white rounded-[2rem] border border-slate-100 p-3 transition-all duration-500 hover:shadow-2xl hover:shadow-green-900/5 hover:-translate-y-2">
      {/* Image Container */}
      <div
        onClick={() => handleGetProductDetails(product?._id)}
        className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-slate-50 cursor-pointer"
      >
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            className="w-12 h-12 rounded-full bg-white text-[#1a4d3e] flex items-center justify-center shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-[#1a4d3e] hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              handleGetProductDetails(product?._id);
            }}
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product?.totalStock === 0 ? (
            <Badge className="bg-red-500 text-white border-none rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
              Out of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="bg-orange-500 text-white border-none rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
              Only {product?.totalStock} left
            </Badge>
          ) : null}

          {product?.salePrice > 0 && (
            <Badge className="bg-[#1a4d3e] text-white border-none rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
              Sale
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mt-4 px-2 pb-2">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
              {brandOptionsMap[product?.brand]}
            </p>
            <h3
              onClick={() => handleGetProductDetails(product?._id)}
              className="text-sm font-bold text-slate-900 line-clamp-1 cursor-pointer hover:text-[#1a4d3e] transition-colors"
            >
              {product?.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-slate-900">
            ₹
            {(product?.salePrice > 0
              ? product?.salePrice
              : product?.price
            ).toLocaleString()}
          </span>
          {product?.salePrice > 0 && (
            <span className="text-xs text-slate-400 line-through font-medium">
              ₹{product?.price.toLocaleString()}
            </span>
          )}
        </div>

        <Button
          onClick={() => handleAddToCart(product?._id, product?.totalStock)}
          disabled={product?.totalStock === 0}
          className="w-full h-12 bg-[#1a4d3e] hover:bg-[#143d31] text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 shadow-lg shadow-green-900/10"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ShoppingProductTile;
