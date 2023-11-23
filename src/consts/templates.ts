import { INDEX_PAGE, LISTING_PAGE, PRODUCT_PAGE } from 'consts/pages';
import { ETemplates } from 'types/templates';
import { EViews } from 'types/views';

const PROBLEMATIC_TEMPLATES = [
  '#wce_default-skin-translation',
  '#wce_default-js-translation',
];

const TEMPLATES_MAP = {
  [PRODUCT_PAGE]: ETemplates.LIST_RELATED_PRODUCTS,
  [LISTING_PAGE]: {
    [EViews.LIST_VIEW]: ETemplates.LIST_VIEW,
    [EViews.GRID_VIEW]: ETemplates.GRID_VIEW,
  },
  [INDEX_PAGE]: {
    [EViews.LIST_VIEW]: ETemplates.LIST_VIEW,
    [EViews.GRID_VIEW]: ETemplates.GRID_VIEW,
  },
};

const NOT_VALID_TEMPLATE = 'NOT_VALID_TEMPLATE';

export { TEMPLATES_MAP, NOT_VALID_TEMPLATE, PROBLEMATIC_TEMPLATES };
