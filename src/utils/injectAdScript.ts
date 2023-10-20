import { EAreas } from 'types/areas';
import { TPages } from 'types/pages';
import { getProductsIds } from './getProductsIds';

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
  page: TPages | undefined,
  offerIds: ReturnType<typeof getProductsIds> | undefined,
) => {
  const area = page ? mapPageToArea(page) : null;

  const dynamicScript = document.createElement('script');
  const externalScript = document.createElement('script');

  const areaContent = area ? 'area: "' + area + '",' : '';
  const offerIdsContent =
    offerIds !== undefined ? 'offer_ids: [' + offerIds + '],' : '';

  dynamicScript.type = 'text/javascript';

  dynamicScript.innerHTML =
    'dlApi={' +
    areaContent +
    'cmd: [],keyvalues: {website_id: ' +
    WEBSITE_ID +
    ',' +
    offerIdsContent +
    'autoslot: 1,}};';

  externalScript.src =
    'https://lib.onet.pl/s.csr/build/dlApi/minit.boot.min.js';
  externalScript.async = true;

  document.head.appendChild(dynamicScript);
  document.head.appendChild(externalScript);
};

export { injectAdScript };
