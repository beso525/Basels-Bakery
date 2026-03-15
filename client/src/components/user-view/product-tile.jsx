import { categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function UserProductTile({ product, handleGetProductDetails, handleAddToCart }) {

  const handleBtnDisabled = product?.totalStock === 0;

  console.log(product);
  return (
    <Card className="w-full max-w-sm mx-auto pt-0">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] rounded-t-lg block"
          />
          {
            product?.salePrice > 0
              ? <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">Sale</Badge>
              : product?.totalStock < 5 && product?.totalStock > 0
                ? <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">{product?.totalStock} left!</Badge>
                : product?.totalStock === 0
                  ? <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">Out of stock</Badge>
                  :
                  null

          }
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">{categoryOptionsMap[product?.category]}</span>
          </div>
          <div className="flex justify-between items-center mb-2">

            <span className={`${product?.salePrice > 0 ? 'line-through' : ''} text-lg text-primary font-semibold`}>
              ${product?.price}
            </span>

            {
              product?.salePrice > 0 && product?.salePrice !== product?.price ?
                <span className={`text-lg text-primary font-semibold`}>${product?.salePrice}</span>
                : null
            }
          </div>
        </CardContent>
      </div>
      <CardFooter>
        <Button onClick={() => handleAddToCart(product._id, product.totalStock)} disabled={handleBtnDisabled} className="w-full">
          {
            handleBtnDisabled ? "Out of Stock" : "Add to Cart"
          }
        </Button>
      </CardFooter>
    </Card>
  )
}

export default UserProductTile;