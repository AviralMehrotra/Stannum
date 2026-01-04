import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="space-y-8">
      {Object.keys(filterOptions).map((keyItem) => (
        <div key={keyItem} className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
            {keyItem}
          </h3>
          <div className="grid gap-3">
            {filterOptions[keyItem].map((option) => (
              <Label
                key={option.id}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className="relative flex items-center">
                  <Checkbox
                    checked={
                      filters &&
                      Object.keys(filters).length > 0 &&
                      filters[keyItem] &&
                      filters[keyItem].indexOf(option.id) > -1
                    }
                    onCheckedChange={() => handleFilter(keyItem, option.id)}
                    className="w-5 h-5 rounded-md border-slate-200 data-[state=checked]:bg-[#1a4d3e] data-[state=checked]:border-[#1a4d3e] transition-all"
                  />
                </div>
                <span className="text-sm font-medium text-slate-600 group-hover:text-[#1a4d3e] transition-colors">
                  {option.label}
                </span>
              </Label>
            ))}
          </div>
          <Separator className="bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

export default ProductFilter;
