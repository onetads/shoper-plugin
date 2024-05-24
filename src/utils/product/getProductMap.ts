import {
  PRODUCT_AVAILABILITY_KEY,
  PRODUCT_CATEGORY_KEY,
  PRODUCT_DELIVERY_KEY,
  PRODUCT_DESCRIPTION_KEY,
  PRODUCT_LINK_KEY,
  PRODUCT_NAME_KEY,
  PRODUCT_PRICE_KEY,
  PRODUCT_ID_KEY,
  PRODUCT_STOCK_ID_KEY,
  PRODUCT_IMAGE_URL_KEY,
  PRODUCT_PRODUCER_NAME_KEY,
  PRODUCT_PRODUCER_ID_KEY,
} from 'consts/replaceMap';
import { TProduct, TFormatedProduct } from 'types/products';

const getProductMap = (product: TProduct & TFormatedProduct) => {
  return {
    isActive: product.can_buy,
    attributes: product.attributes,
    images: product.images_filename,
    [PRODUCT_NAME_KEY]: product.name,
    [PRODUCT_STOCK_ID_KEY]: product.stockId,
    [PRODUCT_ID_KEY]: product.id,
    [PRODUCT_LINK_KEY]: product.offerUrl,
    [PRODUCT_PRODUCER_NAME_KEY]: product.producer?.name || '',
    [PRODUCT_PRODUCER_ID_KEY]: product.producer?.id || '',
    [PRODUCT_CATEGORY_KEY]: product.category.name,
    [PRODUCT_IMAGE_URL_KEY]: product.imageUrl,
    [PRODUCT_PRICE_KEY]: product.price.gross.final,
    [PRODUCT_AVAILABILITY_KEY]: product.availability.name,
    [PRODUCT_DELIVERY_KEY]: product.delivery.name,
    [PRODUCT_DESCRIPTION_KEY]: product.shortDescription,
  };
};

export default getProductMap;
