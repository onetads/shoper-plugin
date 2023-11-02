import TemplateManager from './managers/TemplateManager';
import executePlugin from 'utils/executePlugin';

window.addEventListener('DOMContentLoaded', () => {
  if (window.Shop) {
    localStorage.clear();

    executePlugin();

    window.TemplateManager = new TemplateManager();
  }
});
