import { getProductsIds } from 'utils/getProductsIds';
import { getCurrentPageInfo } from './getCurrentPageInfo';
import { injectAdScript } from './injectAdScript';

const executePlugin = () => {
  const { type } = getCurrentPageInfo() || {};

  let products;

  if (type) {
    products = getProductsIds(type);
  }

  injectAdScript(type, products);
};

export { executePlugin };
