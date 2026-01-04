import { useState } from "react";
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
import { ShoppingBag, Eye, Calendar, Clock } from "lucide-react";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Orders Management</h1>
        <p className="text-slate-500 text-sm mt-1">
          Track and manage all customer orders.
        </p>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-green-900/5 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#1a4d3e]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">All Orders</h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <Clock className="w-3.5 h-3.5" />
            Last updated: Just now
          </div>
        </div>

        <div className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent border-slate-100">
                <TableHead className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Order ID
                </TableHead>
                <TableHead className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Date
                </TableHead>
                <TableHead className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Status
                </TableHead>
                <TableHead className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Total Price
                </TableHead>
                <TableHead className="px-8 py-5 text-right">
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-slate-50/50 transition-colors border-slate-100 group">
                <TableCell className="px-8 py-6 font-bold text-slate-900">
                  #123456
                </TableCell>
                <TableCell className="px-8 py-6">
                  <div className="flex items-center gap-2 text-slate-500 font-medium">
                    <Calendar className="w-4 h-4" />
                    01/01/2025
                  </div>
                </TableCell>
                <TableCell className="px-8 py-6">
                  <span className="px-3 py-1 rounded-lg bg-orange-50 text-orange-600 text-[10px] font-bold uppercase tracking-wider">
                    In Process
                  </span>
                </TableCell>
                <TableCell className="px-8 py-6 font-bold text-slate-900 text-lg">
                  ₹2,000
                </TableCell>
                <TableCell className="px-8 py-6 text-right">
                  <Dialog
                    open={openDetailsDialog}
                    onOpenChange={setOpenDetailsDialog}
                  >
                    <Button
                      onClick={() => setOpenDetailsDialog(true)}
                      variant="outline"
                      className="rounded-xl border-slate-200 hover:bg-[#1a4d3e] hover:text-white hover:border-[#1a4d3e] font-bold text-xs gap-2 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View Details
                    </Button>
                    <AdminOrderDetailsView />
                  </Dialog>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default AdminOrdersView;
