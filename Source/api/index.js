export const BASE_URL = "https://super-canteen-backend.onrender.com/api"

export const IMG_URL = "https://super-canteen-backend.onrender.com/";

export const LOGINAPI = `${BASE_URL}/users/auth`
export const SIGNUPAPI = `${BASE_URL}/users/signup`
export const SENDRESETPASSWORDOTP = `${BASE_URL}/users/sendResetPassword-otp`
export const FORGOTPASSWORD = `${BASE_URL}/users/forgot-password`
export const GETALLCATEGORIES = `/category/getAllCategories`
export const GETALLBRANDS = `/brand/getAllBrands`
export const PRODUCTBYID = `/products/getProductById`
export const PRODUCTBYCATEGORY = '/products/allProducts?category='
export const FETCHPRODUCTBYSUBCATEGORY = '/products/getProductBySubCategory'
export const GETALLSUBCATEGORIES = '/subcategories/getAllsubCategoriesList'
export const FETCHPRODUCTS ='/products/fetchProducts?keyword='
export const GETALLPRODUCTS = '/products/allProducts?search='
export const POPULARPRODUCTS = '/products/allProducts?limit=6&sort=-popularity'
export const GETPRODUCTBYSEGMENT = '/segment/segmentsBySubCategory/'
export const GET_PRODUCT_BY_SEGMENT = '/products/getProductBySegment/'