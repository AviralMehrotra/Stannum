import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { clearCompare, removeFromCompare } from "@/store/shop/compare-slice";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  ArrowLeft,
  X,
  CheckCircle2,
  XCircle,
} from "lucide-react";

/**
 * Extract a markdown section's bullet lines by heading name.
 * e.g. extractSection("## Pros\n- Fast\n- Light\n## Cons\n...", "Pros") => ["Fast","Light"]
 */
function extractSection(markdown, heading) {
  if (!markdown) return [];
  const regex = new RegExp(`##\\s*${heading}[\\s\\S]*?(?=\\n##|$)`, "i");
  const match = markdown.match(regex);
  if (!match) return [];
  const lines = match[0]
    .split("\n")
    .slice(1) // drop the heading line
    .map((l) => l.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean);
  return lines;
}

function CompareColumn({ product, onRemove, onAddToCart }) {
  const price = product.salePrice > 0 ? product.salePrice : product.price;
  const specs = extractSection(product.description, "Key Specifications");
  const pros = extractSection(product.description, "Pros");
  const cons = extractSection(product.description, "Cons");
  const overview = (() => {
    if (!product.description) return "";
    const regex = /##\s*Product Overview[\s\S]*?(?=\n##|$)/i;
    const match = product.description.match(regex);
    if (!match) return "";
    return match[0].split("\n").slice(1).join(" ").trim();
  })();

  return (
    <div className="flex flex-col bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden min-w-0">
      {/* Remove button */}
      <div className="flex justify-end p-3 pb-0">
        <button
          onClick={() => onRemove(product._id)}
          className="w-7 h-7 rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors text-slate-400"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Image */}
      <div className="px-6 pb-4">
        <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Title & Badges */}
      <div className="px-6 pb-4 space-y-2">
        <div className="flex flex-wrap gap-1.5">
          <Badge
            variant="outline"
            className="text-[10px] font-bold uppercase tracking-widest border-slate-200 text-slate-400 rounded-full"
          >
            {product.category}
          </Badge>
          <Badge
            variant="outline"
            className="text-[10px] font-bold uppercase tracking-widest border-slate-200 text-slate-400 rounded-full"
          >
            {product.brand}
          </Badge>
          {product.totalStock === 0 && (
            <Badge className="text-[10px] font-bold uppercase tracking-widest bg-red-100 text-red-600 border-none rounded-full">
              Out of Stock
            </Badge>
          )}
        </div>
        <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
          {product.title}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-slate-900">
            ₹{price.toLocaleString()}
          </span>
          {product.salePrice > 0 && (
            <span className="text-sm text-slate-400 line-through">
              ₹{product.price.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* Add to Cart */}
      <div className="px-6 pb-6">
        <Button
          onClick={() => onAddToCart(product._id, product.totalStock)}
          disabled={product.totalStock === 0}
          className="w-full h-11 bg-[#1a4d3e] hover:bg-[#143d31] text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-green-900/10"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </Button>
      </div>

      {/* Overview */}
      <CompareSection label="Overview">
        <p className="text-sm text-slate-600 leading-relaxed">
          {overview || <span className="text-slate-300 italic">—</span>}
        </p>
      </CompareSection>

      {/* Specs */}
      <CompareSection label="Key Specifications">
        {specs.length > 0 ? (
          <ul className="space-y-1.5">
            {specs.map((s, i) => (
              <li key={i} className="text-sm text-slate-600 flex gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1a4d3e] flex-shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-slate-300 italic text-sm">
            No specs available
          </span>
        )}
      </CompareSection>

      {/* Pros */}
      <CompareSection label="Pros">
        {pros.length > 0 ? (
          <ul className="space-y-1.5">
            {pros.map((p, i) => (
              <li
                key={i}
                className="text-sm text-slate-600 flex gap-2 items-start"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                {p}
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-slate-300 italic text-sm">No pros listed</span>
        )}
      </CompareSection>

      {/* Cons */}
      <CompareSection label="Cons">
        {cons.length > 0 ? (
          <ul className="space-y-1.5">
            {cons.map((c, i) => (
              <li
                key={i}
                className="text-sm text-slate-600 flex gap-2 items-start"
              >
                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                {c}
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-slate-300 italic text-sm">No cons listed</span>
        )}
      </CompareSection>
    </div>
  );
}

function CompareSection({ label, children }) {
  return (
    <div className="border-t border-slate-50 px-6 py-5">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
        {label}
      </p>
      {children}
    </div>
  );
}

function CompareProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { compareItems } = useSelector((state) => state.shopCompare);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  function handleRemove(productId) {
    dispatch(removeFromCompare(productId));
  }

  function handleClearAll() {
    dispatch(clearCompare());
    navigate("/shop/listing");
  }

  function handleAddToCart(productId, totalStock) {
    const getCartItems = cartItems?.items || [];
    const existing = getCartItems.find((item) => item.productId === productId);
    if (existing && existing.quantity + 1 > totalStock) {
      toast({
        title: `Only ${existing.quantity} can be added`,
        variant: "destructive",
      });
      return;
    }
    dispatch(addToCart({ userId: user?.id, productId, quantity: 1 })).then(
      (data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?.id));
          toast({ title: "Product added to cart" });
        }
      },
    );
  }

  if (compareItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center gap-6 text-center px-4">
        <div className="w-24 h-24 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm">
          <ShoppingCart className="w-10 h-10 text-slate-300" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Nothing to compare
          </h2>
          <p className="text-slate-500 text-sm">
            Select products from the listing page to compare them here.
          </p>
        </div>
        <Button
          onClick={() => navigate("/shop/listing")}
          className="bg-[#1a4d3e] hover:bg-[#143d31] text-white rounded-2xl font-bold h-12 px-8 shadow-lg shadow-green-900/10"
        >
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-500 hover:text-[#1a4d3e] hover:border-[#1a4d3e]/20 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Compare Products
              </h1>
              <p className="text-slate-500 text-sm mt-0.5">
                Comparing {compareItems.length} product
                {compareItems.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <button
            onClick={handleClearAll}
            className="text-sm font-bold text-red-400 hover:text-red-500 transition-colors"
          >
            Clear All
          </button>
        </div>

        {/* Columns */}
        <div
          className={`grid gap-6 ${
            compareItems.length === 3
              ? "grid-cols-1 md:grid-cols-3"
              : compareItems.length === 2
                ? "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto"
                : "grid-cols-1 max-w-sm mx-auto"
          }`}
        >
          {compareItems.map((product) => (
            <CompareColumn
              key={product._id}
              product={product}
              onRemove={handleRemove}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CompareProducts;
