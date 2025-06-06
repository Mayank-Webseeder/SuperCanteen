import { IMG_URL } from "../api";

  export const formatCategoryData = (categories) => {
  return categories.map((cat) => ({
     id: cat._id,
     name: cat.name.split(' ')[0],
    image: `${IMG_URL}${cat.image}`,
  }));
};

export const formatBrandData = (categories) => {
  return categories.map((brand) => ({
     name: brand.name.split(' '),
    image: `${IMG_URL}${brand.image}`,
    aboutTheBrand: brand.aboutTheBrand,
  }));
};

export const formatSubcategoryData = (subcategories = []) => {
  return subcategories.map((subcat) => ({
    id: subcat._id,
    name: subcat.name,
    image: `${IMG_URL}${subcat.image}`,
    categoryId: subcat.category?._id || '',
    categoryName: subcat.category?.name || '',
  }));
};


export const formatProductData = (products = []) => {
  return products.map((product) => {
    // Handle images - use first image as main image, or placeholder if none
    const mainImage = product.images?.length > 0 
      && `https://super-canteen-backend.onrender.com${product.images[0]}` 
     
    
    // Handle brand - can be object or string in different responses
    const brandName = typeof product.brand === 'object' 
      ? product.brand.name 
      : product.brand || '';
      
    return {
      id: product._id,
      name: product.name,
      description: stripHtml(product.description) || '', // Added HTML stripping
      images: product.images?.map(img => `${IMG_URL}${img}`) || [], // All images
      image: mainImage, // Main image for thumbnails
      mrp: product.mrp || 0,
      sellingPrice: product.offerPrice || product.sellingPrice || product.mrp || 0,
      discount: calculateDiscount(product.mrp, product.offerPrice || product.sellingPrice),
      rating: product.rating || 0,
      numReviews: product.numReviews || 0,
      categoryId: product.category?._id || '',
      categoryName: product.category?.name || '',
      subcategoryId: product.subCategory?._id || '', // Note camelCase vs snake_case
      subcategoryName: product.subCategory?.name || '',
      brand: brandName,
      brandObject: product.brand || {}, // Keep full brand object if needed
      stock: product.countInStock || 0,
      outOfStock: product.outOfStock || false,
      specifications: stripHtml(product.specification) || '',
      aboutBrand: stripHtml(product.aboutTheBrand) || '',
      // Additional fields from your response
      slabs: product.slabs || [],
      tax: product.tax || 0,
      shippingRate: product.shippingRate || 0,
      dimensions: {
        height: product.height,
        width: product.width,
        breadth: product.breadth,
        weight: product.weight
      }
    };
  });
};

// Helper to calculate discount
const calculateDiscount = (mrp, sellingPrice) => {
  if (!mrp || mrp <= 0 || mrp <= sellingPrice) return 0;
  return Math.round(((mrp - sellingPrice) / mrp) * 100);
};

// Helper to strip HTML tags
const stripHtml = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '');
};