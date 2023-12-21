import { BODY_ID_NOT_FOUND } from 'consts/messages';
import { TFormatedProduct } from 'types/products';
import getMessage from 'utils/formatters/getMessage';

const validateProductsArray = (productsIds: TFormatedProduct[]) => {
  const bodyId = document.body.id;

  const findNumberRegex = /\d+/; // Check for nummber in strings like this: "shop_product22" -> 22
  const [foundId = null] = bodyId.match(findNumberRegex) || [];

  if (typeof foundId !== 'string') {
    throw new Error(getMessage(BODY_ID_NOT_FOUND));
  }

  return productsIds.filter(({ offerId }) => offerId !== foundId);
};

export default validateProductsArray;
