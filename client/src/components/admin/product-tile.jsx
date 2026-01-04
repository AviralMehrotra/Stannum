import { Button } from "../ui/button";
import { Edit2, Trash2, Package } from "lucide-react";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <div className="group relative bg-white rounded-[2rem] border border-slate-100 p-3 transition-all duration-500 hover:shadow-2xl hover:shadow-green-900/5 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-slate-50">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Stock Badge */}
        <div className="absolute top-4 left-4">
          <div
            className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
              product?.totalStock > 0
                ? "bg-[#1a4d3e] text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {product?.totalStock > 0
              ? `${product?.totalStock} in stock`
              : "Out of stock"}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-4 px-2 pb-2">
        <div className="mb-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            {product?.category}
          </p>
          <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
            {product?.title}
          </h3>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
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
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
            variant="outline"
            className="h-11 rounded-xl border-slate-100 hover:bg-slate-50 hover:text-[#1a4d3e] font-bold text-xs gap-2 transition-all"
          >
            <Edit2 className="w-3.5 h-3.5" />
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(product._id)}
            variant="outline"
            className="h-11 rounded-xl border-slate-100 hover:bg-red-50 hover:text-red-500 hover:border-red-100 font-bold text-xs gap-2 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AdminProductTile;
