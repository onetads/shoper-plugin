import {
  DATA_PRODUCT_ID,
  PRODUCT_CONTAINERS,
  PRODUCT_ID_KEY,
} from 'consts/products';
import { TPages } from 'types/pages';

const getProductsIds = (page: TPages) => {
  const productsContainer = document.getElementById(PRODUCT_CONTAINERS[page]);

  if (!productsContainer) return [];

  const productElements = Array.from(
    productsContainer.querySelectorAll(DATA_PRODUCT_ID),
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
