function BrandRow({ brands, handleNavigateToListingPage }) {
  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Shop by brand
          </h2>
          <p className="text-slate-500">
            We partner with the world's leading tech brands.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60 hover:opacity-100 transition-opacity duration-500">
          {brands.map((brand) => (
            <div
              key={brand.id}
              onClick={() => handleNavigateToListingPage(brand, "brand")}
              className="w-24 h-12 md:w-32 md:h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
            >
              {brand.isImage ? (
                <img
                  src={brand.icon}
                  alt={brand.label}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <brand.icon className="w-12 h-12 text-slate-400" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BrandRow;
