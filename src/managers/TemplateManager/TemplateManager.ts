import { PRODUCT_PAGE } from 'consts/pages';
import {
  CONTAINER_SELECTORS_TO_CLEAR,
  CONTAINER_SELECTORS_TO_DELETE,
  DATA_PRODUCT_SELECTOR,
  PRODUCT_CONTAINER_SELECTOR,
  PRODUCT_CONTAINERS,
  RELATED_PRODUCTS_CONTAINER_SELECTOR,
  PRODUCT_CLASS,
  PRODUCT_INACTIVE,
  LAYERS_STYLES,
  ONET_PRODUCT_CLASS,
} from 'consts/products';
import {
  ADD_TO_CART_SELECTOR,
  QUICK_VIEW_SELECTOR,
  CUSTOM_QUICK_VIEW_CLASS,
} from 'consts/eventSelectors';
import {
  BASKET_ID,
  CONTENT,
  PRODUCT_IMAGE_URL_KEY,
  REPLACE_CONTENT_MAP,
} from 'consts/replaceMap';
import { BASIC_TAG } from 'consts/common';
import {
  NOT_VALID_TEMPLATE,
  PROBLEMATIC_TEMPLATES,
  TEMPLATES_MAP,
} from 'consts/templates';
import { TPages } from 'types/pages';
import {
  EProductElements,
  EProductQuickViews,
  EBasketModes,
  TFinalProductData,
} from 'types/products';
import { ETemplates } from 'types/templates';
import { EViews } from 'types/views';

import getMessage from 'utils/formatters/getMessage';

import deleteProductFromDOM from 'utils/product/deleteProductFromDOM';
import {
  attachAjaxCartEvent,
  overrideProductStyles,
  reinitQuickView,
  updateIModulesAttributesIfExist,
  updateIModulesImagesIfExist,
} from './utils';

import {
  PROBLEMATIC_TEMPLATE_MSG,
  SELECTOR_NOT_FOUND,
  SHOPER_REINITIATED_MSG,
} from 'consts/messages';
import markProductAsPromoted from 'utils/product/markProductAsPromoted';
import applyStyles from 'utils/helpers/applyStyles';
import { ONET_SPONSORED_DIV } from 'consts/dlApi';
import validateProductsArray from 'utils/product/validateProductsArray';
import prepareReplaceMap from 'utils/helpers/prepareReplaceMap';

class TemplateManager {
  constructor(page: TPages) {
    if (!page) return;
    this.page = page;
  }

  private templates = Object.keys(ETemplates).reduce(
    (acc, currVal) => ({
      ...acc,
      [currVal]: sessionStorage.getItem(currVal),
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
      throw new Error(getMessage(PROBLEMATIC_TEMPLATE_MSG));
    }

    if (!this.page) return;
    const productsContainer = document.querySelector(
      PRODUCT_CONTAINERS[this.page],
    );

    if (!productsContainer) return null;

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
      const currentTemplate = this.getTemplate(
        this.getMappedTemplate({ page: this.page }),
      );

      if (!(productElement instanceof HTMLElement)) continue;

      const elementClassList = productElement.classList;

      if (
        elementClassList.contains(PRODUCT_CLASS) &&
        !elementClassList.contains(PRODUCT_INACTIVE)
      ) {
        this.saveTemplate(this.page, productElement);
        if (currentTemplate === NOT_VALID_TEMPLATE) break;
      }
    }
  };

  private saveTemplate = (page: TPages, productElement: HTMLElement) => {
    const mappedTemplate = this.getMappedTemplate({
      page,
    });

    this.saveTemplateInSessionStorage(productElement, mappedTemplate);
  };

  private saveTemplateInSessionStorage = (
    productElement: HTMLElement,
    mappedTemplate: ETemplates,
  ) => {
    const preparedTemplate = this.prepareTemplate(productElement);

    if (!preparedTemplate) return;

    this.templates = { ...this.templates, [mappedTemplate]: preparedTemplate };
    sessionStorage.setItem(mappedTemplate, preparedTemplate);
  };

  public getMappedTemplate = ({ page }: { page: TPages }) => {
    if (page === PRODUCT_PAGE) {
      return TEMPLATES_MAP[page];
    } else return TEMPLATES_MAP[page][this.viewType];
  };

  private prepareTemplate = (productElement: HTMLElement) => {
    const copiedProductElement = document.createElement(BASIC_TAG);
    copiedProductElement.innerHTML = productElement.outerHTML;

    let canInjectTemplate = true;
    const replaceMap = prepareReplaceMap(REPLACE_CONTENT_MAP);

    for (const property in replaceMap) {
      if (!canInjectTemplate) break;

      const { key, map } = replaceMap[property as EProductElements];

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

      contentMap.forEach(({ selector, replace, canBeNull, prepareValue }) => {
        if (!canInjectTemplate) return;

        const selectedElements =
          copiedProductElement.querySelectorAll(selector);

        if (!selectedElements.length && !canBeNull) {
          canInjectTemplate = false;
          console.warn(getMessage(SELECTOR_NOT_FOUND) + selector);
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

            if (
              key === PRODUCT_IMAGE_URL_KEY &&
              element instanceof HTMLImageElement
            )
              element.loading = 'lazy';

            const newValue = prepareValue ? prepareValue(element) : key;

            element.setAttribute(item, newValue);
          });
        });
      });
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

    if (
      addToCartForm &&
      Shop.useroptions.ajaxbasket.mode === EBasketModes.NO_REDIRECT_NO_REFRESH
    ) {
      attachAjaxCartEvent(addToCartForm);
    }

    if (
      quickViewButton?.getAttribute('data-eval') === EProductQuickViews.MODAL ||
      quickViewButton?.getAttribute('data-eval') ===
        EProductQuickViews.MODAL_CUSTOM
    ) {
      quickViewButton.classList.add(CUSTOM_QUICK_VIEW_CLASS);
    }

    return productBox;
  };

  public injectProducts = (products: TFinalProductData[]) => {
    const currentPage = this.page;

    const preparedProducts =
      this.page === PRODUCT_PAGE ? validateProductsArray(products) : products;

    for (let i = 0; i < preparedProducts.length; i++) {
      const productData = preparedProducts[i];

      const { offerId, dsaUrl, ...mappedProduct } = productData;

      let template;

      if (currentPage === PRODUCT_PAGE) {
        template = this.getTemplate(ETemplates.LIST_RELATED_PRODUCTS);
      } else {
        template = this.getTemplate(
          this.viewType === EViews.LIST_VIEW
            ? ETemplates.LIST_VIEW
            : ETemplates.GRID_VIEW,
        );
      }

      if (template === NOT_VALID_TEMPLATE || template === null) return;

      let modifiedTemplate = template;
      for (const key in mappedProduct) {
        const objKey = key as keyof typeof mappedProduct;

        const value = mappedProduct[objKey];

        if (!value) continue;

        modifiedTemplate = modifiedTemplate?.replaceAll(
          new RegExp(key, 'g'),
          value.toString(),
        );
      }
      const productsWrapper = document.querySelector(
        this.page === PRODUCT_PAGE
          ? RELATED_PRODUCTS_CONTAINER_SELECTOR
          : PRODUCT_CONTAINER_SELECTOR,
      );

      const productWithEvents = this.getProductWithCustoms(modifiedTemplate);

      updateIModulesAttributesIfExist(productWithEvents, mappedProduct);
      updateIModulesImagesIfExist(productWithEvents, mappedProduct);

      const markedProduct = markProductAsPromoted(
        productWithEvents,
        dsaUrl,
        this.page,
      );

      markedProduct.id = ONET_SPONSORED_DIV;
      markedProduct.classList.add(ONET_PRODUCT_CLASS);

      // children[0] - sponsored text, children[1] product area with image
      const productArea = markedProduct?.children?.[1] as HTMLElement;
      applyStyles(productArea, LAYERS_STYLES);

      deleteProductFromDOM(+offerId);
      productsWrapper?.insertBefore(
        overrideProductStyles(markedProduct),
        productsWrapper.firstChild,
      );

      productData.renderAd();

      const listingElementsToDelete =
        window.OnetAdsConfig?.listingElementsToDelete;

      if (listingElementsToDelete && listingElementsToDelete.length > 0) {
        listingElementsToDelete.forEach((selector) => {
          const element = document.querySelector(selector);
          if (element) {
            element.remove();
          }
        });
      }
    }

    if (!this.wasShoperReinitiated) {
      reinitQuickView();

      this.wasShoperReinitiated = true;
    } else {
      throw new Error(getMessage(SHOPER_REINITIATED_MSG));
    }
  };

  public deleteExistingSponsoredProducts() {
    const sponsoredProducts = document.querySelectorAll(
      `.${ONET_PRODUCT_CLASS}`,
    );

    sponsoredProducts.forEach((product) => {
      product.remove();
    });
  }
}

export default TemplateManager;
