import { TPages } from 'types/pages';
import TemplateManager from 'managers/TemplateManager';
import runOutsideCallStack from 'utils/runOutsideCallStack';
import createSelector from 'utils/createSelector';
import {
  CUSTOM_QUICK_VIEW_CLASS,
  AVAILABILITY_CONTAINER_CLASS_NEW,
  AVAILABILITY_BUTTON_CLASS_NEW,
} from 'consts/eventSelectors';

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

const reinitNotifyButton = () => {
  runOutsideCallStack(() => {
    Shop.ProductAvailability.prototype.initialize({
      ...Shop.ProductAvailability.prototype.options,
      selectors: {
        availabilitynotifier: createSelector(AVAILABILITY_CONTAINER_CLASS_NEW),
        availabilitynotifier_btn: createSelector(AVAILABILITY_BUTTON_CLASS_NEW),
      },
    });
  });
};

export {
  initTemplateManager,
  attachAjaxCartEvent,
  reinitQuickView,
  reinitNotifyButton,
};
