import { useSelector } from "react-redux";
import { DialogContent, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";

function UserOrderDetailsView({ orderDetails }) {

  const { user } = useSelector(state => state.auth)
  console.log(orderDetails, "order details");

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogTitle>Order ID details</DialogTitle>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split('T')[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className=
                {`py-1 px-3         
                  ${orderDetails?.orderStatus ===
                    "confirmed" ? "bg-green-500" :
                    orderDetails?.orderStatus ===
                      "rejected" ? "bg-red-500" :
                      "bg-black"}`
                }>
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Method</p>
            <Label>{orderDetails?.paymentMethod.charAt(0).toUpperCase() + orderDetails?.paymentMethod.slice(1)}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <Separator />
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Order Details</div>
              <ul className="grid gap-3 pb-3">
                {
                  orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ?
                    orderDetails.cartItems.map(cartItem => (
                      <li className="flex gap-10 items-center justify-between">
                        <img
                          className="w-20 h-20 rounded-xl"
                          src={cartItem?.image}
                          alt={cartItem?.title} />
                        <span className="flex-1">{cartItem.title}</span>
                        <span>{cartItem.quantity} x ${
                          cartItem.salePrice > 0 ? cartItem.salePrice : cartItem.price
                        }</span>
                      </li>
                    )) : null
                }
              </ul>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Shipping Info</div>
              <div className="grid gap-1/2 text-muted-foreground">
                <span>{user?.username}</span>
                <span>{orderDetails?.addressInfo?.address}</span>
                <span>{orderDetails?.addressInfo?.city}, {orderDetails?.addressInfo?.postalcode}</span>
                <span>{orderDetails?.addressInfo?.phone}</span>
                <span>{orderDetails?.addressInfo?.notes}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  )
}

export default UserOrderDetailsView;