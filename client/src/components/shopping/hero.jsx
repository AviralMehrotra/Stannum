import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, ShoppingBag, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden bg-gradient-to-b from-green-50/50 to-white">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-6 animate-fade-in">
          <Star className="w-4 h-4 fill-current" />
          <span>700+ tech enthusiasts with us</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight mb-6 max-w-4xl mx-auto leading-[1.1]">
          Find the right tech, <br />
          <span className="text-green-800">without the confusion</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          The tech world moves fast. We're here to help you find the perfect
          devices for your studies, work, and everything in between.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button
            onClick={() => navigate("/shop/search")}
            className="bg-[#1a4d3e] hover:bg-[#143d31] text-white px-8 py-6 text-lg rounded-xl flex items-center gap-2 transition-all hover:scale-105"
          >
            Find your perfect match
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/shop/listing")}
            className="border-slate-200 text-slate-700 px-8 py-6 text-lg rounded-xl hover:bg-[#1a4d3e] hover:text-white hover:border-[#1a4d3e] transition-all"
          >
            Browse all products
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-slate-500 font-medium border-t border-slate-100 pt-12">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-green-700" />
            <span>All brands</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-green-700" />
            <span>100+ Products</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-700" />
            <span>100% Secure</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
