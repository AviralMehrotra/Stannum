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
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";
import { ShoppingBag, Eye, Clock } from "lucide-react";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <Card className="border-none shadow-2xl shadow-green-900/5 rounded-[2.5rem] overflow-hidden bg-white">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#1a4d3e] text-white shadow-lg shadow-green-900/10">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900">
            Order History
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/30">
              <TableRow className="hover:bg-transparent border-slate-100">
                <TableHead className="w-[150px] py-6 px-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Order ID
                </TableHead>
                <TableHead className="py-6 px-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Date
                </TableHead>
                <TableHead className="py-6 px-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Status
                </TableHead>
                <TableHead className="py-6 px-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Amount
                </TableHead>
                <TableHead className="py-6 px-8 text-right text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList && orderList.length > 0 ? (
                orderList.map((orderItem) => (
                  <TableRow
                    key={orderItem._id}
                    className="group hover:bg-green-50/30 transition-colors border-slate-50"
                  >
                    <TableCell className="py-6 px-8 font-mono text-xs text-slate-500">
                      {orderItem?._id}
                    </TableCell>
                    <TableCell className="py-6 px-8">
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {new Date(orderItem?.orderDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="py-6 px-8">
                      <Badge
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border-none  ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                            : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-6 px-8">
                      <span className="text-sm font-bold text-slate-900">
                        ₹{orderItem?.totalAmount.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell className="py-6 px-8 text-right">
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
                          View Details
                        </Button>
                        <ShoppingOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-200">
                        <ShoppingBag className="w-8 h-8" />
                      </div>
                      <p className="text-slate-400 font-medium">
                        No orders found yet.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;
