function CategoryGrid({ categories, handleNavigateToListingPage }) {
  return (
    <section className="py-20 bg-slate-50/50">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Shop by category
            </h2>
            <p className="text-slate-500">
              Explore our wide range of tech categories.
            </p>
          </div>
          <button className="text-green-800 font-semibold hover:underline">
            View all categories
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleNavigateToListingPage(category, "category")}
              className="group relative h-48 md:h-64 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={
                  category.image ||
                  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=300&h=200"
                }
                alt={category.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-white text-xl font-bold mb-1 transform transition-transform duration-500 group-hover:-translate-y-1">
                  {category.label}
                </h3>
                <p className="text-white/70 text-sm transform transition-transform duration-500 group-hover:-translate-y-1">
                  Explore Products
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryGrid;
