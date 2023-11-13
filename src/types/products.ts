enum EProductAvailability {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

enum EProductElements {
  ID = 'ID',
  IMG = 'IMG',
  PRODUCT_NAME = 'PRODUCT_NAME',
  PRODUCT_LINK = 'PRODUCT_LINK',
  PRICE = 'PRICE',
  CATEGORY = 'CATEGORY',
  PRODUCER = 'PRODUCER',
  PRODUCER_LINK = 'PRODUCER_LINK',
  AVAILABILITY = 'AVAILABILITY',
  DELIVERY = 'DELIVERY',
  DESCRIPTION = 'DESCRIPTION',
  STOCK_ID = 'STOCK_ID',
}

enum EProductQuickViews {
  MODAL = '1',
  DROPDOWN = '2',
}

enum EBasketModes {
  REDIRECT_REFRESH = 1,
  NO_REDIRECT_NO_REFRESH = 2,
  NO_REDIRECT_REFRESH = 3,
}

type TProduct = {
  error_description?: string;
  id: number;
  can_buy: boolean;
  availability: { name: string };
  delivery: { name: string };
  description: string;
  stockId: number;
  main_image_filename: string;
  main_image: string;
  rate: number;
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
  short_description: string;
  url: string;
  name: string;
  category: {
    name: string;
  };
  options_configuration: {
    id: number;
    name: string;
    order: number;
    required: boolean;
    stock: boolean;
    type: string;
  }[];
};

export {
  EProductAvailability,
  EProductElements,
  TProduct,
  EProductQuickViews,
  EBasketModes,
};
