import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div className="">
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through decoration-2" : ""
              } text-lg font-semibold text-primary`}
            >
              ₹{product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">
                ₹{product?.salePrice}
                <sup className="text-red-500 ml-1">
                  {Math.round(
                    ((product?.price - product?.salePrice) / product?.price) *
                      100
                  )}
                  %
                </sup>
              </span>
            ) : null}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              handleDelete(product._id);
            }}
          >
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
