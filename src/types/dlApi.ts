type TFetchNativeAdProductItem = {
  offer_id: number;
  offer_image: string;
  offer_url: string;
};

type TFetchNativeAdOptions = {
  slot: string;
  tplCode: string;
  opts: {
    offer_ids: string;
  };
};

type TFetchNativeAdResponse = {
  meta: {
    adclick: string;
  };
  fields: {
    feed: {
      offers: TFetchNativeAdProductItem[];
    };
  };
};

export { TFetchNativeAdOptions, TFetchNativeAdResponse };
