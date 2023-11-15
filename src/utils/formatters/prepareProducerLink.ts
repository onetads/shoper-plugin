import {
  PRODUCT_PRODUCER_NAME_KEY,
  PRODUCT_PRODUCER_ID_KEY,
} from 'consts/replaceMap';

const prepareProducerLink = (element: HTMLImageElement) => {
  const hrefContent = element.getAttribute('href');

  if (!hrefContent) return '';

  const parts = hrefContent.split('/');

  parts[parts.length - 2] = PRODUCT_PRODUCER_NAME_KEY;
  parts[parts.length - 1] = PRODUCT_PRODUCER_ID_KEY;

  const modifiedString = parts.join('/');
  return modifiedString;
};

export default prepareProducerLink;
