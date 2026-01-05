import { LogOut, Menu, Search, ShoppingCart, UserCog } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { resetTokenAndCredentials } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";

function MenuItems() {
  const navigate = useNavigate();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col lg:flex-row lg:items-center gap-8">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <button
          key={menuItem.id}
          onClick={() => handleNavigate(menuItem)}
          className="text-sm font-bold text-slate-600 hover:text-[#1a4d3e] transition-colors relative group"
        >
          {menuItem.label}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1a4d3e] transition-all group-hover:w-full" />
        </button>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    navigate("/auth/login");
  }

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      dispatch(fetchCartItems(user?.id));
    }
  }, [dispatch, isAuthenticated, user?.id]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-4">
        <Button
          onClick={() => navigate("/auth/login")}
          variant="ghost"
          className="text-sm font-bold text-slate-600 hover:text-[#1a4d3e] hover:bg-green-50"
        >
          Log in
        </Button>
        <Button
          onClick={() => navigate("/auth/register")}
          className="bg-[#1a4d3e] hover:bg-[#143d31] text-white px-6 rounded-xl font-bold"
        >
          Sign up
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6">
      <button
        onClick={() => navigate("/shop/search")}
        className="text-slate-600 hover:text-[#1a4d3e] transition-colors"
      >
        <Search className="w-5 h-5" />
      </button>

      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <button
          onClick={() => setOpenCartSheet(true)}
          className="relative text-slate-600 hover:text-[#1a4d3e] transition-colors group"
        >
          <ShoppingCart className="w-5 h-5" />
          {cartItems?.items?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#1a4d3e] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border-2 border-white">
              {cartItems.items.length}
            </span>
          )}
        </button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="w-9 h-9 cursor-pointer border-2 border-transparent hover:border-[#1a4d3e] transition-all">
            <AvatarFallback className="bg-slate-100 text-[#1a4d3e] font-bold text-xs">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 mt-2">
          <DropdownMenuLabel className="px-3 py-2">
            <p className="text-xs text-slate-400 font-medium">Signed in as</p>
            <p className="text-sm font-bold text-slate-900 truncate">
              {user?.userName}
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="my-1" />
          <DropdownMenuItem
            onClick={() => navigate("/shop/account")}
            className="rounded-xl cursor-pointer focus:bg-slate-500"
          >
            <UserCog className="mr-2 h-4 w-4 " />
            <span className="font-medium">Account Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-1" />
          <DropdownMenuItem
            onClick={handleLogout}
            className="rounded-xl cursor-pointer focus:bg-red-400 text-red-600"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span className="font-medium">Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-100">
      <div className="container mx-auto h-20 flex items-center justify-between px-4">
        <div className="flex items-center gap-12">
          <Link to="/shop/home" className="flex items-center gap-2 group">
            <span className="text-2xl font-bold tracking-tighter text-slate-900 group-hover:text-[#1a4d3e] transition-colors">
              Stannum.
            </span>
          </Link>
          <div className="hidden lg:block">
            <MenuItems />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <HeaderRightContent />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs p-6">
              <div className="flex flex-col gap-8 mt-8">
                <MenuItems />
                <div className="pt-8 border-t border-slate-100">
                  <HeaderRightContent />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
