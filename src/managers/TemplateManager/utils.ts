import { TPages } from 'types/pages';
import TemplateManager from 'managers/TemplateManager';
import runOutsideCallStack from 'utils/helpers/runOutsideCallStack';
import createSelector from 'utils/formatters/createSelector';
import { CUSTOM_QUICK_VIEW_CLASS } from 'consts/eventSelectors';

const initTemplateManager = (page: TPages) => new TemplateManager(page);

const attachAjaxCartEvent = (form: HTMLFormElement) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    Shop.AjaxBasket.prototype.sendAjax(form);
  });
};

const reinitQuickView = () => {
  runOutsideCallStack(() => {
    Shop.QuickView.prototype.initialize({
      ...Shop.QuickView.prototype.options,
      selectors: {
        ...Shop.QuickView.prototype.options.selectors,
        button: createSelector(CUSTOM_QUICK_VIEW_CLASS),
      },
    });
  });
};

const overrideProductStyles = (productElement: HTMLElement) => {
  const productImage = productElement.querySelector(
    '.img-wrap img',
  ) as HTMLElement;

  if (productImage) {
    productImage.style.opacity = '1';
  }

  return productElement;
};

export {
  initTemplateManager,
  attachAjaxCartEvent,
  reinitQuickView,
  overrideProductStyles,
};
