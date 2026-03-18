import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCompare, clearCompare } from "@/store/shop/compare-slice";
import { X, GitCompareArrows } from "lucide-react";
import { Button } from "@/components/ui/button";

function CompareBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { compareItems } = useSelector((state) => state.shopCompare);

  // Only show when at least 1 product is selected
  if (compareItems.length === 0) return null;

  const canCompare = compareItems.length >= 2;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ease-out ${
        compareItems.length > 0 ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {/* Backdrop blur bar */}
      <div className="bg-white/90 backdrop-blur-xl border-t border-slate-100 shadow-2xl shadow-black/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Icon + label */}
            <div className="flex items-center gap-2 text-[#1a4d3e] flex-shrink-0">
              <GitCompareArrows className="w-5 h-5" />
              <span className="text-sm font-bold hidden sm:block">
                Compare ({compareItems.length}/3)
              </span>
            </div>

            {/* Product chips */}
            <div className="flex items-center gap-3 flex-1 flex-wrap">
              {compareItems.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-2xl pl-1 pr-2 py-1 group"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-9 h-9 rounded-xl object-cover flex-shrink-0"
                  />
                  <span className="text-xs font-bold text-slate-700 max-w-[80px] sm:max-w-[120px] truncate">
                    {product.title}
                  </span>
                  <button
                    onClick={() => dispatch(removeFromCompare(product._id))}
                    className="w-5 h-5 rounded-full bg-slate-200 hover:bg-red-100 hover:text-red-500 flex items-center justify-center text-slate-400 transition-colors flex-shrink-0"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {/* Empty slots */}
              {Array.from({ length: 3 - compareItems.length }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="w-9 h-9 rounded-xl border-2 border-dashed border-slate-200 flex-shrink-0"
                />
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => dispatch(clearCompare())}
                className="text-xs font-bold text-slate-400 hover:text-red-400 transition-colors"
              >
                Clear All
              </button>
              <Button
                onClick={() => navigate("/shop/compare")}
                disabled={!canCompare}
                className="h-11 px-6 bg-[#1a4d3e] hover:bg-[#143d31] text-white rounded-2xl font-bold shadow-lg shadow-green-900/10 transition-all active:scale-95 disabled:opacity-40 disabled:active:scale-100 flex items-center gap-2"
              >
                <GitCompareArrows className="w-4 h-4" />
                {canCompare ? "Compare Now" : "Select 1 more"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompareBar;
