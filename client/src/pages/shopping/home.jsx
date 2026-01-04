import Hero from "@/components/shopping/hero";
import GuidedEntry from "@/components/shopping/guided-entry";
import CategoryGrid from "@/components/shopping/category-grid";
import PopularProducts from "@/components/shopping/popular-products";
import TopPicks from "@/components/shopping/top-picks";
import BrandRow from "@/components/shopping/brand-row";
import TrustSection from "@/components/shopping/trust-section";
import Newsletter from "@/components/shopping/newsletter";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import ProductDetailsDialog from "@/components/shopping/product-details";
import { useNavigate } from "react-router-dom";
import apple from "../../assets/icons/apple.png";
import bose from "../../assets/icons/bose.png";
import dell from "../../assets/icons/dell.png";
import hp from "../../assets/icons/hp.png";
import jbl from "../../assets/icons/jbl.png";
import lenovo from "../../assets/icons/lenovo.png";
import oneplus from "../../assets/icons/oneplus.png";
import samsung from "../../assets/icons/samsung.png";
import sony from "../../assets/icons/sony.png";
import xiaomi from "../../assets/icons/xiaomi.png";
import {
  Smartphone,
  Laptop,
  Headphones,
  Tablet,
  Gamepad2,
  Speaker,
  Watch,
} from "lucide-react";

const categoriesWithIcon = [
  {
    id: "smartphones",
    label: "Smartphones",
    icon: Smartphone,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: "laptops",
    label: "Laptops",
    icon: Laptop,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: "headphones",
    label: "Headphones",
    icon: Headphones,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: "earphones",
    label: "Earphones",
    icon: Headphones,
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: "smartwatches",
    label: "Smartwatches",
    icon: Watch,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: "tablets",
    label: "Tablets",
    icon: Tablet,
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: "gaming",
    label: "Gaming",
    icon: Gamepad2,
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: "audio",
    label: "Audio",
    icon: Speaker,
    image:
      "https://images.unsplash.com/photo-1558403194-611308249627?auto=format&fit=crop&q=80&w=300&h=200",
  },
];

const brandsWithIcon = [
  { id: "apple", label: "Apple", icon: apple, isImage: true },
  { id: "samsung", label: "Samsung", icon: samsung, isImage: true },
  { id: "sony", label: "Sony", icon: sony, isImage: true },
  { id: "bose", label: "Bose", icon: bose, isImage: true },
  { id: "dell", label: "Dell", icon: dell, isImage: true },
  { id: "hp", label: "HP", icon: hp, isImage: true },
  { id: "lenovo", label: "Lenovo", icon: lenovo, isImage: true },
  { id: "xiaomi", label: "Xiaomi", icon: xiaomi, isImage: true },
  { id: "oneplus", label: "OnePlus", icon: oneplus, isImage: true },
  { id: "jbl", label: "JBL", icon: jbl, isImage: true },
];

function ShoppingHome() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );

  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "title-atoz",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Hero />
      <GuidedEntry />
      <CategoryGrid
        categories={categoriesWithIcon}
        handleNavigateToListingPage={handleNavigateToListingPage}
      />
      <PopularProducts
        productList={productList}
        handleGetProductDetails={handleGetProductDetails}
        handleAddToCart={handleAddToCart}
      />
      <TopPicks
        productList={productList}
        handleGetProductDetails={handleGetProductDetails}
        handleAddToCart={handleAddToCart}
      />
      <BrandRow
        brands={brandsWithIcon}
        handleNavigateToListingPage={handleNavigateToListingPage}
      />
      <TrustSection />
      <Newsletter />

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
