import { initTemplateManager } from 'managers/TemplateManager/TemplateManager.utils';
import { initAdManager } from 'managers/AdManager/AdManager.utils';
import runWhenPageReady from 'utils/runWhenPageReady';
import getCurrentPageInfo from 'utils/getCurrentPageInfo';
import { hideLoadingSpinner, showLoadingSpinner } from 'utils/loadingSpinner';

showLoadingSpinner();

window.addEventListener('DOMContentLoaded', () => {
  runWhenPageReady(async () => {
    const page = getCurrentPageInfo();

    const AdManager = initAdManager(page);
    AdManager.injectAdnPixelScript();

    if (page) {
      const TemplateManager = initTemplateManager(page);
      TemplateManager.checkDOMforTemplates();

      const promotedProducts = await AdManager.getPromotedProducts();
      TemplateManager.injectProducts(promotedProducts);
      hideLoadingSpinner();
    }
  });
});
