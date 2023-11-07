import initTemplateManager from 'utils/initTemplateManager';
import initAdManager from 'utils/initAdManager';
import runWhenPageReady from 'utils/runWhenPageReady';
import getCurrentPageInfo from 'utils/getCurrentPageInfo';

window.addEventListener('DOMContentLoaded', () => {
  runWhenPageReady(() => {
    const page = getCurrentPageInfo();
    const AdManager = initAdManager(page);
    AdManager.injectAdnPixelScript();

    if (page) {
      const TemplateManager = initTemplateManager(page);
      TemplateManager.checkDOMforTemplates();

      const promotedProducts = AdManager.getPromotedProducts();
      TemplateManager.injectProducts(promotedProducts);
    }
  });
});
