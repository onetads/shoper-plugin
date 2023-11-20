import { initTemplateManager } from 'managers/TemplateManager/utils';
import { initAdManager } from 'managers/AdManager/utils';
import runWhenPageReady from 'utils/helpers/runWhenPageReady';
import getCurrentPageInfo from 'utils/helpers/getCurrentPageInfo';
import {
  hideLoadingSpinner,
  showLoadingSpinner,
} from 'utils/components/loadingSpinner';
import { NOT_VALID_TEMPLATE } from 'consts/templates';
import getIsAnyTemplateInvalid from 'utils/helpers/getIsAnyTemplateInvalid';

const isAnyTemplateInvalid = getIsAnyTemplateInvalid();

if (!isAnyTemplateInvalid) {
  showLoadingSpinner();

  window.addEventListener('DOMContentLoaded', async () => {
    try {
      const page = getCurrentPageInfo();

      if (page) {
        const AdManager = initAdManager(page);
        AdManager.injectAdnPixelScript();

        await runWhenPageReady(async () => {
          const TemplateManager = initTemplateManager(page);
          TemplateManager.checkDOMforTemplates();

          const { getMappedTemplate, getTemplate } = TemplateManager;

          const isInvalidTemplate =
            getTemplate(getMappedTemplate({ page })) === NOT_VALID_TEMPLATE;

          if (!isInvalidTemplate) {
            const promotedProducts = await AdManager.getPromotedProducts();
            TemplateManager.injectProducts(promotedProducts);
          }

          hideLoadingSpinner();
        });
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        hideLoadingSpinner();
      }
    }
  });
}
