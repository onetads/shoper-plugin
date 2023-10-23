import getCurrentPageInfo from 'utils/getCurrentPageInfo';
import getProductsIds from 'utils/getProductsIds';
import injectAdScript from 'utils/injectAdScript';

const executePlugin = () => {
  const type = getCurrentPageInfo();

  const products = type ? getProductsIds(type) : [];

  injectAdScript(type, products);
};

export default executePlugin;
