import { TPages } from 'types/pages';
import { EAreas } from 'types/areas';
import getMessage from 'utils/formatters/getMessage';
import {
  ERROR_PROMOTED_PRODUCTS_MSG,
  REQUEST_TIMED_OUT,
} from 'consts/messages';
import {
  AD_PIXEL_DEPS_URL,
  TPL_CODE,
  SLOT_NAME,
  MAX_TIMEOUT_MS,
} from 'consts/dlApi';
import { getProductsIds } from './utils';
import { TFormatedProduct } from 'types/products';
import { PRODUCT_IMAGE_PATH } from 'consts/products';

class AdManager {
  constructor(page: TPages | null) {
    this.page = page;

    if (this.page) {
      this.productsIds = getProductsIds(this.page);
    }
  }

  private page: TPages | null;
  private productsIds: ReturnType<typeof getProductsIds> | [];

  public injectAdnPixelScript = () => {
    const area = this.page ? this.mapPageToArea(this.page) : null;

    if (window.dlApi && dlApi.fetchNativeAd) {
      dlApi.area = area || 'ros';
      dlApi.addKeyValue('offer_ids', this.productsIds.toString());

      return;
    }

    const adPixelDepsScript = document.createElement('script');

    adPixelDepsScript.src = AD_PIXEL_DEPS_URL;
    adPixelDepsScript.async = true;

    document.head.appendChild(adPixelDepsScript);
  };

  public getPromotedProducts = async (isTestingEnvironment: boolean) => {
    if (isTestingEnvironment) {
      const product = frontAPI.getProduct({
        id: this.productsIds[this.productsIds.length - 1],
      });

      return [
        {
          offerId: product.id.toString(),
          imageUrl:
            window.location.origin +
            PRODUCT_IMAGE_PATH +
            product.main_image_filename,
          offerUrl: product.url,
        },
      ];
    }

    if (!dlApi.fetchNativeAd)
      throw new Error(getMessage(ERROR_PROMOTED_PRODUCTS_MSG));

    let products: TFormatedProduct[] | null | Error = null;

    const timeoutPromise = new Promise<void>((_, reject) => {
      setTimeout(() => {
        reject(getMessage(REQUEST_TIMED_OUT));
      }, MAX_TIMEOUT_MS);
    });

    const fetchNativeAd = new Promise<TFormatedProduct[]>((resolve, reject) => {
      dlApi.cmd = dlApi.cmd || [];
      dlApi.cmd.push(async (dlApiObj) => {
        try {
          const ads = await dlApiObj.fetchNativeAd!({
            slot: SLOT_NAME,
            opts: {
              offer_ids: this.productsIds.join(','),
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

          resolve(products);
        } catch (_) {
          reject(getMessage(ERROR_PROMOTED_PRODUCTS_MSG));
        }
      });
    });

    return (await Promise.race([fetchNativeAd, timeoutPromise])
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw new Error(error);
      })) as TFormatedProduct[];
  };

  private mapPageToArea = (page: TPages) => {
    const areas: Record<TPages, EAreas> = {
      shop_product_list: EAreas.LISTING,
      shop_product: EAreas.PRODUCT_CARD,
    };

    return areas[page];
  };
}

export default AdManager;
