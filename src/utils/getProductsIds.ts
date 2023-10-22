import {
  DATA_PRODUCT_ID,
  MAIN_PRODUCTS_CONTAINER_ID,
  PRODUCT_ID_KEY,
  RELATED_PRODUCTS_CONTAINER_ID,
} from 'consts/products';
import { TPages } from 'types/pages';

const productsContainers: Record<TPages, string> = {
  shop_product_list: MAIN_PRODUCTS_CONTAINER_ID,
  shop_index: MAIN_PRODUCTS_CONTAINER_ID,
  shop_product: RELATED_PRODUCTS_CONTAINER_ID,
};

const getProductsIds = (page: TPages) => {
  const productsContainer = document.getElementById(productsContainers[page]);

  if (!productsContainer) return [];

  const productElements = Array.from(
    productsContainer.querySelectorAll(`[${DATA_PRODUCT_ID}]`),
  );

  const productsIds = [];

  for (const productElement of productElements) {
    if (
      !(
        productElement instanceof HTMLElement &&
        PRODUCT_ID_KEY in productElement.dataset
      )
    )
      continue;

    const productId = productElement.dataset[PRODUCT_ID_KEY];
    if (!productId) continue;

    productsIds.push(+productId);
  }

  return productsIds;
};

export default getProductsIds;
