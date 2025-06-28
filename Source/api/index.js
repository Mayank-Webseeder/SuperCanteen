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
export const GET_PRODUCT_BY_BRAND = '/products/allProducts?brand='
export const CART_BASE = 'https://super-canteen-backend.onrender.com/api/cart';
export const ADD_TO_WISHLIST = '/wishlist/addToWishlist';
export const REMOVE_FROM_WISHLIST = '/wishlist/removeProductFromWishlist';
export const GET_WHISHLIST_BY_USERID = '/wishlist/getWishlistByUserId'
export const ADD_MULTIPLE_ADDRESS = '/users/add-Addresses';
export const DELETE_ADDRESS_BY_USERID = '/users/delete-AddressByUserId';
export const UPDATE_ADDRESS_BY_USERID = '/users/update-AddressByUserId';
export const GET_ALL_COUPONS = '/coupon/get-allCoupon'
export const GET_COUPON_BY_ID = '/coupon/get-couponById'
export const GET_PROFILE = '/users/get-Profile'
export const GET_USER_ADDRESS = '/users/get-userProfileAddress'
export const UPDATE_PROFILE = '/users/update-Profile'
export const GET_ALL_SECTIONS = '/section/getAllActiveSections'




