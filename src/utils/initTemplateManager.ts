import TemplateManager from 'managers/TemplateManager';
import { TPages } from 'types/pages';

const initTemplateManager = (page: TPages) => new TemplateManager(page);

export default initTemplateManager;
