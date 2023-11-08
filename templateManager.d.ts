import TemplateManager from './src/managers/TemplateManager/TemplateManager';

declare global {
  interface Window {
    TemplateManager: TemplateManager;
  }
}

export {};
