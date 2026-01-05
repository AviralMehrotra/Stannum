import { Badge } from "../ui/badge";
import { DialogContent, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { useSelector } from "react-redux";
import { ShoppingBag, MapPin, CreditCard, Calendar } from "lucide-react";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent className="p-0 border-none max-w-[95vw] sm:max-w-[80vw] lg:max-w-[700px] bg-white rounded-[2.5rem] overflow-hidden shadow-2xl">
      <div className="flex flex-col h-full max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#1a4d3e] p-8 lg:p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-xl border border-white/20">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold tracking-tight">
                  Order Details
                </DialogTitle>
                <p className="text-green-100/60 text-xs font-bold uppercase tracking-widest mt-1">
                  ID: {orderDetails?._id}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-10 space-y-10">
          {/* Status & Date */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-400">
                <Calendar className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Order Date
                </span>
              </div>
              <p className="text-sm font-bold text-slate-900">
                {new Date(orderDetails?.orderDate).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-400">
                <div className="w-4 h-4 rounded-full border-2 border-slate-200" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Status
                </span>
              </div>
              <Badge
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border-none ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </div>
          </div>

          <Separator className="bg-slate-100" />

          {/* Items */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Items Ordered
            </h3>
            <div className="space-y-4">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-slate-50 p-2 flex-shrink-0 border border-slate-100 group-hover:border-green-200 transition-colors">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-slate-500 font-medium">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-900">
                          ₹{item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                : null}
            </div>
            <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
              <span className="text-sm font-bold text-slate-900">
                Total Amount
              </span>
              <span className="text-xl font-bold text-[#1a4d3e]">
                ₹{orderDetails?.totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          <Separator className="bg-slate-100" />

          {/* Shipping & Payment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4" />
                <h3 className="text-[10px] font-bold uppercase tracking-widest">
                  Shipping To
                </h3>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-900">
                  {user?.userName}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {orderDetails?.addressInfo?.address}
                  <br />
                  {orderDetails?.addressInfo?.city} -{" "}
                  {orderDetails?.addressInfo?.pincode}
                  <br />
                  Phone: {orderDetails?.addressInfo?.phone}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-400">
                <CreditCard className="w-4 h-4" />
                <h3 className="text-[10px] font-bold uppercase tracking-widest">
                  Payment Info
                </h3>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-900 capitalize">
                  {orderDetails?.paymentMethod}
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  Status:
                  <span className="ml-1 text-green-600 font-bold uppercase text-[9px] tracking-widest">
                    {orderDetails?.paymentStatus}
                  </span>
                </p>
                {orderDetails?.paymentId && (
                  <p className="text-[10px] text-slate-400 font-mono mt-2">
                    Ref: {orderDetails?.paymentId}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex items-center justify-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
            Stannum. Premium Tech Store
          </p>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
