import {
  PRODUCT_MAIN_IMAGE_KEY,
  PRODUCT_IMAGE_FILENAME_KEY,
} from 'consts/replaceMap';

const prepareImageValue = (element: HTMLImageElement) => {
  let srcValue = element.getAttribute('data-src') || '';

  if (!srcValue) {
    srcValue = element.getAttribute('src') || '';
  }

  const replacedString = srcValue.replace(
    /productGfx_\d+/,
    `productGfx_${PRODUCT_MAIN_IMAGE_KEY}`,
  );

  const finalString =
    replacedString.replace(/\/[^/]+$/, '') + `/${PRODUCT_IMAGE_FILENAME_KEY}`;

  return finalString;
};

export default prepareImageValue;
