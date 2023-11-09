type TFetchNativeAdProductItem = {
  offer_id: number;
};

type TFetchNativeAdOptions = {
  slot: string;
  tplCode: string;
  opts: {
    offer_ids: string;
  };
};

type TFetchNativeAdResponse = {
  fields: {
    feed: {
      offers: TFetchNativeAdProductItem[];
    };
  };
};

export { TFetchNativeAdOptions, TFetchNativeAdResponse };
