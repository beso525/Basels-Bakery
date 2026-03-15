import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({ selectedId, addressInfo, handleDeleteAddress, handleEditAddress, setCurrentSelectedAddress }) {

  return (
    <Card
      onClick={setCurrentSelectedAddress
        ? () => (setCurrentSelectedAddress(addressInfo))
        : null}
      className={`cursor-pointer ${selectedId?._id === addressInfo?._id
        ? "border-green-900 border-[2px]"
        : "border-black"
        }`}
    >
      <CardContent className="grid p-4 gap-5">
        <Label><strong>Address:</strong> {addressInfo?.address}</Label>
        <Label><strong>City:</strong> {addressInfo?.city}</Label>
        <Label><strong>Postal Code:</strong> {addressInfo?.postalcode}</Label>
        <Label><strong>Phone Number:</strong> {addressInfo?.phone}</Label>
        <Label><strong>Notes:</strong> {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="flex justify-between p-3">
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  )
}

export default AddressCard;