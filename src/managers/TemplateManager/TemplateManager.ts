import { PRODUCT_PAGE } from 'consts/pages';
import {
  CONTAINER_SELECTORS_TO_CLEAR,
  CONTAINER_SELECTORS_TO_DELETE,
  DATA_PRODUCT_SELECTOR,
  PRODUCT_CONTAINER_SELECTOR,
  PRODUCT_CONTAINERS,
  PRODUCT_INACTIVE,
  RELATED_PRODUCTS_CONTAINER_SELECTOR,
  PRODUCT_CLASS,
  DATA_PRODUCT_ID,
} from 'consts/products';
import {
  ADD_TO_CART_SELECTOR,
  AVAILABILITY_CONTAINER_CLASS,
  AVAILABILITY_BUTTON_CLASS,
  QUICK_VIEW_SELECTOR,
  AVAILABILITY_BUTTON_CLASS_NEW,
  AVAILABILITY_CONTAINER_CLASS_NEW,
  CUSTOM_QUICK_VIEW_CLASS,
} from 'consts/eventSelectors';
import {
  BASKET_ID,
  CONTENT,
  PRODUCT_AVAILABILITY_KEY,
  PRODUCT_CATEGORY_KEY,
  PRODUCT_DELIVERY_KEY,
  PRODUCT_DESCRIPTION_KEY,
  PRODUCT_LINK_KEY,
  PRODUCT_NAME_KEY,
  PRODUCT_PRICE_KEY,
  PRODUCT_ID_KEY,
  PRODUCT_STOCK_ID_KEY,
  REPLACE_CONTENT_MAP,
  PRODUCT_IMAGE_FILENAME_KEY,
  PRODUCT_MAIN_IMAGE_KEY,
  PRODUCT_PRODUCER_NAME_KEY,
  PRODUCT_PRODUCER_ID_KEY,
} from 'consts/replaceMap';
import { BASIC_TAG } from 'consts/common';
import {
  NOT_VALID_TEMPLATE,
  PROBLEMATIC_TEMPLATES,
  TEMPLATES_MAP,
} from 'consts/templates';
import createSelector from 'utils/createSelector';
import { TPages } from 'types/pages';
import {
  EProductAvailability,
  EProductElements,
  TProduct,
  EProductQuickViews,
  EBasketModes,
} from 'types/products';
import { ETemplates } from 'types/templates';
import { EViews } from 'types/views';

import {
  attachAjaxCartEvent,
  reinitNotifyButton,
  reinitQuickView,
} from './TemplateManager.utils';
import getMessage from 'utils/getMessage';
import {
  PROBLEMATIC_TEMPLATE_MSG,
  PRODUCT_NOT_FOUND,
  SELECTOR_NOT_FOUND,
  SHOPER_REINITIATED_MSG,
} from 'consts/messages';
import { hideLoadingSpinner } from 'utils/loadingSpinner';

class TemplateManager {
  constructor(page: TPages) {
    if (!page) return;
    this.page = page;
  }

  private templates = Object.keys(ETemplates).reduce(
    (acc, currVal) => ({
      ...acc,
      [currVal]: localStorage.getItem(currVal),
    }),
    {},
  ) as Record<ETemplates, string | null>;

  private viewType: EViews = EViews.GRID_VIEW;
  private wasShoperReinitiated: boolean = false;
  private page: TPages;

  public checkDOMforTemplates = () => {
    const hasProblematicTemplates = PROBLEMATIC_TEMPLATES.find((id) => {
      return !!document.head.querySelector(id);
    });

    if (hasProblematicTemplates) {
      hideLoadingSpinner();
      throw new Error(getMessage(PROBLEMATIC_TEMPLATE_MSG));
    }

    if (!this.page) return;
    const productsContainer = document.querySelector(
      PRODUCT_CONTAINERS[this.page],
    );

    if (!productsContainer) return;

    const productsElements = Array.from(
      productsContainer.querySelectorAll(DATA_PRODUCT_SELECTOR),
    );

    const productInnerWrapper = productsContainer.querySelector(
      PRODUCT_CONTAINER_SELECTOR,
    );

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
            this.page,
            productElement,
            EProductAvailability.INACTIVE,
          );
        } else if (className === PRODUCT_CLASS) {
          this.saveTemplate(
            this.page,
            productElement,
            EProductAvailability.ACTIVE,
          );
        }
      });
    }

    console.log(this.templates);
  };

  private saveTemplate = (
    page: TPages,
    productElement: HTMLElement,
    availability: EProductAvailability,
  ) => {
    const mappedTemplate = this.getMappedTemplate({
      page,
      availability,
    });

    this.saveTemplateInLocalStorage(productElement, mappedTemplate);
  };

  private saveTemplateInLocalStorage = (
    productElement: HTMLElement,
    mappedTemplate: ETemplates,
  ) => {
    const preparedTemplate = this.prepareTemplate(
      productElement,
      mappedTemplate,
    );

    if (!preparedTemplate) return;

    this.templates = { ...this.templates, [mappedTemplate]: preparedTemplate };
    localStorage.setItem(mappedTemplate, preparedTemplate);
  };

  private getMappedTemplate = ({
    page,
    availability,
  }: {
    page: TPages;
    availability: EProductAvailability;
  }) => {
    if (page === PRODUCT_PAGE) {
      return TEMPLATES_MAP[page][availability];
    } else return TEMPLATES_MAP[page][this.viewType][availability];
  };

  private prepareTemplate = (
    productElement: HTMLElement,
    mappedTemplate: ETemplates,
  ) => {
    const copiedProductElement = document.createElement(BASIC_TAG);
    copiedProductElement.innerHTML = productElement.outerHTML;

    let canInjectTemplate = true;

    for (const property in REPLACE_CONTENT_MAP) {
      if (!canInjectTemplate) break;

      const { key, map } = REPLACE_CONTENT_MAP[property as EProductElements];

      const contentMap = [];

      if (this.page === PRODUCT_PAGE) {
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
        ({
          selector,
          replace,
          forActiveOnly,
          forNotActiveOnly,
          canBeNull,
          prepareValue,
        }) => {
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
            canInjectTemplate = false;
            throw new Error(getMessage(SELECTOR_NOT_FOUND) + selector);
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

              const newValue = prepareValue ? prepareValue(element) : key;

              element.setAttribute(item, newValue);
            });
          });
        },
      );
    }

    CONTAINER_SELECTORS_TO_CLEAR.forEach((className) => {
      const elementToClear = copiedProductElement.querySelector(className);

      if (elementToClear) {
        elementToClear.innerHTML = '';
      }
    });

    CONTAINER_SELECTORS_TO_DELETE.forEach((className) => {
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
  };

  public getTemplate = (template: ETemplates) => {
    return this.templates[template];
  };

  private getProduct = (id: number) => frontAPI.getProduct({ id: id });

  private getProductMap = (product: TProduct) => {
    return {
      isActive: product.can_buy,
      [PRODUCT_NAME_KEY]: product.name,
      [PRODUCT_STOCK_ID_KEY]: product.stockId,
      [PRODUCT_ID_KEY]: product.id,
      [PRODUCT_LINK_KEY]: product.url,
      [PRODUCT_PRODUCER_NAME_KEY]: product.producer.name,
      [PRODUCT_PRODUCER_ID_KEY]: product.producer.id,
      [PRODUCT_CATEGORY_KEY]: product.category.name,
      [PRODUCT_IMAGE_FILENAME_KEY]: product.main_image_filename,
      [PRODUCT_MAIN_IMAGE_KEY]: product.main_image,
      [PRODUCT_PRICE_KEY]: product.price.gross.final,
      [PRODUCT_AVAILABILITY_KEY]: product.availability.name,
      [PRODUCT_DELIVERY_KEY]: product.delivery.name,
      [PRODUCT_DESCRIPTION_KEY]: product.shortDescription,
    };
  };

  private getProductWithCustoms = (productElement: string): HTMLElement => {
    const elemWrapper = document.createElement(BASIC_TAG);
    elemWrapper.innerHTML = productElement;
    const productBox = elemWrapper.firstChild as HTMLElement;
    const quickViewButton = productBox.querySelector(
      QUICK_VIEW_SELECTOR,
    ) as HTMLElement;
    const addToCartForm = productBox.querySelector(
      ADD_TO_CART_SELECTOR,
    ) as HTMLFormElement;
    const availabilityNotifyContainer = productBox.querySelector(
      createSelector(AVAILABILITY_CONTAINER_CLASS),
    ) as HTMLElement;

    if (
      addToCartForm &&
      Shop.useroptions.ajaxbasket.mode === EBasketModes.NO_REDIRECT_NO_REFRESH
    ) {
      attachAjaxCartEvent(addToCartForm);
    }

    if (
      quickViewButton &&
      quickViewButton.getAttribute('data-eval') === EProductQuickViews.MODAL
    ) {
      quickViewButton.classList.add(CUSTOM_QUICK_VIEW_CLASS);
    }

    if (availabilityNotifyContainer) {
      const availabilityButton = availabilityNotifyContainer.querySelector(
        createSelector(AVAILABILITY_BUTTON_CLASS),
      );
      availabilityNotifyContainer.classList.add(
        AVAILABILITY_CONTAINER_CLASS_NEW,
      );
      if (availabilityButton) {
        availabilityButton.classList.add(AVAILABILITY_BUTTON_CLASS_NEW);
      }
    }

    return productBox;
  };

  private deleteExistingProductId = (id: number) => {
    const existingProductWithSameId = document.querySelector(
      `div[${DATA_PRODUCT_ID}="${id}"]`,
    );

    if (!existingProductWithSameId) return;

    existingProductWithSameId.remove();
  };

  public injectProducts = (productsIds: number[]) => {
    productsIds.forEach((id) => {
      const product = this.getProduct(id);

      if (product.error_description) {
        hideLoadingSpinner();
        throw new Error(getMessage(PRODUCT_NOT_FOUND));
      }

      const { isActive, ...mappedProduct } = this.getProductMap(product);

      let template;
      const currentPage = this.page;

      if (isActive) {
        if (currentPage === PRODUCT_PAGE) {
          template = this.getTemplate(
            ETemplates.LIST_RELATED_PRODUCTS_AVAILABLE,
          );
        } else {
          template = this.getTemplate(
            this.viewType === EViews.LIST_VIEW
              ? ETemplates.LIST_VIEW_AVAILABLE
              : ETemplates.GRID_VIEW_AVAILABLE,
          );
        }
      } else {
        if (currentPage === PRODUCT_PAGE) {
          template = this.getTemplate(
            ETemplates.LIST_RELATED_PRODUCTS_NOT_AVAILABLE,
          );
        } else {
          template = this.getTemplate(
            this.viewType === EViews.LIST_VIEW
              ? ETemplates.LIST_VIEW_NOT_AVAILABLE
              : ETemplates.GRID_VIEW_NOT_AVAILABLE,
          );
        }
      }
      if (template === NOT_VALID_TEMPLATE || template === null) return;

      let modifiedTemplate = template;
      for (const key in mappedProduct) {
        const objKey = key as keyof typeof mappedProduct;

        modifiedTemplate = modifiedTemplate?.replaceAll(
          new RegExp(key, 'g'),
          mappedProduct[objKey].toString(),
        );
      }
      const productsWrapper = document.querySelector(
        this.page === PRODUCT_PAGE
          ? RELATED_PRODUCTS_CONTAINER_SELECTOR
          : PRODUCT_CONTAINER_SELECTOR,
      );

      const productWithEvents = this.getProductWithCustoms(modifiedTemplate);

      this.deleteExistingProductId(id);
      productsWrapper?.insertBefore(
        productWithEvents,
        productsWrapper.firstChild,
      );
    });

    if (!this.wasShoperReinitiated) {
      reinitNotifyButton();
      reinitQuickView();

      this.wasShoperReinitiated = true;
    } else {
      hideLoadingSpinner();
      throw new Error(getMessage(SHOPER_REINITIATED_MSG));
    }
  };
}

export default TemplateManager;
