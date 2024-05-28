type TSelectorReplace = {
  changeFrom: string;
  changeTo: string;
};

type TOnetAdsConfig = {
  shouldShowLoader: boolean;
  productsCount: number;
  selectors?: TSelectorReplace[];
  listingElementsToDelete?: string[];
};

export type { TOnetAdsConfig };
