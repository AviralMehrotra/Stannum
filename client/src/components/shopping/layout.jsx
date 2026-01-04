import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import ShoppingFooter from "./footer";

function ShoppingLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Common Header */}
      <ShoppingHeader />
      <main className="flex-grow flex flex-col w-full">
        <Outlet />
      </main>
      {/* Common Footer */}
      <ShoppingFooter />
    </div>
  );
}

export default ShoppingLayout;
