import TemplateManager from './managers/TemplateManager';
import executePlugin from 'utils/executePlugin';

window.addEventListener('DOMContentLoaded', () => {
  executePlugin();

  window.TemplateManager = new TemplateManager();
});
