import { Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingBasket,
  ChevronRight,
  LogOut,
  Settings,
  HelpCircle,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSiderbarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icons: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icons: <ShoppingBasket className="w-5 h-5" />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icons: <ShoppingBag className="w-5 h-5" />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="mt-8 flex flex-col gap-2">
      {adminSiderbarMenuItems.map((menuItem) => {
        const isActive = location.pathname === menuItem.path;
        return (
          <button
            key={menuItem.id}
            onClick={() => {
              navigate(menuItem.path);
              setOpen ? setOpen(false) : null;
            }}
            className={`flex items-center justify-between group px-4 py-3.5 rounded-2xl transition-all duration-300 ${
              isActive
                ? "bg-[#1a4d3e] text-white shadow-xl shadow-green-900/20 translate-x-1"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`${
                  isActive
                    ? "text-white"
                    : "text-slate-400 group-hover:text-[#1a4d3e]"
                } transition-colors`}
              >
                {menuItem.icons}
              </span>
              <span className="font-bold text-sm tracking-tight">
                {menuItem.label}
              </span>
            </div>
            {isActive && <ChevronRight className="w-4 h-4 opacity-50" />}
          </button>
        );
      })}
    </nav>
  );
}

function AdminSidebar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="w-72 p-0 border-r border-slate-100 bg-white"
        >
          <div className="flex flex-col h-full p-6">
            <SheetHeader className="pb-6 border-b border-slate-100">
              <SheetTitle className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-[#1a4d3e] flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tighter text-slate-900">
                  Stannum.
                </span>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden lg:flex w-72 flex-col border-r border-slate-100 bg-white p-6 h-screen sticky top-0">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-3 cursor-pointer group mb-10 px-2"
        >
          <div className="w-10 h-10 rounded-xl bg-[#1a4d3e] flex items-center justify-center shadow-lg shadow-green-900/20 group-hover:scale-110 transition-transform">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tighter text-slate-900">
              Stannum.
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Admin Panel
            </span>
          </div>
        </div>

        <div className="flex-1">
          <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
            Main Menu
          </p>
          <MenuItems />
        </div>

        <div className="space-y-6">
          <div className="p-5 rounded-[2rem] bg-slate-50 border border-slate-100 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-[#1a4d3e]/5 rounded-full blur-2xl group-hover:bg-[#1a4d3e]/10 transition-colors" />
            <div className="relative z-10">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center mb-3 shadow-sm">
                <HelpCircle className="w-4 h-4 text-[#1a4d3e]" />
              </div>
              <p className="text-xs font-bold text-slate-900 mb-1">
                Need help?
              </p>
              <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                Check our documentation for admin guides.
              </p>
              <button className="text-[11px] font-bold text-[#1a4d3e] hover:underline flex items-center gap-1">
                View Docs <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300 font-bold text-sm">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </Fragment>
  );
}

export default AdminSidebar;
