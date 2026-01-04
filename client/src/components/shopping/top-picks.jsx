import { ShoppingCart, Star } from "lucide-react";

function TopPicks({ productList, handleGetProductDetails, handleAddToCart }) {
  // Use products from index 4 onwards for this section
  const displayProducts = productList?.slice(4, 10) || [];

  return (
    <section className="py-20 bg-slate-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Our top picks
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Carefully selected tech for every need, from students to
            professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProducts.map((product) => (
            <div
              key={product?._id}
              className="group bg-white rounded-[2.5rem] p-4 border border-slate-100 hover:shadow-2xl hover:shadow-green-900/5 transition-all duration-500"
            >
              <div
                className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-slate-50 mb-6 cursor-pointer"
                onClick={() => handleGetProductDetails(product?._id)}
              >
                {product?.salePrice > 0 && (
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/90 backdrop-blur-sm text-green-800 rounded-full text-xs font-bold shadow-sm">
                    Sale
                  </div>
                )}
                <img
                  src={product?.image}
                  alt={product?.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="px-4 pb-4">
                <div className="flex items-center gap-1 text-orange-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                  <span className="text-slate-400 text-xs ml-1 font-medium">
                    (4.8)
                  </span>
                </div>
                <p className="text-slate-400 text-xs font-semibold mb-1 uppercase tracking-wider">
                  {product?.brand}
                </p>
                <h3
                  className="text-xl font-bold text-slate-900 mb-4 group-hover:text-green-800 transition-colors cursor-pointer truncate"
                  onClick={() => handleGetProductDetails(product?._id)}
                  title={product?.title}
                >
                  {product?.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-slate-900">
                    ₹
                    {product?.salePrice > 0
                      ? product?.salePrice
                      : product?.price}
                  </span>
                  <button
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#1a4d3e] text-white font-bold hover:bg-[#143d31] transition-all hover:scale-105"
                    onClick={() =>
                      handleAddToCart(product?._id, product?.totalStock)
                    }
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-10 py-4 rounded-2xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all">
            Browse more top picks
          </button>
        </div>
      </div>
    </section>
  );
}

export default TopPicks;
