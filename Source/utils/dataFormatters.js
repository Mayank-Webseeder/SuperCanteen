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
     id:brand._id,
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
      && `https://www.api-supercanteen.webseeder.tech${product.images[0]}` 
     
    
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
export const stripHtml = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '');
};



// utils/productFormatters.js
export const IMGURL = "https://www.api-supercanteen.webseeder.tech";

export const formatProductDetailData = (product) => {
  if (!product) return null;
  
  return {
    id: product._id,
    name: product.name,
    color:product.color,
    images: Array.isArray(product.images)
      ? product.images.map(img => `${IMGURL}${img}`)
      : [],
    hasVariants:product.hasVariants,
    productType:product.productType,
    size:product.size,
    color:product.color,
    flatVariants:product.flatVariants ,
    colorVariants:product.colorVariants,
    brand: product.brand ? {
      id: product.brand._id,
      name: product.brand.name,
      image: product.brand.image ? `${IMGURL}${product.brand.image}` : null,
      about: product.brand.aboutTheBrand
    } : null,
    warrantyPeriod:product.warrantyPeriod,
    category: product.category,
    subCategory: product.subCategory,
    description: product.description,
    specification: product.specification,
    mrp: product.mrp,
    offerPrice: product.offerPrice,
    discountPercent: product.discountPercent || 
      Math.round(((product.mrp - product.offerPrice) / product.mrp * 100)),
    rating: product.rating,
    numReviews: product.numReviews,
    stock: product.countInStock,
    attributes: product.attributes,
    returnPolicy: {
      returnable: product.returnable,
      returnWindow: product.returnWindow
    },
    shippingInfo: {
      height: product.height,
      width: product.width,
      weight: product.weight,
      shippingRate: product.shippingRate,
    },
    createdAt: product.createdAt
  };
};


export const formateSubCategoryProducts = (products = []) => {
  return products.map(product => ({
    id: product._id,
    name: product.name,
    brandId: product.brand?._id || '',
    brandName: product.brand?.name || '',
    categoryId: product.category?._id || '',
    categoryName: product.category?.name || '',
    subCategoryId: product.subCategory?._id || '',
    subCategoryName: product.subCategory?.name || '',
    image: product.images?.[0] ? `${IMGURL}${product.images[0]}` : null,
    images: product.images?.map(img => `${IMGURL}${img}`) || [],
    price: product.offerPrice || product.price,
    mrp: product.mrp,
    discountPercent: Math.round(((product.mrp - (product.offerPrice || product.price)) / product.mrp) * 100),
    rating: product.rating || 0,
    reviews: product.numReviews || 0,
    description: product.description || '', 
    aboutTheBrand: product.aboutTheBrand || '',
    specification: product.specification || '',
    tags: product.tags || [],
    keywords: product.keywords || [],
    countInStock: product.countInStock || 0,
    outOfStock: product.outOfStock || false,
    isEnable: product.isEnable || false,
    isAvailable:product.isAvailable,
    isFeatured: product.isFeatured || false,
    isBestSeller: product.isBestSeller || false,
    unit: product.unit || '',
    height: product.height || '',
    width: product.width || '',
    breadth: product.breadth || '',
    weight: product.weight || '',
    tax: product.tax || 0,
    shippingRate: product.shippingRate || 0,
    deliveryDays: product.deliveryDays || 0,
    returnable: product.returnable || false,
    returnWindow: product.returnWindow || 0,
    warrantyPeriod: product.warrantyPeriod || '',
    isDigital: product.isDigital || false,
    downloadLink: product.downloadLink || '',
    visibility: product.visibility || 'false',
    attributes: product.attributes?.map(attr => ({
      key: attr.key || '',
      value: attr.value || ''
    })) || [],
    slabs: product.slabs?.map(slab => ({
      minQuantity: slab.minQuantity,
      maxQuantity: slab.maxQuantity,
      price: slab.price,
      couponId: slab.couponId,
      expire: slab.expire
    })) || [],
    variants: product.variants?.filter(v => v.color || v.size) || [],
    // variants: product.variants?.map(variant => ({
    //   color: variant.color || '',
    //   size: variant.size || '',
    //   additionalPrice: variant.additionalPrice || 0,
    //   images: variant.images?.map(img => `${IMGURL}${img}`) || [],
    //   countInStock: variant.countInStock || 0,
    //   sku: variant.sku || ''
    // })) || [],
    createdAt: product.createdAt,
    updatedAt: product.updatedAt
  }));
};


export const formateSubCategorySegments = (segments = []) => {
  return segments.map(segment => ({
    id: segment._id,
    name: segment.name,
    subCategoryId: segment.subCategory || '',
    image: segment.image ? `${IMGURL}/${segment.image.replace(/^\/+/, '')}` : null,
    images: segment.image ? [`${IMGURL}/${segment.image.replace(/^\/+/, '')}`] : [],
    keywords: segment.keywords || [],
    isActive: segment.isActive || false,
    createdAt: segment.createdAt,
    updatedAt: segment.updatedAt,
    isAvailable:segment.isAvailable
  }));
};




export const formatProductGroupedData = (groupedData = {}) => {
  const formattedGrouped = {};

  for (const categoryId in groupedData) {
    formattedGrouped[categoryId] = groupedData[categoryId].map(product => {
      let image = null;

      if (product.images?.[0]) {
        const cleanedPath = product.images[0]
          .replace(/^\/+/, '') // remove leading slashes
          .replace(/\/{2,}/g, '/'); // replace double slashes with one inside the path

        image = `${cleanedPath}`;
      }

      return {
        ...product,
        image,
      };
    });
  }

  return formattedGrouped;
};


export const formatProductBySegment = (products = []) => {
  return products.map(product => ({
    id: product._id,
    name: product.name,
    brandId: product.brand?._id || '',
    brandName: product.brand?.name || '',
    categoryId: product.category?._id || '',
    categoryName: product.category?.name || '',
    subCategoryId: product.subCategory?._id || '',
    subCategoryName: product.subCategory?.name || '',
    segmentId: product.segment?._id || '',
    segmentName: product.segment?.name || '',
    image: product.images?.[0] ? `${IMGURL}/${product.images[0].replace(/^\/+/, '')}` : null,
    images: product.images?.map(img => `${IMGURL}/${img.replace(/^\/+/, '')}`) || [],
    price: product.offerPrice || product.price,
    mrp: product.mrp,
    discountPercent: product.mrp ? Math.round(((product.mrp - (product.offerPrice || product.price)) / product.mrp) * 100) : 0,
    rating: product.rating || 0,
    reviews: product.numReviews || 0,
    description: product.description || '',
    aboutTheBrand: product.aboutTheBrand || '',
    specification: product.specification || '',
    tags: product.tags || [],
    keywords: product.keywords || [],
    countInStock: product.countInStock || 0,
    outOfStock: product.outOfStock || false,
    isEnable: product.isEnable || false,
    isAvailable:product.isAvailable ,
    isFeatured: product.isFeatured || false,
    isBestSeller: product.isBestSeller || false,
    unit: product.unit || '',
    height: product.height || '',
    width: product.width || '',
    breadth: product.breadth || '',
    weight: product.weight || '',
    tax: product.tax || 0,
    shippingRate: product.shippingRate || 0,
    deliveryDays: product.deliveryDays || 0,
    returnable: product.returnable || false,
    returnWindow: product.returnWindow || 0,
    warrantyPeriod: product.warrantyPeriod || '',
    isDigital: product.isDigital || false,
    downloadLink: product.downloadLink || '',
    visibility: product.visibility || 'false',
    attributes: product.attributes?.map(attr => ({
      key: attr.key || '',
      value: attr.value || ''
    })) || [],
    slabs: product.slabs?.map(slab => ({
      minQuantity: slab.minQuantity,
      maxQuantity: slab.maxQuantity,
      price: slab.price,
      couponId: slab.couponId || '',
      expire: slab.expire || null
    })) || [],
    variants: product.variants?.filter(v => v.color || v.size).map(variant => ({
      color: variant.color || '',
      size: variant.size || '',
      additionalPrice: variant.additionalPrice || 0,
      images: variant.images?.map(img => `${IMGURL}/${img.replace(/^\/+/, '')}`) || [],
      countInStock: variant.countInStock || 0,
      sku: variant.sku || ''
    })) || [],
    createdAt: product.createdAt,
    updatedAt: product.updatedAt
  }));
};


export const formatProductsByBrand = (products = []) => {
  return products.map(product => ({
    id: product._id,
    name: product.name,
    sku: product.sku || '',

    // Image (first one in the array)
    images: product.images?.[0] ? `${IMGURL}${product.images[0]}` : null,

    // Brand & Category Info
    brandName: product.brand?.name || '',
    category: product.category?.name || '',
    subCategory: product.subCategory?.name || '',
    subCategoryId: product.subCategory?._id || '', // ✅ Added this line
    segment: product.segment?.name || '',
    isEnable:product.isEnable,

    // Pricing & Details
    offerPrice: product.offerPrice,
    mrp: product.mrp,
    rating: product.rating,
    isBestSeller: product.isBestSeller || false,

    // Slabs
    slabs: product.slabs?.map(slab => ({
      minQuantity: slab.minQuantity,
      maxQuantity: slab.maxQuantity,
      price: slab.price,
      expire: slab.expire || null
    })) || [],

    // Variants
    variants: product.variants?.map(variant => ({
      id: variant._id,
      color: variant.color || '',
      image: variant.images?.[0]
        ? `${IMGURL}${variant.images[0].replace(/^\/?/, '')}`
        : null,
      stock: variant.countInStock,
      sku: variant.sku || ''
    })) || []
  }));
};





