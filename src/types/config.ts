type TSelectorReplace = {
  changeFrom: string;
  changeTo: string;
};

type TOnetAdsConfig = {
  shouldShowLoader: boolean;
  shouldRemoveDecimalFromProductPrice: boolean;
  productsCount: number;
  itemNumbers?: number[];
  selectors?: TSelectorReplace[];
  listingElementsToDelete?: string[];
};

export type { TOnetAdsConfig };
