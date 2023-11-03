import { PRODUCT_PAGE } from 'consts/pages';
import {
  CONTAINERS_IDS_TO_CLEAR,
  CONTAINER_IDS_TO_DELETE,
  DATA_PRODUCT_ID,
  PRODUCT_CONTAINER_ID,
  PRODUCT_CONTAINERS,
  PRODUCT_INACTIVE,
} from 'consts/products';
import { BASKET_ID, CONTENT, REPLACE_CONTENT_MAP } from 'consts/selectors';
import {
  NOT_VALID_TEMPLATE,
  PROBLEMATIC_TEMPLATES,
  TEMPLATES_MAP,
} from 'consts/templates';
import { TPages } from 'types/pages';
import { EProductAvailability, EProductElements } from 'types/products';
import { ETemplates } from 'types/templates';
import { EViews } from 'types/views';
import getCurrentPageInfo from 'utils/getCurrentPageInfo';

class TemplateManager {
  constructor() {
    const page = getCurrentPageInfo();

    if (!page) return;

    this.page = page;

    this.checkDOMforTemplates(page);
  }

  private templates = Object.keys(ETemplates).reduce(
    (acc, currVal) => ({
      ...acc,
      [currVal]: localStorage.getItem(currVal),
    }),
    {},
  ) as Record<ETemplates, string | null>;

  private viewType: EViews = EViews.GRID_VIEW;
  private page: TPages | null = null;

  private checkDOMforTemplates(page: TPages) {
    const found = PROBLEMATIC_TEMPLATES.find((id) => {
      return !!document.head.querySelector(id);
    });

    if (found) {
      console.error('PROBLEMATIC TEMPLATE DETECTED');
      return;
    }

    const productsContainer = document.querySelector(PRODUCT_CONTAINERS[page]);

    if (!productsContainer) return;

    const productsElements = Array.from(
      productsContainer.querySelectorAll(`div${DATA_PRODUCT_ID}`),
    );

    const productInnerWrapper =
      productsContainer.querySelector(PRODUCT_CONTAINER_ID);

    if (productInnerWrapper) {
      const viewType = productInnerWrapper.className.includes(EViews.LIST_VIEW)
        ? EViews.LIST_VIEW
        : EViews.GRID_VIEW;

      this.viewType = viewType;
    }

    for (const productElement of productsElements) {
      if (!(productElement instanceof HTMLElement)) continue;

      const elementClasses = productElement.className.split(' ');

      elementClasses.forEach((className) => {
        if (
          className === PRODUCT_INACTIVE ||
          !productElement.querySelector('.product .basket .addtobasket')
        ) {
          this.saveTemplate(
            page,
            productElement,
            EProductAvailability.INACTIVE,
          );
        } else if (className === 'product') {
          this.saveTemplate(page, productElement, EProductAvailability.ACTIVE);
        }
      });
    }
  }

  private saveTemplate(
    page: TPages,
    productElement: HTMLElement,
    availability: EProductAvailability,
  ) {
    const mappedTemplate = this.getMappedTemplate({
      page,
      availability,
    });

    if (this.getTemplate(mappedTemplate)) return;

    this.saveTemplateInLocalStorage(productElement, mappedTemplate);
  }

  private saveTemplateInLocalStorage(
    productElement: HTMLElement,
    mappedTemplate: ETemplates,
  ) {
    const preparedTemplate = this.prepareTemplate(
      productElement,
      mappedTemplate,
    );

    if (!preparedTemplate) return;

    this.templates = { ...this.templates, [mappedTemplate]: preparedTemplate };
    localStorage.setItem(mappedTemplate, preparedTemplate);
  }

  private getMappedTemplate({
    page,
    availability,
  }: {
    page: TPages;
    availability: EProductAvailability;
  }) {
    if (page === PRODUCT_PAGE) {
      return TEMPLATES_MAP[page][availability];
    } else return TEMPLATES_MAP[page][this.viewType][availability];
  }

  private prepareTemplate(
    productElement: HTMLElement,
    mappedTemplate: ETemplates,
  ) {
    const copiedProductElement = document.createElement('div');
    copiedProductElement.innerHTML = productElement.outerHTML;

    let canInjectTemplate = true;

    for (const property in REPLACE_CONTENT_MAP) {
      if (!canInjectTemplate) break;

      const { key, map } = REPLACE_CONTENT_MAP[property as EProductElements];

      const contentMap = [];

      if (this.page === 'shop_product') {
        contentMap.push(...map.relatedView);
      } else {
        if (this.viewType === EViews.GRID_VIEW) {
          contentMap.push(...map.gridView);
        }

        if (this.viewType === EViews.LIST_VIEW) {
          contentMap.push(...map.listView);
        }
      }

      contentMap.forEach(
        ({ selector, replace, forActiveOnly, forNotActiveOnly, canBeNull }) => {
          if (!canInjectTemplate) return;

          if (
            forActiveOnly &&
            (mappedTemplate === ETemplates.LIST_VIEW_NOT_AVAILABLE ||
              mappedTemplate === ETemplates.GRID_VIEW_NOT_AVAILABLE)
          )
            return;

          if (
            forNotActiveOnly &&
            (mappedTemplate === ETemplates.LIST_VIEW_AVAILABLE ||
              mappedTemplate === ETemplates.GRID_VIEW_AVAILABLE)
          )
            return;

          const selectedElements =
            copiedProductElement.querySelectorAll(selector);

          if (!selectedElements.length && !canBeNull) {
            console.error(`SELECTOR NOT FOUND - ${selector}`);

            canInjectTemplate = false;
            return;
          }

          selectedElements.forEach((element) => {
            replace.forEach((item) => {
              if (item === CONTENT) {
                element.innerHTML = key;
                return;
              }

              if (item === BASKET_ID) {
                const actionContent = element.getAttribute('action');

                if (!actionContent) return;

                const findNumberRegex = /\d+/;

                element.setAttribute(
                  'action',
                  actionContent.replace(findNumberRegex, key),
                );
                return;
              }

              element.setAttribute(item, key);
            });
          });
        },
      );
    }

    CONTAINERS_IDS_TO_CLEAR.forEach((className) => {
      const elementToClear = copiedProductElement.querySelector(className);

      if (elementToClear) {
        elementToClear.innerHTML = '';
      }
    });

    CONTAINER_IDS_TO_DELETE.forEach((className) => {
      const element = copiedProductElement.querySelector(className);
      if (!element) return;

      element.remove();
    });

    if (!canInjectTemplate) return NOT_VALID_TEMPLATE;

    if (!copiedProductElement.firstElementChild) return;

    // clear productContainer to only have product innerwraper without any other items like tags
    const productContainer = copiedProductElement.children[0];
    productContainer.replaceChildren(productContainer.children[0]);

    return productContainer.outerHTML;
  }

  public getTemplate(template: ETemplates) {
    return this.templates[template];
  }
}

export default TemplateManager;
