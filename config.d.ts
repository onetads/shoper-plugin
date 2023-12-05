import { TOnetAdsConfig } from 'types/config';

declare global {
  interface Window {
    OnetAdsConfig: TOnetAdsConfig;
  }
}

export {};
