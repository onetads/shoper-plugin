import { TModalOptions, TUserOptions } from 'types/shop';
import { TProduct } from 'types/products';

declare global {
  namespace Shop {
    const pageType: string;
    const useroptions: TUserOptions;
    const Modal: new (arg: TModalOptions) => {
      createModal: () => void;
    };
    const QuickView: new () => {
      create: (arg: TProduct, arg2: JQuery) => void;
    };
    const AjaxBasket: new () => {
      sendAjax: (arg: HTMLFormElement) => void;
    };
    const lang: {
      quickview: {
        addtobasket: string;
        availability: string;
        delivery: string;
        evaluation: string;
        exchange: string;
        price: string;
        producer: string;
      };
    };
  }
}

export { TProduct };
