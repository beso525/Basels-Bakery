import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { getOrderDetails } from "@/store/shop/order-slice";
import { CircleCheckBig } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function PaymentSuccessPage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const orderId = location.state?.orderId;
  const { orderDetails } = useSelector(state => state.shopOrder)

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId])

  console.log(orderDetails);

  return (
    <div className="flex flex-col gap-5 justify-center items-center my-10">
      <CircleCheckBig className="size-30 text-green-500" />
      <div className="text-3xl font-extrabold">
        <p>Thank you!</p>
        <p>Payment Successful!</p>
      </div>

      <div>
        {
          orderDetails ? <>
            <Card>
              <CardTitle className="font-extrabold text-4xl">
                Order Details
              </CardTitle>
              <CardContent>
                <h1>Order Id: {orderDetails?._id}</h1>
                <h2 className="font-extrabold text-2xl">Order summary </h2>

                {orderDetails?.cartItems.map(item => <>
                  <div className="flex items-center gap-20 my-3">
                    <img src={item.image} className="w-20 h-20 rounded-xl" />
                    <p className="flex-2 text-lg">{item.title}</p>
                    <p className="flex-1 font-bold italic">{item.quantity} x ${item.salePrice > 0 ? item.salePrice : item.price}</p>
                  </div>
                </>
                )}
                <div>
                  <h2 className="font-extrabold text-2xl">Payment details</h2>
                  <div className="flex justify-between px-5">
                    <p>Payment Id:</p>
                    <p className="italic font-bold">${orderDetails.paymentId}</p>
                  </div>
                  <div className="flex justify-between px-5">
                    <p>Total Amount:</p>
                    <p className="italic font-bold">${orderDetails.totalAmount}</p>
                  </div>
                  <div className="flex justify-between px-5">
                    <p>Payment Method:</p>
                    <p className="italic font-bold">${orderDetails.paymentMethod}</p>
                  </div>
                </div>

                <h2 className="font-extrabold text-lg">Shipping details</h2>
                <p>{orderDetails?.addressInfo?.address}</p>
                <p>{orderDetails?.addressInfo?.city}, {orderDetails?.addressInfo?.postalcode}</p>
                <p>{orderDetails?.addressInfo?.phone}</p>

                <h2 className="font-bold">Additional notes:</h2>
                <p>{orderDetails?.addressInfo?.notes}</p>

              </CardContent>
            </Card>
          </>
            : null
        }
      </div>
      <div>
        <Button onClick={() => navigate('/shop/home')} className="cursor-pointer">Home Sweet Home</Button>
      </div>
    </div>
  )
}

export default PaymentSuccessPage;