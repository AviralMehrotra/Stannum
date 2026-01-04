import ProductImageUpload from "@/components/admin/image-upload";
import AdminProductTile from "@/components/admin/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Package, Sparkles } from "lucide-react";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
            toast({
              title: "Product updated successfully",
            });
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductsDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast({
              title: "Product added successfully",
            });
          }
        });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        toast({
          title: "Product deleted successfully",
        });
      }
    });
  }

  async function handleGenerateDescription() {
    if (!formData.title) {
      toast({
        title: "Error",
        description: "Please enter a product title first.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/admin/description/generate-description`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productName: formData.title }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setFormData({
          ...formData,
          description: result.data,
        });
        toast({
          title: "Success",
          description: "Description generated successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to generate description.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Products Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Add, edit or remove products from your store.
          </p>
        </div>
        <Button
          onClick={() => setOpenCreateProductsDialog(true)}
          className="bg-[#1a4d3e] hover:bg-[#143d31] text-white rounded-2xl font-bold h-12 px-6 shadow-lg shadow-green-900/10 transition-all active:scale-95 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Product
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {productList && productList.length > 0 ? (
          productList.map((productItem) => (
            <AdminProductTile
              key={productItem._id}
              setCurrentEditedId={setCurrentEditedId}
              setOpenCreateProductsDialog={setOpenCreateProductsDialog}
              setFormData={setFormData}
              product={productItem}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <div className="col-span-full py-20 bg-white rounded-[2.5rem] border border-slate-100 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
              <Package className="w-10 h-10" />
            </div>
            <div>
              <p className="text-slate-900 font-bold text-lg">
                No products found
              </p>
              <p className="text-slate-400 text-sm">
                Start by adding your first product to the store.
              </p>
            </div>
            <Button
              onClick={() => setOpenCreateProductsDialog(true)}
              variant="outline"
              className="rounded-xl font-bold border-slate-200"
            >
              Add Product
            </Button>
          </div>
        )}
      </div>

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent
          side="right"
          className="w-full sm:max-w-xl p-0 flex flex-col h-full border-l border-slate-100"
        >
          <SheetHeader className="p-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#1a4d3e]">
                <Plus className="w-5 h-5" />
              </div>
              <SheetTitle className="text-xl font-bold text-slate-900">
                {currentEditedId !== null ? "Edit Product" : "Add New Product"}
              </SheetTitle>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <div className="space-y-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Product Image
              </h3>
              <ProductImageUpload
                imageFile={imageFile}
                setImageFile={setImageFile}
                uploadedImageUrl={uploadedImageUrl}
                setUploadedImageUrl={setUploadedImageUrl}
                setImageLoadingState={setImageLoadingState}
                imageLoadingState={imageLoadingState}
                isEditMode={currentEditedId !== null}
              />
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Product Details
              </h3>
              <CommonForm
                onSubmit={onSubmit}
                formData={formData}
                setFormData={setFormData}
                formControls={addProductFormElements}
                buttonText={
                  currentEditedId !== null ? "Save Changes" : "Create Product"
                }
                isBtnDisabled={!isFormValid()}
                className="space-y-5"
                customControls={{
                  description: (control) => (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                          Description
                        </label>
                        <button
                          type="button"
                          onClick={handleGenerateDescription}
                          disabled={isGenerating}
                          className="flex items-center gap-1.5 text-[11px] font-bold text-[#1a4d3e] hover:text-[#143d31] transition-colors disabled:opacity-50"
                        >
                          <Sparkles className="w-3 h-3" />
                          {isGenerating ? "Generating..." : "AI Generate"}
                        </button>
                      </div>
                      <Textarea
                        name={control.name}
                        placeholder={control.placeholder}
                        id={control.id}
                        value={formData.description}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            description: event.target.value,
                          })
                        }
                        rows={5}
                        className="bg-slate-50 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-[#1a4d3e]/20 transition-all resize-none"
                      />
                    </div>
                  ),
                }}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
