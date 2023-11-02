import { INDEX_PAGE, LISTING_PAGE, PRODUCT_PAGE } from 'consts/pages';
import { EProductAvailability } from 'types/products';
import { ETemplates } from 'types/templates';
import { EViews } from 'types/views';

const PROBLEMATIC_TEMPLATES = [
  '#wce_default-skin-translation',
  '#wce_default-js-translation',
];
const TEMPLATES_MAP = {
  [PRODUCT_PAGE]: {
    [EProductAvailability.ACTIVE]: ETemplates.LIST_RELATED_PRODUCTS_AVAILABLE,
    [EProductAvailability.INACTIVE]:
      ETemplates.LIST_RELATED_PRODUCTS_NOT_AVAILABLE,
  },
  [LISTING_PAGE]: {
    [EViews.FULL]: {
      [EProductAvailability.ACTIVE]: ETemplates.LIST_FULL_AVAILABLE,
      [EProductAvailability.INACTIVE]: ETemplates.LIST_FULL_NOT_AVAILABLE,
    },
    [EViews.PHOTO]: {
      [EProductAvailability.ACTIVE]: ETemplates.LIST_PHOTO_AVAILABLE,
      [EProductAvailability.INACTIVE]: ETemplates.LIST_PHOTO_NOT_AVAILABLE,
    },
  },
  [INDEX_PAGE]: {
    [EViews.FULL]: {
      [EProductAvailability.ACTIVE]: ETemplates.LIST_FULL_AVAILABLE,
      [EProductAvailability.INACTIVE]: ETemplates.LIST_FULL_NOT_AVAILABLE,
    },
    [EViews.PHOTO]: {
      [EProductAvailability.ACTIVE]: ETemplates.LIST_PHOTO_AVAILABLE,
      [EProductAvailability.INACTIVE]: ETemplates.LIST_PHOTO_NOT_AVAILABLE,
    },
  },
};

const NOT_VALID_TEMPLATE = 'NOT_VALID_TEMPLATE';

export { TEMPLATES_MAP, NOT_VALID_TEMPLATE, PROBLEMATIC_TEMPLATES };
