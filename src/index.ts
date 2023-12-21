import { initTemplateManager } from 'managers/TemplateManager/utils';
import { initAdManager } from 'managers/AdManager/utils';
import runWhenPageReady from 'utils/helpers/runWhenPageReady';
import getCurrentPageInfo from 'utils/helpers/getCurrentPageInfo';
import {
  hideLoadingSpinner,
  showLoadingSpinner,
} from 'utils/components/loadingSpinner';
import { NOT_VALID_TEMPLATE } from 'consts/templates';

const isTestingEnvironment = process.env.IS_TEST_ENV === 'true';

showLoadingSpinner();

const runApp = async () => {
  try {
    const page = getCurrentPageInfo();

    if (page) {
      const AdManager = initAdManager(page);
      AdManager.injectAdnPixelScript();

      await runWhenPageReady(async () => {
        const TemplateManager = initTemplateManager(page);
        const doesContainerExists = TemplateManager.checkDOMforTemplates();

        const { getMappedTemplate, getTemplate } = TemplateManager;

        const isInvalidTemplate =
          getTemplate(getMappedTemplate({ page })) === NOT_VALID_TEMPLATE;

        if (!isInvalidTemplate && doesContainerExists !== null) {
          const promotedProducts =
            await AdManager.getPromotedProducts(isTestingEnvironment);

          TemplateManager.injectProducts(promotedProducts);
        }
      });
    }
    hideLoadingSpinner();
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      hideLoadingSpinner();
    }
  }
};

if (document.readyState !== 'loading') {
  await runApp();
} else {
  window.addEventListener('DOMContentLoaded', async () => {
    await runApp();
  });
}
