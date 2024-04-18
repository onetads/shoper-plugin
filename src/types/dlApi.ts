type TFetchNativeAdProductItem = {
  offer_id: string;
  offer_image: string;
  offer_url: string;
};

type TFetchNativeAdOptions = {
  slot: string;
  tplCode: string;
  opts: {
    offer_ids: string;
    div: string;
  };
};

type TFetchNativeAdResponse = {
  render: () => void;
  meta: {
    adclick: string;
    dsaurl: string;
  };
  fields: {
    feed: {
      offers: TFetchNativeAdProductItem[];
    };
  };
};

export { TFetchNativeAdOptions, TFetchNativeAdResponse };
