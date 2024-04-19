import { TPages } from 'types/pages';
import getMessage from 'utils/formatters/getMessage';
import {
  ERROR_PROMOTED_PRODUCTS_MSG,
  PRODUCT_NOT_AVAILABLE,
  PRODUCT_NOT_FOUND,
  REQUEST_TIMED_OUT,
} from 'consts/messages';
import {
  TPL_CODE,
  SLOT_NAME,
  MAX_TIMEOUT_MS,
  ONET_SPONSORED_DIV,
} from 'consts/dlApi';
import { getProductsIds, getTestData } from './utils';
import { TFinalProductData, TFormatedProduct } from 'types/products';
import { PRODUCT_PAGE } from 'consts/pages';
import validateProductsArray from 'utils/product/validateProductsArray';
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

    let products: TFormatedProduct[] | null | Error = null;

    const timeoutPromise = new Promise<void>((_, reject) => {
      setTimeout(() => {
        reject(getMessage(REQUEST_TIMED_OUT));
      }, MAX_TIMEOUT_MS);
    });

    const fetchNativeAd = new Promise<TFinalProductData[]>(
      (resolve, reject) => {
        dlApi.cmd = dlApi.cmd || [];
        dlApi.cmd.push(async (dlApiObj) => {
          try {
            const ads = await dlApiObj.fetchNativeAd!({
              slot: SLOT_NAME,
              opts: {
                offer_ids: this.productsIds.join(','),
                div: ONET_SPONSORED_DIV,
              },
              tplCode: TPL_CODE,
            });

            const trackingAdLink = ads.meta.adclick;
            const dsaUrl = ads.meta.dsaurl;
            const { offers = [] } = ads.fields.feed;

            products = offers.map(({ offer_id, offer_image, offer_url }) => ({
              offerId: offer_id,
              imageUrl: offer_image,
              offerUrl: trackingAdLink + offer_url,
              dsaUrl: dsaUrl,
            }));

            const preparedProducts =
              this.page === PRODUCT_PAGE
                ? validateProductsArray(products)
                : products;

            const notFoundIds: string[] = [];
            const finalProducts = [];

            for (const productData of preparedProducts) {
              const product = getProductData(Number(productData.offerId));

              let isActive: boolean;
              let mappedProduct: Omit<
                ReturnType<typeof getProductMap>,
                'isActive'
              >;

              try {
                ({ isActive, ...mappedProduct } = getProductMap({
                  ...product,
                  ...productData,
                }));
              } catch (error) {
                console.warn(
                  getMessage(PRODUCT_NOT_AVAILABLE),
                  `ID: ${productData.offerId}`,
                );
                notFoundIds.push(productData.offerId);

                continue;
              }

              if (!isActive) {
                console.warn(
                  getMessage(PRODUCT_NOT_AVAILABLE),
                  `ID: ${productData.offerId}`,
                );
                notFoundIds.push(productData.offerId);

                continue;
              }

              finalProducts.push({
                renderAd: ads.render,
                ...mappedProduct,
                isActive,
                offerId: productData.offerId,
                dsaUrl: productData.dsaUrl,
              });
            }

            if (notFoundIds.length === finalProducts.length) {
              throw new Error(getMessage(PRODUCT_NOT_FOUND));
            }

            resolve(finalProducts);
          } catch (_) {
            reject(getMessage(ERROR_PROMOTED_PRODUCTS_MSG));
          }
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
