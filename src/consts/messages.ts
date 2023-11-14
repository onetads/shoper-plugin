const ATTEMPTS_LIMIT_MSG = 'ATTEMPTS_LIMIT_MSG';
const SHOP_NOT_FOUND_MSG = 'SHOP_NOT_FOUND_MSG';
const PROBLEMATIC_TEMPLATE_MSG = 'PROBLEMATIC_TEMPLATE_MSG';
const SELECTOR_NOT_FOUND = 'SELECTOR_NOT_FOUND';
const SHOPER_REINITIATED_MSG = 'SHOPER_REINITIATED_MSG';
const PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND';
const ERROR_PROMOTED_PRODUCTS_MSG = 'ERROR_PROMOTED_PRODUCTS_MSG';
const EMPTY_LIST_WARN = 'EMPTY_LIST_WARN';
const REQUEST_TIMED_OUT = 'REQUEST_TIMED_OUT';

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
};
