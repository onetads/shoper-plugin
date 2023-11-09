import { TGetProduct } from 'types/frontAPI';
import { TProduct } from 'types/products';

declare global {
  namespace frontAPI {
    const getProduct: TGetProduct;
    const addToBasket: (arg: {
      lang?: string;
      currency?: string;
      data: {
        stock_id: number;
      };
    }) => {
      added: string;
      basket: {
        count: number;
      };
      _flash_messanger: {
        error: Array<string>;
        info: Array<string>;
        success: Array<string>;
        warning: Array<string>;
      };
    };
  }
}

export { TProduct };
