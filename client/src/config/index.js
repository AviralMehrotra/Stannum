import { Search } from "lucide-react";

export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your User Name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your Email Id",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your Password",
    componentType: "input",
    type: "password",
  },
];
export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your Email Id",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your Password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "kitchenAppl", label: "Kitchen Appliances" },
      { id: "battery", label: "Battery and Inverters" },
      { id: "summerProd", label: "Summer Essentials" },
      { id: "winterProd", label: "Winter Essentials" },
      { id: "securitySystem", label: "Security Systems" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "bajaj", label: "Bajaj" },
      { id: "havells", label: "Havells" },
      { id: "sujata", label: "Sujata" },
      { id: "phillips", label: "Phillips" },
      { id: "microtek", label: "Microtek" },
      { id: "livpure", label: "Livpure" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "kitchenAppl",
    label: "Kitchen",
    path: "/shop/listing",
  },
  {
    id: "battery",
    label: "Power",
    path: "/shop/listing",
  },
  {
    id: "summerProd",
    label: "Summer",
    path: "/shop/listing",
  },
  {
    id: "winterProd",
    label: "Winter",
    path: "/shop/listing",
  },
  {
    id: "securitySystem",
    label: "Security",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  kitchenAppl: "Kitchen",
  battery: "Power",
  summerProd: "Summer",
  winterProd: "Winter",
  securitySystem: "Security",
};

export const brandOptionsMap = {
  bajaj: "Bajaj",
  havells: "Havells",
  sujata: "Sujata",
  phillips: "Phillips",
  microtek: "Microtek",
  livpure: "Livpure",
};

export const filterOptions = {
  category: [
    { id: "kitchenAppl", label: "Kitchen" },
    { id: "battery", label: "Power" },
    { id: "summerProd", label: "Summer" },
    { id: "winterProd", label: "Winter" },
    { id: "securitySystem", label: "Security" },
  ],
  brand: [
    { id: "bajaj", label: "Bajaj" },
    { id: "havells", label: "Havells" },
    { id: "sujata", label: "Sujata" },
    { id: "phillips", label: "Phillips" },
    { id: "microtek", label: "Microtek" },
    { id: "livpure", label: "Livpure" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
