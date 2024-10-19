import { Outlet } from "react-router-dom";
import ShooppingHeader from "./header";

function ShoppingLayout() {
  return (
    <div className="flex flex-col overflow-hidden">
      {/* Common Header */}
      <ShooppingHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default ShoppingLayout;
