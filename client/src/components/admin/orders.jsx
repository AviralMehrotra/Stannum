import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";
import { ShoppingBag, Eye, Calendar, Clock, User } from "lucide-react";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Orders Management
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Track, manage and fulfill customer orders globally.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
          <div className="px-4 py-2 text-center border-r border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Total Orders
            </p>
            <p className="text-xl font-bold text-[#1a4d3e]">
              {orderList?.length || 0}
            </p>
          </div>
          <div className="px-4 py-2 text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Pending
            </p>
            <p className="text-xl font-bold text-amber-600">
              {orderList?.filter((o) => o.orderStatus === "pending").length ||
                0}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-green-900/5 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#1a4d3e] text-white shadow-lg shadow-green-900/10 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Order Registry</h2>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            <Clock className="w-3.5 h-3.5" />
            Live Updates
          </div>
        </div>

        <div className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent border-slate-100">
                <TableHead className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Order ID
                </TableHead>
                <TableHead className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Customer / Date
                </TableHead>
                <TableHead className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Status
                </TableHead>
                <TableHead className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Revenue
                </TableHead>
                <TableHead className="px-8 py-6 text-right">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList && orderList.length > 0 ? (
                orderList.map((orderItem) => (
                  <TableRow
                    key={orderItem._id}
                    className="hover:bg-green-50/30 transition-colors border-slate-50 group"
                  >
                    <TableCell className="px-8 py-6 font-mono text-xs text-slate-400">
                      #{orderItem?._id.slice(-8).toUpperCase()}
                    </TableCell>
                    <TableCell className="px-8 py-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          {orderItem?.addressInfo?.userName || "Customer"}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-medium text-slate-400">
                          <Calendar className="w-3 h-3" />
                          {new Date(orderItem?.orderDate).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-8 py-6">
                      <Badge
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border-none ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-8 py-6 font-bold text-slate-900">
                      ₹{orderItem?.totalAmount.toLocaleString()}
                    </TableCell>
                    <TableCell className="px-8 py-6 text-right">
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() =>
                            handleFetchOrderDetails(orderItem?._id)
                          }
                          variant="ghost"
                          className="rounded-xl gap-2 text-[#1a4d3e] hover:bg-[#1a4d3e] hover:text-white transition-all font-bold text-xs"
                        >
                          <Eye className="w-4 h-4" />
                          Manage
                        </Button>
                        <AdminOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="py-32 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-200">
                        <ShoppingBag className="w-10 h-10" />
                      </div>
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                        No orders found in registry
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default AdminOrdersView;
