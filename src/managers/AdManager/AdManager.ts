import { TPages } from 'types/pages';
import getMessage from 'utils/formatters/getMessage';
import {
  EMPTY_ADS_ARRAY,
  ERROR_PROMOTED_PRODUCTS_MSG,
  NO_ADS_IN_RESPONSE,
  PRODUCT_NOT_AVAILABLE,
  REQUEST_TIMED_OUT,
} from 'consts/messages';
import {
  TPL_CODE,
  SLOT_NAME,
  MAX_TIMEOUT_MS,
  ONET_SPONSORED_DIV,
} from 'consts/dlApi';
import { getProductsIds, getTestData } from './utils';
import { TFinalProductData } from 'types/products';
import getProductData from 'utils/product/getProductData';
import getProductMap from 'utils/product/getProductMap';

class AdManager {
  constructor(page: TPages | null) {
    this.page = page;

    if (this.page) {
      this.productsIds = getProductsIds(this.page);
    }
  }

  private page: TPages | null;
  private productsIds: ReturnType<typeof getProductsIds> | [];

  public getPromotedProducts = async (
    isTestingEnvironment: boolean,
  ): Promise<TFinalProductData[]> => {
    if (isTestingEnvironment) {
      const product = frontAPI.getProduct({
        id: this.productsIds[this.productsIds.length - 1],
      });

      return getTestData(product);
    }

    if (!dlApi.fetchNativeAd)
      throw new Error(getMessage(ERROR_PROMOTED_PRODUCTS_MSG));

    const timeoutPromise = new Promise<void>((_, reject) => {
      setTimeout(() => {
        reject(getMessage(REQUEST_TIMED_OUT));
      }, MAX_TIMEOUT_MS);
    });

    const productsCount = window.OnetAdsConfig.productsCount;

    const fetchNativeAd = new Promise<TFinalProductData[]>(
      (resolve, reject) => {
        const finalProducts: TFinalProductData[] = [];
        const fetchPromises: Promise<void>[] = [];

        dlApi.cmd = dlApi.cmd || [];
        dlApi.cmd.push((dlApiObj) => {
          for (let index = 1; index <= productsCount; index++) {
            const div = ONET_SPONSORED_DIV + index;

            const fetchPromise = dlApiObj.fetchNativeAd!({
              slot: SLOT_NAME,
              opts: {
                pos: index,
                offer_ids: this.productsIds.join(','),
              },
              div,
              tplCode: TPL_CODE,
              asyncRender: true,
            }).then((ads) => {
              if (
                ads &&
                ads.fields.feed.offers &&
                ads.fields.feed.offers.length
              ) {
                const trackingAdLink = ads.meta.adclick;
                const dsaUrl = ads.meta.dsaurl;
                const { offers = [] } = ads.fields.feed;

                if (offers.length > 0) {
                  const {
                    offer_id: productId,
                    offer_image: productImageUrl,
                    offer_url: productUrl,
                  } = offers[0];

                  const product = getProductData(Number(productId));

                  const { isActive, ...mappedProduct } = getProductMap({
                    ...product,
                    offerId: productId,
                    imageUrl: productImageUrl,
                    offerUrl: trackingAdLink + productUrl,
                    dsaUrl: dsaUrl,
                  });

                  if (isActive) {
                    finalProducts.push({
                      renderAd: ads.render,
                      ...mappedProduct,
                      isActive,
                      offerId: productId,
                      dsaUrl: dsaUrl,
                    });
                  } else {
                    console.warn(
                      getMessage(PRODUCT_NOT_AVAILABLE),
                      `ID: ${productId}`,
                    );
                  }

                  resolve(finalProducts);
                } else {
                  reject(getMessage(EMPTY_ADS_ARRAY));
                }
              } else {
                console.warn(getMessage(NO_ADS_IN_RESPONSE));
              }
            });

            fetchPromises.push(fetchPromise);
          }
        });

        Promise.all(fetchPromises)
          .then(() => resolve(finalProducts))
          .catch(() => {
            reject(getMessage(ERROR_PROMOTED_PRODUCTS_MSG));
          });
      },
    );

    return (await Promise.race([fetchNativeAd, timeoutPromise])
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw new Error(error);
      })) as TFinalProductData[];
  };
}

export default AdManager;
