import { initTemplateManager } from 'managers/TemplateManager/TemplateManager.utils';
import { initAdManager } from 'managers/AdManager/AdManager.utils';
import runWhenPageReady from 'utils/runWhenPageReady';
import getCurrentPageInfo from 'utils/getCurrentPageInfo';
import { hideLoadingSpinner, showLoadingSpinner } from 'utils/loadingSpinner';

showLoadingSpinner();

window.addEventListener('DOMContentLoaded', () => {
  try {
    const page = getCurrentPageInfo();

    if (!page) return;

    const AdManager = initAdManager(page);
    AdManager.injectAdnPixelScript();

    runWhenPageReady(async () => {
      const TemplateManager = initTemplateManager(page);
      TemplateManager.checkDOMforTemplates();

      const promotedProducts = await AdManager.getPromotedProducts();
      TemplateManager.injectProducts(promotedProducts);
      hideLoadingSpinner();
    });
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      hideLoadingSpinner();
    }
  }
});
