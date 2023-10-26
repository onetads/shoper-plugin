import { TPages } from 'types/pages';

const MAIN_PRODUCTS_CONTAINER_ID = 'box_mainproducts';
const RELATED_PRODUCTS_CONTAINER_ID = 'box_productrelated';

const DATA_PRODUCT_ID = 'data-product-id';
const PRODUCT_ID_KEY = 'productId';

const PRODUCT_INACTIVE = 'product_inactive';

const PRODUCTS_CLASSNAME = 'products';

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
  PRODUCTS_CLASSNAME,
};
