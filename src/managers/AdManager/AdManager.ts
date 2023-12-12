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
      dlApi.addKeyValue('area', area || '');
      dlApi.addKeyValue('keyvalues', {
        offer_ids: this.productsIds.toString(),
      });

      return;
    }

    const adPixelScript = document.createElement('script');
    const adPixelDepsScript = document.createElement('script');
    adPixelScript.type = 'text/javascript';
    adPixelScript.innerHTML = `
      dlApi={
        area: '${area || ''}',
        cmd: [],
        keyvalues: {
          offer_ids: ${JSON.stringify(this.productsIds)},
        },
        autoslot: 1,
      };
    `;

    adPixelDepsScript.src = AD_PIXEL_DEPS_URL;
    adPixelDepsScript.async = true;

    document.head.appendChild(adPixelScript);
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
    let resolveQueueCompletion: () => void;
    const queueCompleted = new Promise<void>((resolve) => {
      resolveQueueCompletion = resolve;
    });

    const timeoutPromise = new Promise<void>((resolve) => {
      setTimeout(() => {
        products = new Error(getMessage(REQUEST_TIMED_OUT));
        resolveQueueCompletion();
        resolve();
      }, MAX_TIMEOUT_MS);
    });

    (dlApi.cmd = dlApi.cmd || []).push(async (dlApiObj) => {
      await Promise.race([
        dlApiObj.fetchNativeAd!({
          slot: SLOT_NAME,
          opts: {
            offer_ids: this.productsIds.join(','),
          },
          tplCode: TPL_CODE,
        })
          .then((ads) => {
            const trackingAdLink = ads.meta.adclick;

            products = ads
              ? ads.fields.feed.offers.map(
                  ({ offer_id, offer_image, offer_url }) => ({
                    offerId: offer_id,
                    imageUrl: offer_image,
                    offerUrl: trackingAdLink + offer_url,
                  }),
                )
              : [];

            resolveQueueCompletion();
          })
          .catch(() => {
            products = new Error(getMessage(ERROR_PROMOTED_PRODUCTS_MSG));
            resolveQueueCompletion();
          }),
        timeoutPromise,
      ]);
    });

    const waitForProducts = async () => {
      await queueCompleted;

      if (products instanceof Error) {
        throw new Error(products.message);
      }

      return products as TFormatedProduct[];
    };

    return waitForProducts();
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
