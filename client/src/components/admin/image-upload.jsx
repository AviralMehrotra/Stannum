import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { UploadCloudIcon, XIcon, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  imageLoadingState,
  isEditMode,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    setUploadedImageUrl("");
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleReplaceClick() {
    if (inputRef.current) inputRef.current.click();
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`,
      data,
    );
    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className="w-full mt-4 space-y-3">
      <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
        Product Image
      </Label>

      {/* Hidden file input — always accessible */}
      <Input
        id="image-upload"
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={handleImageFileChange}
        accept="image/*"
      />

      {/* Uploading state */}
      {imageLoadingState ? (
        <div className="rounded-2xl overflow-hidden border border-slate-100">
          <Skeleton className="h-44 w-full rounded-2xl bg-slate-100" />
          <p className="text-xs text-center text-slate-400 font-medium py-2">
            Uploading...
          </p>
        </div>
      ) : uploadedImageUrl ? (
        /* Existing / newly uploaded image preview */
        <div className="rounded-2xl overflow-hidden border border-slate-100 bg-slate-50">
          <img
            src={uploadedImageUrl}
            alt="Product"
            className="w-full h-44 object-cover"
          />
          {/* Action bar always visible below image */}
          <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-100 bg-white">
            <span className="text-xs text-slate-400 font-medium truncate max-w-[140px]">
              {imageFile ? imageFile.name : "Current image"}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReplaceClick}
                className="flex items-center gap-1.5 text-xs font-bold text-[#1a4d3e] hover:text-[#143d31] transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Change
              </button>
              <span className="text-slate-200">|</span>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-500 transition-colors"
              >
                <XIcon className="w-3.5 h-3.5" />
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty / drop zone */
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleReplaceClick}
          className="border-2 border-dashed border-slate-200 hover:border-[#1a4d3e]/40 rounded-2xl p-6 transition-colors cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center h-28 gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
              <UploadCloudIcon className="w-6 h-6 text-slate-400" />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-slate-700">
                Drag & drop or click to upload
              </p>
              <p className="text-xs text-slate-400 mt-1">
                PNG, JPG, WEBP up to 10MB
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductImageUpload;
