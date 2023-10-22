import getCurrentPageInfo from 'utils/getCurrentPageInfo';
import getProductsIds from 'utils/getProductsIds';
import injectAdScript from 'utils/injectAdScript';

const executePlugin = () => {
  const type = getCurrentPageInfo();

  let products;

  if (type) {
    products = getProductsIds(type);
  }

  injectAdScript(type, products);
};

export default executePlugin;
