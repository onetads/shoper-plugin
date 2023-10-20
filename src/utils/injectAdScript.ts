import { EAreas } from 'types/areas';
import { TPages } from 'types/pages';
import { getProductsIds } from './getProductsIds';

const WEBSITE_ID = 17200; // TODO: MAKE IT DYNAMIC IN FUTURE!!!

const mapPageToArea = (page: TPages) => {
  const areas: Record<TPages, EAreas> = {
    category: EAreas.LISTING,
    index: EAreas.MAIN_PAGE,
    product: EAreas.PRODUCT_CARD,
  };

  return areas[page];
};

const injectAdScript = (
  page: TPages | undefined,
  offerIds: ReturnType<typeof getProductsIds> | undefined,
) => {
  const area = page ? mapPageToArea(page) : null;

  const firstScript = document.createElement('script');
  const secondScript = document.createElement('script');

  const areaContent = area ? 'area: "' + area + '",' : '';
  const offerIdsContent =
    offerIds !== undefined ? 'offer_ids: [' + offerIds + '],' : '';

  firstScript.type = 'text/javascript';

  firstScript.innerHTML =
    'dlApi={' +
    areaContent +
    'cmd: [],keyvalues: {website_id: ' +
    WEBSITE_ID +
    ',' +
    offerIdsContent +
    'autoslot: 1,}};';

  secondScript.src = 'https://lib.onet.pl/s.csr/build/dlApi/minit.boot.min.js';
  secondScript.async = true;

  document.head.appendChild(firstScript);
  document.head.appendChild(secondScript);
};

export { injectAdScript };
