import { DATA_PRODUCT_ID } from 'consts/products';

const deleteExistingProductId = (id: number) => {
  const existingProductWithSameId = document.querySelector(
    `div[${DATA_PRODUCT_ID}="${id}"]`,
  );

  if (!existingProductWithSameId) return;

  existingProductWithSameId.remove();
};

export default deleteExistingProductId;
