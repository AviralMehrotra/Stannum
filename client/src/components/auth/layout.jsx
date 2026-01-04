import { Outlet } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

function AuthLayout() {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex min-h-screen">
        {/* Left side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#1a4d3e] relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-white blur-[120px]" />
          </div>

          <div className="flex flex-col justify-center items-center w-full px-12 relative z-10">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-xl border border-white/20">
                <ShoppingBag className="h-8 w-8 text-white" />
              </div>
              <span className="text-4xl font-bold text-white tracking-tighter">
                Stannum.
              </span>
            </div>
            <div className="max-w-md text-center space-y-6">
              <h1 className="text-5xl font-bold tracking-tight text-white">
                Welcome to Stannum
              </h1>
              <p className="text-xl text-green-100/70 leading-relaxed">
                Your one-stop destination for all your tech needs. Discover
                premium products at unbeatable prices.
              </p>
            </div>
          </div>

          {/* Bottom stats or trust elements */}
          <div className="absolute bottom-12 left-0 w-full px-12 flex justify-between items-center text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">
            <span>Premium Quality</span>
            <span>•</span>
            <span>Secure Checkout</span>
            <span>•</span>
            <span>Fast Delivery</span>
          </div>
        </div>

        {/* Right side - Auth Form */}
        <div className="flex flex-1 flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24 bg-slate-50/50">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
