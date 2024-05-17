type TSelectorReplace = {
  changeFrom: string;
  changeTo: string;
};

type TOnetAdsConfig = {
  shouldShowLoader: boolean;
  productsCount: number;
  selectors?: TSelectorReplace[];
};

export type { TOnetAdsConfig };
