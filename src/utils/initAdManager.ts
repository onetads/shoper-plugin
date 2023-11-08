import AdManager from 'managers/AdManager';
import { TPages } from 'types/pages';

const initAdManager = (page: TPages | null) => new AdManager(page);

export default initAdManager;
