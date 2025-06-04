import { IMG_URL } from "../api";

  export const formatCategoryData = (categories) => {
  return categories.map((cat) => ({
     name: cat.name.split(' ')[0],
    image: `${IMG_URL}${cat.image}`,
    screen: cat.screen,
  }));
};

export const formatBrandData = (categories) => {
  return categories.map((brand) => ({
     name: brand.name.split(' '),
    image: `${IMG_URL}${brand.image}`,
    screen: brand.screen,
  }));
};