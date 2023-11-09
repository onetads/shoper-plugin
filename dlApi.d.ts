import { TFetchNativeAdOptions, TFetchNativeAdResponse } from 'types/dlApi';

declare global {
  namespace dlApi {
    const fetchNativeAd: (
      options: TFetchNativeAdOptions,
    ) => Promise<TFetchNativeAdResponse>;
  }
}

export {};
