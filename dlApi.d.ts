import { TFetchNativeAdOptions, TFetchNativeAdResponse } from 'types/dlApi';

declare global {
  namespace dlApi {
    let area: string;
    let keyvalues: {
      offer_ids: string;
      website_id: number;
    };

    const fetchNativeAd:
      | undefined
      | ((options: TFetchNativeAdOptions) => Promise<TFetchNativeAdResponse>);

    const addKeyValue: (
      key: string,
      value: string | Record<string, string>,
    ) => void;
  }
}

export {};
