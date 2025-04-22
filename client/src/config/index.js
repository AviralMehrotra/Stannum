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
      { id: "smartphones", label: "Smartphones" },
      { id: "laptops", label: "Laptops" },
      { id: "headphones", label: "Headphones" },
      { id: "earphones", label: "Earphones" },
      { id: "smartwatches", label: "Smartwatches" },
      { id: "tablets", label: "Tablets" },
      { id: "accessories", label: "Accessories" },
      { id: "gaming", label: "Gaming" },
      { id: "audio", label: "Audio" },
      { id: "wearables", label: "Wearables" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "apple", label: "Apple" },
      { id: "samsung", label: "Samsung" },
      { id: "sony", label: "Sony" },
      { id: "bose", label: "Bose" },
      { id: "dell", label: "Dell" },
      { id: "hp", label: "HP" },
      { id: "lenovo", label: "Lenovo" },
      { id: "xiaomi", label: "Xiaomi" },
      { id: "oneplus", label: "OnePlus" },
      { id: "jbl", label: "JBL" },
      { id: "others", label: "Others" },
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
    id: "smartphones",
    label: "Smartphones",
    path: "/shop/listing",
  },
  {
    id: "laptops",
    label: "Laptops",
    path: "/shop/listing",
  },
  {
    id: "headphones",
    label: "Headphones",
    path: "/shop/listing",
  },
  {
    id: "earphones",
    label: "Earphones",
    path: "/shop/listing",
  },
  {
    id: "smartwatches",
    label: "Smartwatches",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  smartphones: "Smartphones",
  laptops: "Laptops",
  headphones: "Headphones",
  earphones: "Earphones",
  smartwatches: "Smartwatches",
  tablets: "Tablets",
  accessories: "Accessories",
  gaming: "Gaming",
  audio: "Audio",
  wearables: "Wearables",
};

export const brandOptionsMap = {
  apple: "Apple",
  samsung: "Samsung",
  sony: "Sony",
  bose: "Bose",
  dell: "Dell",
  hp: "HP",
  lenovo: "Lenovo",
  xiaomi: "Xiaomi",
  oneplus: "OnePlus",
  jbl: "JBL",
  others: "Others",
};

export const filterOptions = {
  category: [
    { id: "smartphones", label: "Smartphones" },
    { id: "laptops", label: "Laptops" },
    { id: "headphones", label: "Headphones" },
    { id: "earphones", label: "Earphones" },
    { id: "smartwatches", label: "Smartwatches" },
    { id: "tablets", label: "Tablets" },
    { id: "accessories", label: "Accessories" },
    { id: "gaming", label: "Gaming" },
    { id: "audio", label: "Audio" },
    { id: "wearables", label: "Wearables" },
  ],
  brand: [
    { id: "apple", label: "Apple" },
    { id: "samsung", label: "Samsung" },
    { id: "sony", label: "Sony" },
    { id: "bose", label: "Bose" },
    { id: "dell", label: "Dell" },
    { id: "hp", label: "HP" },
    { id: "lenovo", label: "Lenovo" },
    { id: "xiaomi", label: "Xiaomi" },
    { id: "oneplus", label: "OnePlus" },
    { id: "jbl", label: "JBL" },
    { id: "others", label: "Others" },
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
