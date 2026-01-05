import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { MapPin, Phone, FileText, Edit2, Trash2 } from "lucide-react";

function AddressCard({
  addressInfo,
  handleEditAddress,
  handleDeleteAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  const isSelected = selectedId?._id === addressInfo?._id;

  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`relative overflow-hidden cursor-pointer transition-all duration-300 rounded-[1.5rem] border-2 ${
        isSelected
          ? "border-[#1a4d3e] bg-green-50/30 shadow-lg shadow-green-900/5"
          : "border-slate-100 hover:border-green-200 bg-white"
      }`}
    >
      <CardContent className="p-5 space-y-4">
        <div className="flex items-start gap-3">
          <div
            className={`p-2 rounded-xl ${
              isSelected
                ? "bg-[#1a4d3e] text-white"
                : "bg-slate-50 text-slate-400"
            }`}
          >
            <MapPin className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              Address
            </p>
            <p className="text-sm font-bold text-slate-900 leading-snug">
              {addressInfo?.address}, {addressInfo?.city} -{" "}
              {addressInfo?.pincode}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-medium text-slate-600">
              {addressInfo?.phone}
            </span>
          </div>
        </div>

        {addressInfo?.notes && (
          <div className="flex items-start gap-2 pt-2 border-t border-slate-50">
            <FileText className="w-3.5 h-3.5 text-slate-400 mt-0.5" />
            <p className="text-xs text-slate-500 italic leading-relaxed line-clamp-2">
              {addressInfo?.notes}
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="px-5 pb-5 pt-0 flex justify-end gap-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            handleEditAddress(addressInfo);
          }}
          className="w-8 h-8 rounded-lg text-slate-400 hover:text-[#1a4d3e] hover:bg-green-50"
        >
          <Edit2 className="w-3.5 h-3.5" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteAddress(addressInfo);
          }}
          className="w-8 h-8 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </CardFooter>

      {isSelected && (
        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#1a4d3e]" />
      )}
    </Card>
  );
}

export default AddressCard;
