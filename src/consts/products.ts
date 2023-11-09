import { TPages } from 'types/pages';

const PRODUCT_ID_KEY = 'productId';
const PRODUCT_INACTIVE = 'product_inactive';
const PRODUCT_CLASS = 'product';
const CUSTOM_QUICK_VIEW_CLASS = 'custom-quick-view';

const PRODUCT_CONTAINER_SELECTOR = '.products';
const DATA_PRODUCT_ID = 'data-product-id';
const DATA_PRODUCT_SELECTOR = `div[${DATA_PRODUCT_ID}]`;
const MAIN_PRODUCTS_CONTAINER_SELECTOR = '#box_mainproducts';
const RELATED_PRODUCTS_CONTAINER_SELECTOR = '.product-related';

const CONTAINER_SELECTORS_TO_DELETE = [
  '.mx_voteStars_container',
  '.price__regular',
  '.price__omnibus',
  '.price-netto',
  '.price del',
  '.product__currency',
  '.tm-hornet-container',
  '.tags',
];
const CONTAINER_SELECTORS_TO_CLEAR = ['.price__additional-info'];

const PRODUCT_CONTAINERS: Record<TPages, string> = {
  shop_product_list: MAIN_PRODUCTS_CONTAINER_SELECTOR,
  shop_index: MAIN_PRODUCTS_CONTAINER_SELECTOR,
  shop_product: RELATED_PRODUCTS_CONTAINER_SELECTOR,
};

export {
  DATA_PRODUCT_ID,
  DATA_PRODUCT_SELECTOR,
  PRODUCT_ID_KEY,
  PRODUCT_CONTAINERS,
  PRODUCT_INACTIVE,
  PRODUCT_CONTAINER_SELECTOR,
  CONTAINER_SELECTORS_TO_DELETE,
  CONTAINER_SELECTORS_TO_CLEAR,
  RELATED_PRODUCTS_CONTAINER_SELECTOR,
  PRODUCT_CLASS,
  CUSTOM_QUICK_VIEW_CLASS,
};
