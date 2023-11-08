import { TPages } from 'types/pages';
import { EAreas } from 'types/areas';
import { getProductsIds } from './AdManager.utils';

class AdManager {
  constructor(page: TPages | null) {
    this.page = page;
    this.websiteId = 17200;

    if (this.page) {
      this.productsIds = getProductsIds(this.page);
    }
  }

  private page: TPages | null;
  private productsIds: ReturnType<typeof getProductsIds> | [];
  private websiteId: number;

  public injectAdnPixelScript = () => {
    const area = this.page ? this.mapPageToArea(this.page) : null;

    const adPixelScript = document.createElement('script');
    const adPixelDepsScript = document.createElement('script');
    adPixelScript.type = 'text/javascript';
    adPixelScript.innerHTML = `
      dlApi={
        area: '${area || ''}',
        cmd: [],
        keyvalues: {
          website_id: ${this.websiteId},
          offer_ids: ${JSON.stringify(this.productsIds)},
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

  public getPromotedProducts = () => {
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    fetch(
      `https://csr.onet.pl/1746213/csr-006/csr.json?kvwebsite_id=${this.websiteId}&kvoffer_ids=${this.productsIds}&area=unknown&slot0=rmn-sponsored-product&ems_url=1`,
      options,
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));

    // just placeholder, fix me later
    return [31];
  };

  private mapPageToArea = (page: TPages) => {
    const areas: Record<TPages, EAreas> = {
      shop_product_list: EAreas.LISTING,
      shop_index: EAreas.MAIN_PAGE,
      shop_product: EAreas.PRODUCT_CARD,
    };

    return areas[page];
  };
}

export default AdManager;
