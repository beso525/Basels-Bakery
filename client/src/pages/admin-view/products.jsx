import ImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import AccountForms from "@/components/common/account-form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { addNewProduct, deleteProduct, editProduct, fetchProducts } from "@/store/auth-slice/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const initialFormData = {
  image: null,
  title: '',
  description: '',
  category: '',
  price: "",
  salePrice: '',
  totalStock: '',
}

function AdminProducts() {

  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { productList } = useSelector(state => state.adminProducts);
  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();

    currentEditedId !== null ?
      dispatch(editProduct({
        id: currentEditedId, formData
      })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchProducts());
          setFormData(initialFormData)
          setOpenCreateProductsDialog(false)
          setCurrentEditedId(null)
          toast.success("Product edited")
        }
      })
      : dispatch(addNewProduct({
        ...formData,
        image: uploadedImageUrl
      }))
        .then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchProducts());
            setOpenCreateProductsDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast.success("Product added")
          }
        })
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct({
      id: getCurrentProductId
    }
    )).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchProducts());
        toast.success("Product deleted")
      }
    })
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  console.log(formData, "product list");

  return (
    <Fragment>
      <div className="mb-5 flex w-full justify-end">
        <Button className="cursor-pointer" onClick={() => setOpenCreateProductsDialog(true)}>Add New Product</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {
          productList && productList.length > 0 ?
            productList.map(productItem => (
              <AdminProductTile
                product={productItem}
                setCurrentEditedId={setCurrentEditedId}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setFormData={setFormData}
                handleDelete={handleDelete}
              />
            ))
            : null
        }
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false)
          setCurrentEditedId(null)
          setFormData(initialFormData)
        }}
      >
        <SheetContent className="overflow-auto px-4" side="right">
          <SheetHeader>
            <SheetTitle>
              {
                currentEditedId !== null ?
                  'Edit Product' : 'Add New Product'
              }
            </SheetTitle>
          </SheetHeader>
          <ImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            isEditing={currentEditedId !== null}
          />
          <div className="py-4">
            <AccountForms
              buttonText={currentEditedId !== null ? 'Edit' : 'Add'}
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default AdminProducts;