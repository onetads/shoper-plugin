const ATTEMPTS_LIMIT_MSG = 'ATTEMPTS_LIMIT_MSG';
const SHOP_NOT_FOUND_MSG = 'SHOP_NOT_FOUND_MSG';
const PROBLEMATIC_TEMPLATE_MSG = 'PROBLEMATIC_TEMPLATE_MSG';
const SELECTOR_NOT_FOUND = 'SELECTOR_NOT_FOUND';
const SHOPER_REINITIATED_MSG = 'SHOPER_REINITIATED_MSG';
const PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND';
const ERROR_PROMOTED_PRODUCTS_MSG = 'ERROR_PROMOTED_PRODUCTS_MSG';
const EMPTY_LIST_WARN = 'EMPTY_LIST_WARN';
const REQUEST_TIMED_OUT = 'REQUEST_TIMED_OUT';
const PRODUCT_NOT_AVAILABLE = 'PRODUCT_NOT_AVAILABLE';
const BODY_ID_NOT_FOUND = 'BODY_ID_NOT_FOUND';
const NO_ADS_IN_RESPONSE = 'NO_ADS_IN_RESPONSE';
const EMPTY_ADS_ARRAY = 'EMPTY_ADS_ARRAY';

const messagesMap = {
  [ATTEMPTS_LIMIT_MSG]: 'Attempts limit exceeded',
  [SHOP_NOT_FOUND_MSG]: "Couldn't find global Shop object",
  [PROBLEMATIC_TEMPLATE_MSG]: 'Problematic template detected',
  [SELECTOR_NOT_FOUND]: 'Selector not found: ',
  [SHOPER_REINITIATED_MSG]: 'Shoper was already reinitiated',
  [PRODUCT_NOT_FOUND]: "Couldn't find product",
  [ERROR_PROMOTED_PRODUCTS_MSG]:
    'An error occured while fetching promoted products',
  [EMPTY_LIST_WARN]: "List is empty or product selector doesn't match",
  [REQUEST_TIMED_OUT]: 'Request timed out',
  [PRODUCT_NOT_AVAILABLE]: 'Product is not available in shop',
  [BODY_ID_NOT_FOUND]:
    'HTML body does not have an id with the following pattern: shop_productd{number}',
  [NO_ADS_IN_RESPONSE]: 'No ads in fetchNativeAd response',
  [EMPTY_ADS_ARRAY]: 'Empty ads array',
};

export {
  messagesMap,
  ATTEMPTS_LIMIT_MSG,
  SHOP_NOT_FOUND_MSG,
  PROBLEMATIC_TEMPLATE_MSG,
  SELECTOR_NOT_FOUND,
  SHOPER_REINITIATED_MSG,
  PRODUCT_NOT_FOUND,
  ERROR_PROMOTED_PRODUCTS_MSG,
  EMPTY_LIST_WARN,
  REQUEST_TIMED_OUT,
  PRODUCT_NOT_AVAILABLE,
  BODY_ID_NOT_FOUND,
  NO_ADS_IN_RESPONSE,
  EMPTY_ADS_ARRAY,
};
