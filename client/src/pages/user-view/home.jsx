import { Button } from '@/components/ui/button';
import slideshowOne from '../../assets/slideshow1.jpg'
import slideshowTwo from '../../assets/slideshow2.jpg'
// import bannerThree from '../../assets/banner3.webp'
import { ChevronLeft, ChevronRightIcon, Cookie, Cake, Croissant, Coffee, Pizza } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { displayFilteredProducts, displayProductDetails } from '@/store/shop/products-slice';
import { useDispatch, useSelector } from 'react-redux';
import UserProductTile from '@/components/user-view/product-tile';
import { useNavigate } from 'react-router-dom';
import { addToCart, getCart } from '@/store/shop/carts-slice';
import { toast } from 'sonner';
import ProductDetailsDialog from '@/components/user-view/product-details';
import UserHeader from '@/components/user-view/header';


function UserHome() {

  const slides = [slideshowOne, slideshowTwo];
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(state => state.shoppingProducts);
  const { user } = useSelector(state => state.auth);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prevIndex => (prevIndex + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  })

  useEffect(() => {
    dispatch(displayFilteredProducts({ filterParams: {}, sortParams: {} }))
  }, [dispatch])

  const categories = [
    { id: "breads", label: "Breads", icon: Croissant },
    { id: "pastries", label: "Pastries", icon: Croissant },
    { id: "desserts", label: "Desserts", icon: Cake },
    { id: "cookies", label: "Cookies", icon: Cookie },
    { id: "savory", label: "Savory", icon: Pizza },
    { id: "drinks", label: "Drinks", icon: Coffee },

  ];

  function handleNavigate(getCurrentItem, section) {
    sessionStorage.removeItem('filters');
    const currentFilter = {
      [section]: [getCurrentItem.id]
    }

    sessionStorage.setItem(`filters`, JSON.stringify(currentFilter))
    navigate(`/shop/listing`)
  }

  function handleAddToCart(getCurrentProductId) {
    dispatch(addToCart({
      userId: user?.id, productId: getCurrentProductId, quantity: 1
    }))
      .then((data) => {
        console.log(data);
        if (data?.payload?.success) {
          dispatch(getCart(user?.id))
          toast.success("Item added to cart")
        }
      })
  }

  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true)
    }
  }, [productDetails])

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(displayProductDetails(getCurrentProductId))
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        <UserHeader />
        {
          slides.map((slide, index) =>
            <img
              src={slide}
              key={index}
              className={`${index === currentSlide ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`} />
          )
        }
        <Button className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray/80"
          variant="outline"
          size='icon'
          onClick={() => setCurrentSlide((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)}
        >
          <ChevronLeft className='w-4 h-4' />
        </Button>
        <Button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray/80"
          variant="outline"
          size='icon'
          onClick={() =>
            setCurrentSlide((prevIndex) => (prevIndex + 1) % slides.length)}
        >
          <ChevronRightIcon className='w-4 h-4' />
        </Button>
      </div>
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>
            Shop by category
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
            {
              categories.map(categoryItem => <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent onClick={() => handleNavigate(categoryItem, 'category')} className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span>{categoryItem.label}</span>
                </CardContent>
              </Card>)
            }
          </div>
        </div>
      </section>
      <section className='p-12'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>
            Features
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
            {
              productList && productList.length > 0 ?
                productList.map(prodItem => (
                  <UserProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={prodItem}
                    handleAddToCart={handleAddToCart}
                  />
                ))
                : null
            }
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails} />

    </div>
  );
}

export default UserHome;