import AdManager from 'managers/AdManager/AdManager';
import { TPages } from 'types/pages';
import { EMPTY_LIST_WARN } from 'consts/messages';
import getMessage from 'utils/formatters/getMessage';
import {
  DATA_PRODUCT_SELECTOR,
  PRODUCT_CONTAINERS,
  PRODUCT_ID_KEY,
  PRODUCT_IMAGE_PATH,
} from 'consts/products';
import { TProduct } from 'types/products';
import getProductMap from 'utils/product/getProductMap';

const initAdManager = (page: TPages | null) => new AdManager(page);

const getProductsIds = (page: TPages) => {
  const productsContainer = document.querySelector(PRODUCT_CONTAINERS[page]);

  if (!productsContainer) return [];

  const productElements = Array.from(
    productsContainer.querySelectorAll(DATA_PRODUCT_SELECTOR),
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

  if (!productsIds.length) {
    console.warn(getMessage(EMPTY_LIST_WARN));
  }

  return productsIds;
};

const getTestData = (product: TProduct) => {
  return [
    {
      ...getProductMap({
        ...product,
        offerId: product.id.toString(),
        imageUrl:
          window.location.origin +
          PRODUCT_IMAGE_PATH +
          product.main_image_filename,
        offerUrl: product.url,
        dsaUrl: product.url,
      }),
      offerId: product.id.toString(),
      dsaUrl: product.url,
      renderAd: () => {},
    },
  ];
};

export { getProductsIds, initAdManager, getTestData };
