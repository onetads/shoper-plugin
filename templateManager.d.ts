import TemplateManager from './src/managers/TemplateManager';

declare global {
  interface Window {
    TemplateManager: TemplateManager;
  }
}

export {};
