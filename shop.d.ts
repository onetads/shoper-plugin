import { TProduct } from 'types/products';

type TGetProduct = (productId: { id: number }) => TProduct;

type TUserOptions = {
  ajaxbasket: {
    mode: number;
  };
};

type TModalOptions = {
  showMask: boolean;
  position: 'center' | 'top';
  positionType: 'fixed' | 'absolute';
  offset: number;
  header: string;
  content: string;
};

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
