import { PRODUCT_PAGE } from 'consts/pages';
import {
  DATA_PRODUCT_ID,
  PRODUCTS_CLASSNAME,
  PRODUCT_CONTAINERS,
  PRODUCT_INACTIVE,
} from 'consts/products';
import { REPLACE_CONTENT_MAP } from 'consts/selectors';
import { TEMPLATES_MAP } from 'consts/templates';
import { TPages } from 'types/pages';
import { EProductAvailability, EProductElements } from 'types/products';
import { ETemplates } from 'types/templates';
import { EViews } from 'types/views';
import getCurrentPageInfo from 'utils/getCurrentPageInfo';

class TemplateManager {
  constructor() {
    const page = getCurrentPageInfo();

    if (!page) return;

    this.checkDOMforTemplates(page);

    console.log(this.templates);
  }

  private templates = Object.keys(ETemplates).reduce(
    (acc, currVal) => ({
      ...acc,
      [currVal]: localStorage.getItem(currVal),
    }),
    {},
  ) as Record<ETemplates, string | null>;

  private viewType: EViews | null;

  private checkDOMforTemplates(page: TPages) {
    const productsContainer = document.getElementById(PRODUCT_CONTAINERS[page]);

    if (!productsContainer) return;

    const productsElements = Array.from(
      productsContainer.querySelectorAll(`[${DATA_PRODUCT_ID}]`),
    );

    const productInnerWrapper = productsContainer.querySelector(
      `.${PRODUCTS_CLASSNAME}`,
    );

    if (!productInnerWrapper) return;

    const viewType = productInnerWrapper.className.includes(EViews.FULL)
      ? EViews.FULL
      : EViews.PHOTO;

    this.viewType = viewType;

    for (const productElement of productsElements) {
      if (!(productElement instanceof HTMLElement)) continue;

      const elementClasses = productElement.className.split(' ');

      // FIX ME - DOES NOT WORK FOR RELATED PRODUCTS IN PRODUCT PAGE
      elementClasses.forEach((className) => {
        if (className === PRODUCT_INACTIVE) {
          const mappedTemplate = this.getMappedTemplate({
            page,
            availability: EProductAvailability.INACTIVE,
            viewType,
          });

          if (this.getTemplate(mappedTemplate)) return;

          this.saveTemplateInLocalStorage(productElement, mappedTemplate);
        } else {
          const mappedTemplate = this.getMappedTemplate({
            page,
            availability: EProductAvailability.ACTIVE,
            viewType,
          });

          if (this.getTemplate(mappedTemplate)) return;

          this.saveTemplateInLocalStorage(productElement, mappedTemplate);
        }
      });
    }
  }

  private saveTemplateInLocalStorage(
    productElement: HTMLElement,
    mappedTemplate: ETemplates,
  ) {
    const preparedTemplate = this.prepareTemplate(productElement);

    if (!preparedTemplate) return;

    localStorage.setItem(mappedTemplate, preparedTemplate);
  }

  private getMappedTemplate({
    page,
    availability,
    viewType,
  }: {
    page: TPages;
    availability: EProductAvailability;
    viewType: EViews;
  }) {
    if (page === PRODUCT_PAGE) return TEMPLATES_MAP[page][availability];
    else return TEMPLATES_MAP[page][viewType][availability];
  }

  private prepareTemplate(productElement: HTMLElement) {
    const copiedProductElement = document.createElement('div');
    copiedProductElement.innerHTML = productElement.outerHTML;

    for (const property in REPLACE_CONTENT_MAP) {
      const { key, map } = REPLACE_CONTENT_MAP[property as EProductElements];

      const contentMap = [...map.default];

      if (this.viewType === EViews.FULL)
        contentMap.push(...(map.additional || []));

      contentMap.forEach(({ selector, replace }) => {
        const selectedElement = copiedProductElement.querySelector(selector);

        if (!selectedElement) {
          console.log('NOT FOUND!');
          return;
        }

        replace.forEach((item) => {
          if (item === 'content') {
            selectedElement.innerHTML = key;
          } else {
            selectedElement.setAttribute(item, key);
          }
        });
      });
    }

    if (
      !(
        copiedProductElement.firstElementChild &&
        copiedProductElement.firstElementChild.firstElementChild
      )
    )
      return;

    copiedProductElement.firstElementChild.replaceChildren(
      copiedProductElement.firstElementChild.firstElementChild,
    );

    return copiedProductElement.firstElementChild.outerHTML;
  }

  public getTemplate(template: ETemplates) {
    return this.templates[template];
  }
}

export default TemplateManager;
