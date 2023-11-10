import { BASIC_TAG } from 'consts/common';
import {
  LOADING_SPINNER_CLASS,
  LOADING_SPINNER_CONTAINER_CLASS,
  LOADING_SPINNER_ID,
  LOADING_SPINNER_STYLES,
} from 'consts/loadingSpinner';
import {
  MAIN_PRODUCTS_CONTAINER_SELECTOR,
  PRODUCT_CONTAINERS,
  PRODUCT_CONTAINER_SELECTOR,
  PRODUCT_OUTER_WRAPPER_SELECTOR,
  RELATED_PRODUCTS_CONTAINER_SELECTOR,
} from 'consts/products';
import { TPages } from 'types/pages';

const showLoadingSpinner = () => {
  let productsContainer = document.querySelector(
    MAIN_PRODUCTS_CONTAINER_SELECTOR,
  );

  if (!productsContainer) {
    productsContainer = document.querySelector(
      RELATED_PRODUCTS_CONTAINER_SELECTOR,
    );
  }

  if (!productsContainer) return;

  const productsInnerWrapper = productsContainer.querySelector(
    PRODUCT_CONTAINER_SELECTOR,
  ) as HTMLElement;

  const productsOuterWrapper = productsContainer.querySelector(
    PRODUCT_OUTER_WRAPPER_SELECTOR,
  ) as HTMLElement;

  if (!productsInnerWrapper || !productsOuterWrapper) return;

  const loadingSpinnerContainer = document.createElement(BASIC_TAG);
  const loadingSpinner = document.createElement(BASIC_TAG);

  loadingSpinnerContainer.appendChild(loadingSpinner);
  loadingSpinnerContainer.id = LOADING_SPINNER_ID;

  loadingSpinnerContainer.className = LOADING_SPINNER_CONTAINER_CLASS;
  loadingSpinner.className = LOADING_SPINNER_CLASS;

  productsInnerWrapper.style.visibility = 'hidden';

  productsOuterWrapper.insertAdjacentHTML('afterbegin', LOADING_SPINNER_STYLES);
  productsOuterWrapper.insertAdjacentElement(
    'afterbegin',
    loadingSpinnerContainer,
  );
};

const hideLoadingSpinner = (page: TPages) => {
  if (!page) return;

  const loadingSpinner = document.getElementById(LOADING_SPINNER_ID);

  const productsContainer = document.querySelector(PRODUCT_CONTAINERS[page]);

  const productsInnerWrapper = productsContainer?.querySelector(
    PRODUCT_CONTAINER_SELECTOR,
  ) as HTMLElement;

  if (loadingSpinner) {
    loadingSpinner.remove();
    productsInnerWrapper.style.visibility = 'visible';
  }
};

export { showLoadingSpinner, hideLoadingSpinner };
