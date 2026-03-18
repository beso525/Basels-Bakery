import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function PaypalReturnPage() {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get('paymentId')
  const payerId = params.get('PayerID')

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem('currentOrderId'))
      console.log(orderId);
      dispatch(capturePayment({ paymentId, payerId, orderId })).then(data => {
        if (data?.payload?.success) {
          navigate('/shop/payment-success', { state: { orderId } });
          sessionStorage.removeItem('currentOrderId')
        }
      })
    }
  }, [paymentId, payerId, dispatch, navigate])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment...</CardTitle>
      </CardHeader>
    </Card>
  )
}

export default PaypalReturnPage;