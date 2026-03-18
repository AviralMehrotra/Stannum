import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import ShoppingFooter from "./footer";
import CompareBar from "./CompareBar";

function ShoppingLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Common Header */}
      <ShoppingHeader />
      <main className="flex-grow flex flex-col w-full pb-safe">
        <Outlet />
      </main>
      {/* Common Footer */}
      <ShoppingFooter />
      {/* Floating Compare Bar */}
      <CompareBar />
    </div>
  );
}

export default ShoppingLayout;
