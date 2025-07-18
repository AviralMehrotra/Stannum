import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShoppingBasket, ShoppingBag, BarChart2 } from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();
  const { productList } = useSelector((state) => state.adminProducts);

  // Dummy data for orders and sales
  const totalOrders = 12; // Replace with real data when available
  const totalSales = 24500; // Replace with real data when available
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

  return (
    <div className="flex flex-col gap-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex flex-row items-center gap-4 p-4">
          <ShoppingBasket className="w-10 h-10 text-primary" />
          <div>
            <CardTitle className="text-lg">Total Products</CardTitle>
            <CardContent className="p-0 text-2xl font-bold">
              {productList ? productList.length : 0}
            </CardContent>
          </div>
        </Card>
        <Card className="flex flex-row items-center gap-4 p-4">
          <ShoppingBag className="w-10 h-10 text-primary" />
          <div>
            <CardTitle className="text-lg">Total Orders</CardTitle>
            <CardContent className="p-0 text-2xl font-bold">
              {totalOrders}
            </CardContent>
          </div>
        </Card>
        <Card className="flex flex-row items-center gap-4 p-4">
          <BarChart2 className="w-10 h-10 text-primary" />
          <div>
            <CardTitle className="text-lg">Total Sales</CardTitle>
            <CardContent className="p-0 text-2xl font-bold">
              ₹{totalSales}
            </CardContent>
          </div>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="flex gap-4">
        <Button onClick={() => navigate("/admin/products")}>Manage Products</Button>
        <Button onClick={() => navigate("/admin/orders")}>Manage Orders</Button>
      </div>

      {/* Recent Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-4 py-2 whitespace-nowrap">{order.id}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{order.date}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{order.status}</td>
                    <td className="px-4 py-2 whitespace-nowrap">₹{order.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDashboard;
