import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../assets/account.jpg";
import Address from "@/components/shopping/address";
import ShoppingOrders from "@/components/shopping/orders";
import { User, MapPin, ShoppingBag, ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";

function ShoppingAccounts() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Hero Header */}
      <div className="relative h-[350px] w-full overflow-hidden">
        <img
          src={accImg}
          alt="Account Banner"
          className="h-full w-full object-cover object-center brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-4">
          <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center backdrop-blur-xl border border-white/20 mb-2">
            <User className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold tracking-tight">My Account</h1>
          <div className="flex items-center gap-2 text-sm font-medium text-white/80">
            <span>Home</span>
            <ArrowRight className="w-4 h-4" />
            <span className="text-white">Profile</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-10 pb-20">
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-green-900/5 border border-slate-100 overflow-hidden">
          <Tabs defaultValue="orders" className="w-full">
            <div className="border-b border-slate-100 bg-slate-50/50 px-8 pt-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Welcome back, {user?.userName}!
                  </h2>
                  <p className="text-slate-500 text-sm mt-1">
                    Manage your orders and shipping addresses here.
                  </p>
                </div>
                <TabsList className="bg-white p-1.5 rounded-2xl border border-slate-200 h-auto gap-1">
                  <TabsTrigger
                    value="orders"
                    className="rounded-xl px-6 py-2.5 data-[state=active]:bg-[#1a4d3e] data-[state=active]:text-white transition-all flex items-center gap-2 font-bold text-xs uppercase tracking-widest"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Orders
                  </TabsTrigger>
                  <TabsTrigger
                    value="address"
                    className="rounded-xl px-6 py-2.5 data-[state=active]:bg-[#1a4d3e] data-[state=active]:text-white transition-all flex items-center gap-2 font-bold text-xs uppercase tracking-widest"
                  >
                    <MapPin className="w-4 h-4" />
                    Addresses
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <div className="p-8 lg:p-12">
              <TabsContent value="orders" className="mt-0 focus-visible:ring-0">
                <ShoppingOrders />
              </TabsContent>
              <TabsContent
                value="address"
                className="mt-0 focus-visible:ring-0"
              >
                <Address />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccounts;
