type TGetProduct = (productId: { id: number }) => {
  id: number;
  can_buy: boolean;
  availability: { name: string };
  delivery: { name: string };
  description: string;
  stockId: number;
  main_image_filename: string;
  main_image: string;
  price: {
    gross: {
      final: string;
    };
  };
  producer: {
    name: string;
    id: string;
  };
  shortDescription: string;
  url: string;
  name: string;
  category: {
    name: string;
  };
};

declare global {
  namespace Shop {
    const pageType: string;
  }

  namespace frontAPI {
    const getProduct: TGetProduct;
  }
}

export {};
