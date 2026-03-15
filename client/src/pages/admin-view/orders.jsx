import AdminOrderDetailsView from "@/components/admin-view/order-details";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Table, TableRow, TableHead, TableHeader, TableBody, TableCell } from "@/components/ui/table";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from "@/store/auth-slice/admin/order-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminOrders() {

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector(state => state.adminOrder)
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getOrderId) {
    dispatch(getOrderDetailsForAdmin(getOrderId))
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin())
  }, [dispatch])

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true)
  }, [orderDetails])

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead><span className="sr-only">Details</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              orderList && orderList.length > 0 ?
                orderList.map(list => (
                  <>
                    <TableRow>
                      <TableCell>{list._id}</TableCell>
                      <TableCell>{list.orderDate.split('T')[0]}</TableCell>
                      <TableCell>
                        <Badge
                          className={`py-1 px-3
                            ${list?.orderStatus ===
                              "confirmed" ? "bg-green-500" :
                              list?.orderStatus ===
                                "rejected" ? "bg-red-500" :
                                "bg-black"}`
                          }>
                          {list.orderStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>${list.totalAmount}</TableCell>
                      <TableCell>
                        <Dialog
                          open={openDetailsDialog}
                          onOpenChange={() => {
                            setOpenDetailsDialog(false)
                            dispatch(resetOrderDetails())
                          }}>
                          <Button onClick={() => handleFetchOrderDetails(list?._id)}>View Details</Button>
                          <AdminOrderDetailsView orderDetails={orderDetails} />
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  </>
                )) : null
            }
          </TableBody>
        </Table>
      </CardContent>
    </Card >
  )
}

export default AdminOrders;