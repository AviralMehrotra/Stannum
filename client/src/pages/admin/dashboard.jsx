import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { getAllOrdersForAdmin } from "@/store/admin/order-slice";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import {
  ShoppingBasket,
  ShoppingBag,
  ArrowRight,
  TrendingUp,
  Package,
  IndianRupee,
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);
  const { orderList } = useSelector((state) => state.adminOrder);

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  // Calculate real stats
  const totalOrders = orderList?.length || 0;
  const totalSales = useMemo(
    () =>
      orderList?.reduce(
        (sum, order) =>
          order.paymentStatus === "paid" ? sum + order.totalAmount : sum,
        0
      ) || 0,
    [orderList]
  );

  // Process Sales Data for Chart (Last 7 Days)
  const salesChartData = useMemo(() => {
    if (!orderList || orderList.length === 0) return [];

    const last7Days = [...Array(7)]
      .map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split("T")[0];
      })
      .reverse();

    return last7Days.map((date) => {
      const daySales = orderList
        .filter(
          (order) =>
            order.paymentStatus === "paid" &&
            order.orderDate.split("T")[0] === date
        )
        .reduce((sum, order) => sum + order.totalAmount, 0);

      return {
        date: new Date(date).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
        }),
        sales: daySales,
      };
    });
  }, [orderList]);

  // Process Top Products Data
  const topProductsData = useMemo(() => {
    if (!orderList || orderList.length === 0) return [];

    const productCounts = {};
    orderList.forEach((order) => {
      order.cartItems.forEach((item) => {
        productCounts[item.title] =
          (productCounts[item.title] || 0) + item.quantity;
      });
    });

    return Object.keys(productCounts)
      .map((name) => ({ name, value: productCounts[name] }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [orderList]);

  const recentOrders =
    orderList && orderList.length > 0
      ? [...orderList]
          .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
          .slice(0, 5)
      : [];

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
      icon: IndianRupee,
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
          <p className="text-slate-500 text-sm mt-1 font-medium">
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Trend Chart */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-2xl shadow-green-900/5">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-green-50 text-[#1a4d3e]">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Sales Trend</h2>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Last 7 Days
            </span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesChartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 700 }}
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "1rem",
                    border: "none",
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                    fontSize: "12px",
                    fontWeight: "700",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#1a4d3e"
                  strokeWidth={4}
                  dot={{
                    r: 4,
                    fill: "#1a4d3e",
                    strokeWidth: 2,
                    stroke: "#fff",
                  }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products Chart */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-2xl shadow-green-900/5">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <Package className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Top Products</h2>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              By Units Sold
            </span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProductsData} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="#f1f5f9"
                />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#475569", fontSize: 10, fontWeight: 700 }}
                  width={100}
                />
                <Tooltip
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{
                    borderRadius: "1rem",
                    border: "none",
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                    fontSize: "12px",
                    fontWeight: "700",
                  }}
                />
                <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={20}>
                  {topProductsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        ["#1a4d3e", "#2d6a4f", "#40916c", "#52b788", "#74c69d"][
                          index % 5
                        ]
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
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
                {recentOrders && recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-8 py-5 text-sm font-bold text-slate-900 font-mono">
                        #{order._id.slice(-8).toUpperCase()}
                      </td>
                      <td className="px-8 py-5 text-sm text-slate-500 font-medium">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </td>
                      <td className="px-8 py-5">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                            order.orderStatus === "confirmed" ||
                            order.orderStatus === "delivered"
                              ? "bg-green-50 text-green-600"
                              : order.orderStatus === "rejected"
                              ? "bg-red-50 text-red-600"
                              : "bg-orange-50 text-orange-600"
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-sm font-bold text-slate-900">
                        ₹{order.totalAmount.toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-8 py-10 text-center text-slate-400 font-medium"
                    >
                      No recent orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Store Performance */}
        <div className="bg-[#1a4d3e] rounded-[2.5rem] p-8 text-white flex flex-col justify-between shadow-2xl shadow-green-900/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-xl border border-white/10">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Store Performance</h3>
            <p className="text-green-100/70 text-sm leading-relaxed">
              Real-time tracking of your store's growth and sales targets.
            </p>
          </div>

          <div className="mt-12 space-y-6 relative z-10">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-bold text-green-100/50 uppercase tracking-widest mb-1">
                  Sales Target
                </p>
                <p className="text-2xl font-bold">
                  {totalSales > 0
                    ? Math.min(Math.round((totalSales / 100000) * 100), 100)
                    : 0}
                  % Achieved
                </p>
              </div>
              <p className="text-sm font-bold text-green-100/70">
                ₹{totalSales.toLocaleString()} / ₹1,00,000
              </p>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-1000"
                style={{
                  width: `${Math.min((totalSales / 100000) * 100, 100)}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
