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
  PRODUCT_IMAGE_FILENAME_KEY,
  PRODUCT_MAIN_IMAGE_KEY,
  PRODUCT_PRODUCER_NAME_KEY,
  PRODUCT_PRODUCER_ID_KEY,
} from 'consts/replaceMap';
import { TProduct } from 'types/products';

const getProductMap = (product: TProduct) => {
  return {
    isActive: product.can_buy,
    [PRODUCT_NAME_KEY]: product.name,
    [PRODUCT_STOCK_ID_KEY]: product.stockId,
    [PRODUCT_ID_KEY]: product.id,
    [PRODUCT_LINK_KEY]: product.url,
    [PRODUCT_PRODUCER_NAME_KEY]: product.producer.name,
    [PRODUCT_PRODUCER_ID_KEY]: product.producer.id,
    [PRODUCT_CATEGORY_KEY]: product.category.name,
    [PRODUCT_IMAGE_FILENAME_KEY]: product.main_image_filename,
    [PRODUCT_MAIN_IMAGE_KEY]: product.main_image,
    [PRODUCT_PRICE_KEY]: product.price.gross.final,
    [PRODUCT_AVAILABILITY_KEY]: product.availability.name,
    [PRODUCT_DELIVERY_KEY]: product.delivery.name,
    [PRODUCT_DESCRIPTION_KEY]: product.shortDescription,
  };
};

export default getProductMap;
