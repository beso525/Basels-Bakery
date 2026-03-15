import { LayoutDashboard, PackageSearch, ShoppingBasket } from "lucide-react"

export const registerFormControls = [
  {
    name: 'username',
    label: 'Username',
    placeholder: 'Enter username',
    componentType: 'input',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter email',
    componentType: 'input',
    type: 'email',
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter password',
    componentType: 'input',
    type: 'password',
  },
]

export const loginFormControls = [
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter email',
    componentType: 'input',
    type: 'email',
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter password',
    componentType: 'input',
    type: 'password',
  },
]

export const adminSidebarMenu = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/admin/dashboard',
    icon: <LayoutDashboard />
  },
  {
    id: 'products',
    label: 'Products',
    path: '/admin/products',
    icon: <PackageSearch />
  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/admin/orders',
    icon: <ShoppingBasket />
  }
]

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title"
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    type: "text",
    placeholder: "Enter product description"
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "breads", label: "Breads" },
      { id: "pastries", label: "Pastries" },
      { id: "desserts", label: "Desserts" },
      { id: "cookies", label: "Cookies" },
      { id: "savory", label: "Savory" },
      { id: "drinks", label: "Drinks" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price"
  },
  {
    label: "Sales Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sales price"
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock"
  },
]

export const userHeaderMenu = [
  {
    id: 'products',
    label: 'Products',
    path: '/shop/listing'
  },
  {
    id: 'search',
    label: 'Search',
    path: '/shop/search'
  },
]

export const categoryOptionsMap = {
  'breads': "Breads",
  'pastries': "Pastries",
  'desserts': "Desserts",
  'cookies': "Cookies",
  'savory': "Savory",
  'drinks': "Drinks",
}

export const filterOptions = {
  category: [
    { id: "breads", label: "Breads" },
    { id: "pastries", label: "Pastries" },
    { id: "desserts", label: "Desserts" },
    { id: "cookies", label: "Cookies" },
    { id: "savory", label: "Savory" },
    { id: "drinks", label: "Drinks" },
  ],
}

export const sortOptions = [
  { id: "price-lowhigh", label: "Price: Low to High" },
  { id: "price-highlow", label: "Price: High to Low" },
  { id: "title-az", label: "Title: A to Z" },
  { id: "title-za", label: "Title: Z to A" },
]

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address"
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city"
  },
  {
    label: "Postal Code",
    name: "postalcode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your postalcode"
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "tel",
    placeholder: "(123) 456-7890"
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional instructions"
  },
]