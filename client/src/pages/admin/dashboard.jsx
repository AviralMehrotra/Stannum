import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  ShoppingBasket,
  ShoppingBag,
  BarChart2,
  ArrowRight,
  TrendingUp,
  Users,
  DollarSign,
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();
  const { productList } = useSelector((state) => state.adminProducts);

  // Dummy data for orders and sales
  const totalOrders = 12;
  const totalSales = 24500;
  const recentOrders = [
    {
      id: "ORD-001",
      date: "2024-06-01",
      status: "Delivered",
      price: 2000,
    },
    {
      id: "ORD-002",
      date: "2024-05-29",
      status: "In Process",
      price: 1500,
    },
    {
      id: "ORD-003",
      date: "2024-05-28",
      status: "Pending",
      price: 3000,
    },
  ];

  const stats = [
    {
      label: "Total Products",
      value: productList ? productList.length : 0,
      icon: ShoppingBasket,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      label: "Total Sales",
      value: `₹${totalSales.toLocaleString()}`,
      icon: DollarSign,
      color: "text-[#1a4d3e]",
      bg: "bg-green-50",
    },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => navigate("/admin/products")}
            variant="outline"
            className="rounded-xl border-slate-200 font-bold h-11 px-5 transition-all"
          >
            Manage Products
          </Button>
          <Button
            onClick={() => navigate("/admin/orders")}
            className="bg-[#1a4d3e] hover:bg-[#143d31] text-white rounded-xl font-bold h-11 px-5 shadow-lg shadow-green-900/10 transition-all active:scale-95"
          >
            Manage Orders
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-xl shadow-green-900/5 flex items-center gap-5"
          >
            <div
              className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}
            >
              <stat.icon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-green-900/5 overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Recent Orders</h2>
            <button
              onClick={() => navigate("/admin/orders")}
              className="text-xs font-bold text-[#1a4d3e] hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Order ID
                  </th>
                  <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Date
                  </th>
                  <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-8 py-5 text-sm font-bold text-slate-900">
                      {order.id}
                    </td>
                    <td className="px-8 py-5 text-sm text-slate-500 font-medium">
                      {order.date}
                    </td>
                    <td className="px-8 py-5">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                          order.status === "Delivered"
                            ? "bg-green-50 text-green-600"
                            : order.status === "In Process"
                            ? "bg-orange-50 text-orange-600"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm font-bold text-slate-900">
                      ₹{order.price.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Store Performance */}
        <div className="bg-[#1a4d3e] rounded-[2.5rem] p-8 text-white flex flex-col justify-between shadow-2xl shadow-green-900/20">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Store Performance</h3>
            <p className="text-green-100/70 text-sm leading-relaxed">
              Your store's performance is up by 12% compared to last month. Keep
              it up!
            </p>
          </div>

          <div className="mt-12 space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-bold text-green-100/50 uppercase tracking-widest mb-1">
                  Monthly Goal
                </p>
                <p className="text-2xl font-bold">75% Achieved</p>
              </div>
              <p className="text-sm font-bold text-green-100/70">
                ₹32,000 / ₹45,000
              </p>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full"
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
