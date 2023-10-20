import { getProductsIds } from 'utils/getProductsIds';
import { detectCurrentPageType } from './detectCurrentPageType';
import { injectAdScript } from './injectAdScript';

const executePlugin = () => {
  const { type } = detectCurrentPageType() || {};

  let products;

  if (type === 'category' || type === 'product') {
    products = getProductsIds(type);
  }

  injectAdScript(type, products);
};

export { executePlugin };
