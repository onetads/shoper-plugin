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
  }
}

export { TProduct };
