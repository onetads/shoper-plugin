import { TPages } from 'types/pages';

const PRODUCT_ID_KEY = 'productId';
const PRODUCT_INACTIVE = 'product_inactive';

const PRODUCT_CONTAINER_ID = '.products';
const DATA_PRODUCT_ID = '[data-product-id]';
const MAIN_PRODUCTS_CONTAINER_ID = '#box_mainproducts';
const RELATED_PRODUCTS_CONTAINER_ID = '.product-related';

const CONTAINER_IDS_TO_DELETE = [
  '.mx_voteStars_container',
  '.price__regular',
  '.price__omnibus',
  '.price-netto',
  '.price del',
  '.product__currency',
  '.tm-hornet-container',
  '.tags',
];
const CONTAINERS_IDS_TO_CLEAR = [
  '.price__additional-info',
  '.product-short-description',
];

const PRODUCT_CONTAINERS: Record<TPages, string> = {
  shop_product_list: MAIN_PRODUCTS_CONTAINER_ID,
  shop_index: MAIN_PRODUCTS_CONTAINER_ID,
  shop_product: RELATED_PRODUCTS_CONTAINER_ID,
};

export {
  DATA_PRODUCT_ID,
  PRODUCT_ID_KEY,
  PRODUCT_CONTAINERS,
  PRODUCT_INACTIVE,
  PRODUCT_CONTAINER_ID,
  CONTAINER_IDS_TO_DELETE,
  CONTAINERS_IDS_TO_CLEAR,
};
