import { ShoppingCart } from "lucide-react";

function PopularProducts({
  productList,
  handleGetProductDetails,
  handleAddToCart,
}) {
  // Limit to top 4 products for this section
  const displayProducts = productList?.slice(0, 4) || [];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🔥</span>
              <h2 className="text-3xl font-bold text-slate-900">
                Popular this week
              </h2>
            </div>
            <p className="text-slate-500">Our most loved products this week.</p>
          </div>
          <button className="text-green-800 font-semibold hover:underline">
            View all
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product, index) => (
            <div
              key={product?._id}
              className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500"
            >
              <div
                className="relative aspect-square overflow-hidden bg-slate-50 cursor-pointer"
                onClick={() => handleGetProductDetails(product?._id)}
              >
                <div className="absolute top-4 left-4 z-10 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <img
                  src={product?.image}
                  alt={product?.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  {product?.category}
                </p>
                <h3
                  className="text-lg font-bold text-slate-900 mb-2 group-hover:text-green-800 transition-colors cursor-pointer truncate"
                  onClick={() => handleGetProductDetails(product?._id)}
                  title={product?.title}
                >
                  {product?.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-slate-900">
                    ₹
                    {product?.salePrice > 0
                      ? product?.salePrice
                      : product?.price}
                  </span>
                  <button
                    className="p-3 rounded-xl bg-slate-50 text-slate-900 hover:bg-[#1a4d3e] hover:text-white transition-all duration-300"
                    onClick={() =>
                      handleAddToCart(product?._id, product?.totalStock)
                    }
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularProducts;
