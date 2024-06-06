import { TPages } from 'types/pages';

const ONET_PRODUCT_CLASS = 'onet-sponsored-product';

const PRODUCT_IMAGE_PATH = '/userdata/gfx/';

const PRODUCT_ID_KEY = 'productId';
const PRODUCT_INACTIVE = 'product_inactive';
const PRODUCT_CLASS = 'product';

const PRODUCT_CONTAINER_SELECTOR = '#box_mainproducts .products';
const PRODUCT_OUTER_WRAPPER_SELECTOR = '.innerbox';
const DATA_PRODUCT_ID = 'data-product-id';
const DATA_PRODUCT_SELECTOR = `[${DATA_PRODUCT_ID}]`;
const MAIN_PRODUCTS_CONTAINER_SELECTOR = '#box_mainproducts';
const RELATED_PRODUCTS_CONTAINER_SELECTOR = '.product-related';

const CONTAINER_SELECTORS_TO_DELETE = [
  '.votecount',
  '.fx-rate',
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
  shop_product: RELATED_PRODUCTS_CONTAINER_SELECTOR,
};

const LAYERS_STYLES = {
  'z-index': '1',
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
  PRODUCT_CLASS,
  MAIN_PRODUCTS_CONTAINER_SELECTOR,
  RELATED_PRODUCTS_CONTAINER_SELECTOR,
  PRODUCT_OUTER_WRAPPER_SELECTOR,
  PRODUCT_IMAGE_PATH,
  LAYERS_STYLES,
  ONET_PRODUCT_CLASS,
};
