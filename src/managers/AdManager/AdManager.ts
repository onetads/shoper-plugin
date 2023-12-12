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

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(getMessage(REQUEST_TIMED_OUT)));
      }, MAX_TIMEOUT_MS);
    });

    let products: TFormatedProduct[] | null = null;
    let resolveQueueCompletion: () => void;
    const queueCompleted: Promise<void> = new Promise((resolve) => {
      resolveQueueCompletion = resolve;
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
            throw new Error(getMessage(ERROR_PROMOTED_PRODUCTS_MSG));
          }),
        timeoutPromise,
      ]);
    });

    const waitForProducts = async () => {
      await queueCompleted;
      return products;
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
