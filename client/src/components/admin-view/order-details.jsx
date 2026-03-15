import { useState } from "react";
import AccountForms from "../common/account-form";
import { DialogContent, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatus } from "@/store/auth-slice/admin/order-slice";
import { Badge } from "../ui/badge";
import { toast } from "sonner";

const initialFormData = {
  status: ''
}

function AdminOrderDetailsView({ orderDetails }) {

  const [formData, setFormData] = useState(initialFormData)
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch();

  function handleUpdateStatus(e) {
    e.preventDefault();
    console.log(formData)
    const { status } = formData;
    dispatch(updateOrderStatus({ id: orderDetails._id, orderStatus: status }))
      .then(data => {
        if (data?.payload?.success) {
          dispatch(getOrderDetailsForAdmin(orderDetails?._id))
          dispatch(getAllOrdersForAdmin())
          setFormData(initialFormData);
          toast.success("Order status updated")
        }
      })
  }

  console.log(orderDetails);

  return (
    <DialogContent className="sm:max-w-[60vw] h-fill">
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
                }>{orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>{orderDetails?.totalAmount}</Label>
          </div>
          <Separator />
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Order Details</div>
              <ul className="grid gap-3">
                {
                  orderDetails?.cartItems && orderDetails.cartItems.length > 0 ?
                    orderDetails.cartItems.map(item => (
                      <li className="flex gap-4 items-center justify-between">
                        <img
                          src={item?.image}
                          alt={item?.title}
                          className="h-25 w-25 rounded-lg" />
                        <span className="flex-1">{item.title}</span>
                        <span>{item.quantity} x ${item.price}</span>
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
                <span>{orderDetails?.userId}</span> {/* where is the user name for this specific user? */}
                <span>{orderDetails?.addressInfo.address}</span>
                <span>{orderDetails?.addressInfo.city}, {orderDetails?.addressInfo.postalcode}</span>
                <span>{orderDetails?.addressInfo.phone}</span>
                <span>{orderDetails?.addressInfo.notes}</span>
              </div>
            </div>
          </div>
          <div>
            <AccountForms

              formControls={[
                {
                  label: "Order Status",
                  name: "status",
                  componentType: "select",
                  options: [
                    { id: "pending", label: "Pending" },
                    { id: "inProcess", label: "In Process" },
                    { id: "shipped", label: "Shipped" },
                    { id: "delivered", label: "Delivered" },
                    { id: "rejected", label: "Rejected" },
                  ],
                },
              ]}
              formData={formData}
              setFormData={setFormData}
              buttonText="Update Order Status"
              onSubmit={handleUpdateStatus}
            />
          </div>
        </div>
      </div>
    </DialogContent>
  )
}

export default AdminOrderDetailsView;