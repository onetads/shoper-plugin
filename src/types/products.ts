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

type TProduct = {
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
  url: string;
  name: string;
  category: {
    name: string;
  };
};

export { EProductAvailability, EProductElements, TProduct, EProductQuickViews };
