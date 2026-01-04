import { AlignLeft, LogOut, Bell } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { resetTokenAndCredentials } from "@/store/auth-slice";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "../ui/avatar";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  function handleLogout() {
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    navigate("/auth/login");
  }

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 h-20 bg-white/80 backdrop-blur-xl border-b border-slate-100">
      <div className="flex items-center gap-4">
        <Button
          onClick={() => setOpen(true)}
          variant="ghost"
          size="icon"
          className="lg:hidden rounded-xl hover:bg-slate-50"
        >
          <AlignLeft className="w-5 h-5 text-slate-600" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <div className="hidden md:block">
          <h2 className="text-sm font-bold text-slate-900">
            Welcome back, {user?.userName}
          </h2>
          <p className="text-[11px] text-slate-400 font-medium">
            Manage your store and orders here.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#1a4d3e] hover:bg-slate-100 transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-[1px] bg-slate-100 mx-2"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-900">{user?.userName}</p>
            <p className="text-[10px] text-slate-400 font-medium capitalize">
              {user?.role || "Admin"}
            </p>
          </div>
          <Avatar className="w-9 h-9 border-2 border-transparent">
            <AvatarFallback className="bg-[#1a4d3e] text-white font-bold text-xs">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Button
            onClick={handleLogout}
            variant="ghost"
            size="icon"
            className="rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
