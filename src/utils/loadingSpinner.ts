import { BASIC_TAG } from 'consts/common';
import {
  LOADING_SPINNER_CLASS,
  LOADING_SPINNER_LISTING_CONTAINER_CLASS,
  LOADING_SPINNER_ID,
  LOADING_SPINNER_STYLES,
  LOADING_SPINNER_RELATED_CONTAINER_CLASS,
  LOADING_SPINNER_ADDITIONAL_SPACING,
} from 'consts/loadingSpinner';
import {
  MAIN_PRODUCTS_CONTAINER_SELECTOR,
  PRODUCT_CONTAINER_SELECTOR,
  PRODUCT_OUTER_WRAPPER_SELECTOR,
  RELATED_PRODUCTS_CONTAINER_SELECTOR,
} from 'consts/products';

const createLoadingSpinner = (
  containerClass: string,
  ...loadingSpinnerClasses: string[]
) => {
  const loadingSpinnerContainer = document.createElement(BASIC_TAG);
  const loadingSpinner = document.createElement(BASIC_TAG);

  loadingSpinnerContainer.appendChild(loadingSpinner);
  loadingSpinnerContainer.id = LOADING_SPINNER_ID;

  loadingSpinnerContainer.className = containerClass;
  for (const className of loadingSpinnerClasses) {
    loadingSpinner.classList.add(className);
  }

  return loadingSpinnerContainer;
};

const showSpinnerInRelatedView = (productsContainer: HTMLElement) => {
  productsContainer.style.position = 'relative';
  productsContainer.style.visibility = 'hidden';

  const loadingSpinner = createLoadingSpinner(
    LOADING_SPINNER_RELATED_CONTAINER_CLASS,
    LOADING_SPINNER_CLASS,
  );
  productsContainer.insertAdjacentHTML('afterbegin', LOADING_SPINNER_STYLES);
  productsContainer.insertAdjacentElement('afterbegin', loadingSpinner);
};

const showSpinerInListingView = (productsContainer: HTMLElement) => {
  const productsInnerWrapper = productsContainer.querySelector(
    PRODUCT_CONTAINER_SELECTOR,
  ) as HTMLElement;

  const productsOuterWrapper = productsContainer.querySelector(
    PRODUCT_OUTER_WRAPPER_SELECTOR,
  ) as HTMLElement;

  if (!productsInnerWrapper || !productsOuterWrapper) return;

  const loadingSpinner = createLoadingSpinner(
    LOADING_SPINNER_LISTING_CONTAINER_CLASS,
    LOADING_SPINNER_ADDITIONAL_SPACING,
    LOADING_SPINNER_CLASS,
  );

  productsInnerWrapper.style.visibility = 'hidden';

  productsOuterWrapper.insertAdjacentHTML('afterbegin', LOADING_SPINNER_STYLES);
  productsOuterWrapper.insertAdjacentElement('afterbegin', loadingSpinner);
};

const showLoadingSpinner = () => {
  let productsContainer = document.querySelector(
    MAIN_PRODUCTS_CONTAINER_SELECTOR,
  ) as HTMLElement;

  if (!productsContainer) {
    productsContainer = document.querySelector(
      RELATED_PRODUCTS_CONTAINER_SELECTOR,
    ) as HTMLElement;

    if (!productsContainer) return;

    showSpinnerInRelatedView(productsContainer);
  } else {
    showSpinerInListingView(productsContainer);
  }
};

const hideLoadingSpinner = () => {
  const loadingSpinner = document.getElementById(LOADING_SPINNER_ID);
  if (!loadingSpinner) return;

  loadingSpinner.remove();

  let productsContainer = document.querySelector(
    MAIN_PRODUCTS_CONTAINER_SELECTOR,
  ) as HTMLElement;

  if (!productsContainer) {
    productsContainer = document.querySelector(
      RELATED_PRODUCTS_CONTAINER_SELECTOR,
    ) as HTMLElement;

    if (!productsContainer) return;

    productsContainer.style.visibility = 'visible';
  } else {
    const productsInnerWrapper = productsContainer.querySelector(
      PRODUCT_CONTAINER_SELECTOR,
    ) as HTMLElement;
    productsInnerWrapper.style.visibility = 'visible';
  }
};

export { showLoadingSpinner, hideLoadingSpinner };
