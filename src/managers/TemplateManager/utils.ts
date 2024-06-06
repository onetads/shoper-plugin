import { TPages } from 'types/pages';
import TemplateManager from 'managers/TemplateManager';
import runOutsideCallStack from 'utils/helpers/runOutsideCallStack';
import createSelector from 'utils/formatters/createSelector';
import { CUSTOM_QUICK_VIEW_CLASS } from 'consts/eventSelectors';
import { TFinalProductData } from 'types/products';
import getMessage from 'utils/formatters/getMessage';
import {
  IMODULES_ATTRIBUTES_ERROR,
  IMODULES_IMAGES_ERROR,
} from 'consts/messages';
import { PRODUCT_IMAGE_PATH } from 'consts/products';
import { PRODUCT_IMAGE_URL_KEY } from 'consts/replaceMap';

const initTemplateManager = (page: TPages) => new TemplateManager(page);

const attachAjaxCartEvent = (form: HTMLFormElement) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    Shop.AjaxBasket.prototype.sendAjax(form);
  });
};

const reinitQuickView = () => {
  runOutsideCallStack(() => {
    Shop.QuickView.prototype.initialize({
      ...Shop.QuickView.prototype.options,
      selectors: {
        ...Shop.QuickView.prototype.options.selectors,
        button: createSelector(CUSTOM_QUICK_VIEW_CLASS),
      },
    });
  });
};

const overrideProductStyles = (productElement: HTMLElement) => {
  const productImage = productElement.querySelector(
    '.img-wrap img',
  ) as HTMLElement;

  if (productImage) {
    productImage.style.opacity = '1';
  }

  return productElement;
};

// IMODULES SUPPORT

const updateIModulesAttributesIfExist = (
  productElement: HTMLElement,
  mappedProduct: Omit<TFinalProductData, 'dsaUrl' | 'offerId'>,
) => {
  const attributes = mappedProduct.attributes;
  if (!attributes) return;

  const attributesElements = Array.from(
    productElement.querySelectorAll('.attr-item'),
  ) as HTMLElement[];

  let isAnyAttributeUpdated = false;

  for (const attribute of attributesElements) {
    const attrName = attribute.querySelector('em')?.textContent;
    const attrValue = attribute.querySelector('span');

    if (!attrName || !attrValue) {
      console.warn(getMessage(IMODULES_ATTRIBUTES_ERROR));
      continue;
    }

    attributes?.forEach((attr) => {
      if (attrName?.includes(attr.name)) {
        isAnyAttributeUpdated = true;
        attrValue.textContent = attr.value;
      }
    });
  }

  if (!isAnyAttributeUpdated) {
    attributesElements.forEach((attribute) => {
      attribute.remove();
    });
  }
};

const updateIModulesImagesIfExist = (
  productElement: HTMLElement,
  mappedProduct: Omit<TFinalProductData, 'dsaUrl' | 'offerId'>,
) => {
  const images = mappedProduct.images;
  if (!images) return;

  const imagesElements = Array.from(
    productElement.querySelectorAll('.slider-item'),
  ) as HTMLElement[];

  if (imagesElements.length === 0) return;

  if (images.length === 1) {
    imagesElements.forEach((image) => {
      image.remove();
    });

    return;
  }

  const mainImg = productElement.querySelector(
    '.prodimage img',
  ) as HTMLImageElement;

  let imgIndex = 0;

  for (const imageWrapper of imagesElements) {
    const image = imageWrapper.querySelector('img');

    if (!image) {
      console.warn(getMessage(IMODULES_IMAGES_ERROR));
      continue;
    }

    const imageName = images[imgIndex];

    if (!imageName) {
      imageWrapper.remove();
    }

    const imageUrl = window.location.origin + PRODUCT_IMAGE_PATH + imageName;

    image.loading = 'lazy';
    image.src = imageUrl;
    image.dataset.src = imageUrl;

    image.addEventListener('mouseenter', () => {
      mainImg.src = imageUrl;
    });

    image.addEventListener('mouseleave', () => {
      mainImg.src = mappedProduct[PRODUCT_IMAGE_URL_KEY];
    });

    imgIndex++;
  }
};

export {
  initTemplateManager,
  attachAjaxCartEvent,
  reinitQuickView,
  overrideProductStyles,
  updateIModulesAttributesIfExist,
  updateIModulesImagesIfExist,
};
