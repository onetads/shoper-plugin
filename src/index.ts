import TemplateManager from './managers/TemplateManager';
import executePlugin from 'utils/executePlugin';

window.onload = () => {
  if (window.Shop) {
    executePlugin();

    window.TemplateManager = new TemplateManager();

    window.TemplateManager.injectProduct();
  }
};
