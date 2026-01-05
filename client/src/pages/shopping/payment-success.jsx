import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-none shadow-2xl shadow-green-900/5 rounded-[3rem] overflow-hidden bg-white">
        <div className="h-3 bg-[#1a4d3e]" />
        <CardHeader className="pt-12 pb-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-25" />
              <div className="relative w-20 h-20 rounded-full bg-green-50 flex items-center justify-center text-[#1a4d3e]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-slate-900 tracking-tight">
            Order Confirmed!
          </CardTitle>
          <p className="text-slate-500 font-medium mt-2">
            Thank you for your purchase. Your payment was successful.
          </p>
        </CardHeader>
        <CardContent className="px-8 pb-12 space-y-6">
          <div className="bg-slate-50 rounded-2xl p-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                Order Status
              </span>
              <span className="text-[#1a4d3e] font-bold">Processing</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                Payment Method
              </span>
              <span className="text-slate-900 font-bold">Razorpay</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => navigate("/shop/account")}
              className="w-full h-14 bg-[#1a4d3e] hover:bg-[#143d31] text-white rounded-2xl font-bold text-lg shadow-lg shadow-green-900/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              View Orders
              <ShoppingBag className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/shop/home")}
              className="w-full h-14 border-slate-200 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Continue Shopping
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
            Stannum. Premium Tech Store
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default PaymentSuccessPage;
