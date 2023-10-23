import { EAreas } from 'types/areas';
import { TPages } from 'types/pages';
import getProductsIds from 'utils/getProductsIds';

const WEBSITE_ID = 17200; // TODO: MAKE IT DYNAMIC IN FUTURE!!!

const mapPageToArea = (page: TPages) => {
  const areas: Record<TPages, EAreas> = {
    shop_product_list: EAreas.LISTING,
    shop_index: EAreas.MAIN_PAGE,
    shop_product: EAreas.PRODUCT_CARD,
  };

  return areas[page];
};

const injectAdScript = (
  page: TPages | null,
  offerIds: ReturnType<typeof getProductsIds>,
) => {
  const area = page ? mapPageToArea(page) : null;

  const adPixelScript = document.createElement('script');
  const adPixelDepsScript = document.createElement('script');

  adPixelScript.type = 'text/javascript';

  adPixelScript.innerHTML = `
  dlApi={
    area: '${area || ''}',
    cmd: [],
    keyvalues: {
      website_id: ${WEBSITE_ID},
      offer_ids: ${JSON.stringify(offerIds)},
    },
    autoslot: 1,
  };
 `;

  adPixelDepsScript.src =
    'https://lib.onet.pl/s.csr/build/dlApi/minit.boot.min.js';
  adPixelDepsScript.async = true;

  document.head.appendChild(adPixelScript);
  document.head.appendChild(adPixelDepsScript);
};

export default injectAdScript;
