import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import CartContent from "./cart-content";

function CartWrapper({ cartItems, setOpenCartSheet }) {

  const total = cartItems && cartItems.length > 0 ?
    cartItems.reduce(
      (accumulator, currentItem) =>
        accumulator +
        (currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price) * currentItem?.quantity
      , 0)
    : 0;

  const navigate = useNavigate();

  return <SheetContent className="sm:max-w-md">
    <SheetHeader>
      <SheetTitle>Your Cart</SheetTitle>
    </SheetHeader>
    <div className="m-8 space-y-3">
      {
        cartItems && cartItems.length > 0 ?
          cartItems.map(item =>
            <CartContent cartItem={item} />)
          : null
      }
    </div>
    <div className="space-y-4 mx-8">
      <div className="flex justify-between">
        <span className="font-bold">Total</span>
        <span className="font-bold">
          ${total.toFixed(2)}
        </span>
      </div>
    </div>
    <Button onClick={() => {
      setOpenCartSheet(false);
      navigate('/shop/checkout')
    }} className="w-fill m-5">Checkout</Button>
  </SheetContent >
}

export default CartWrapper;