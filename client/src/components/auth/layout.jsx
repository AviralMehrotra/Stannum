import { Outlet } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

function AuthLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        {/* Left side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700">
          <div className="flex flex-col justify-center items-center w-full px-12">
            <div className="flex items-center space-x-3 mb-8">
              <ShoppingBag className="h-10 w-10 text-white" />
              <span className="text-3xl font-bold text-white">Stannum</span>
            </div>
            <div className="max-w-md text-center space-y-6">
              <h1 className="text-4xl font-extrabold tracking-tight text-white">
                Welcome to Stannum
              </h1>
              <p className="text-lg text-blue-100">
                Your one-stop destination for all your tech needs.
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Auth Form */}
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
