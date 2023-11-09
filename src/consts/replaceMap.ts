import { EProductElements } from 'types/products';
import { TReplaceContentMap } from 'types/templates';

import prepareImageValue from 'utils/prepareImageValue';
import prepareProducerLink from 'utils/prepareProducerLink';

const PRODUCT_NAME_KEY = '{{ PRODUCT_NAME_KEY }}';
const PRODUCT_LINK_KEY = '{{ PRODUCT_LINK_KEY }}';
const PRODUCT_PRODUCER_NAME_KEY = '{{ PRODUCT_PRODUCER_NAME_KEY }}';
const PRODUCT_PRODUCER_ID_KEY = '{{ PRODUCT_PRODUCER_ID_KEY }}';
const PRODUCT_ID_KEY = '{{ PRODUCT_ID_KEY }}';
const PRODUCT_CATEGORY_KEY = '{{ PRODUCT_CATEGORY_KEY }}';
const PRODUCT_MAIN_IMAGE_KEY = '{{ PRODUCT_MAIN_IMAGE_KEY }}';
const PRODUCT_IMAGE_FILENAME_KEY = '{{ PRODUCT_IMAGE_FILENAME_KEY }}';
const PRODUCT_PRICE_KEY = '{{ PRODUCT_PRICE_KEY }}';
const PRODUCT_AVAILABILITY_KEY = '{{ PRODUCT_AVAILABILITY_KEY }}';
const PRODUCT_DELIVERY_KEY = '{{ PRODUCT_DELIVERY_KEY }}';
const PRODUCT_DESCRIPTION_KEY = '{{ PRODUCT_DESCRIPTION_KEY }}';
const PRODUCT_STOCK_ID_KEY = '{{ PRODUCT_STOCK_ID_KEY }}';

const CONTENT = 'CONTENT';
const BASKET_ID = 'BASKET_ID';

const REPLACE_CONTENT_MAP: Record<EProductElements, TReplaceContentMap> = {
  [EProductElements.ID]: {
    key: PRODUCT_ID_KEY,
    map: {
      gridView: [
        {
          selector: '.product',
          replace: ['data-product-id'],
        },
        {
          selector: '.buttons .quickview',
          canBeNull: true,
          replace: ['data-id'],
        },
        {
          canBeNull: true,
          forNotActiveOnly: true,
          selector: '.availability-notifier-btn',
          replace: ['data-product-id'],
        },
      ],
      listView: [
        {
          selector: '.product',
          replace: ['data-product-id'],
        },
        {
          canBeNull: true,
          forNotActiveOnly: true,
          selector: '.availability-notifier-btn',
          replace: ['data-product-id'],
        },
      ],
      relatedView: [
        {
          selector: '.product',
          replace: ['data-product-id'],
        },
      ],
    },
  },

  [EProductElements.IMG]: {
    key: PRODUCT_MAIN_IMAGE_KEY,
    map: {
      gridView: [
        {
          selector: '.img-wrap img',
          replace: ['data-src', 'src'],
          prepareValue: prepareImageValue,
        },
        {
          canBeNull: true,
          selector: '.img-wrap img[srcset]',
          replace: ['srcset'],
          prepareValue: prepareImageValue,
        },
      ],
      listView: [
        {
          selector: '.img-wrap img',
          replace: ['src', 'data-src'],
          prepareValue: prepareImageValue,
        },
        {
          canBeNull: true,
          selector: '.img-wrap img[srcset]',
          replace: ['srcset'],
          prepareValue: prepareImageValue,
        },
      ],
      relatedView: [
        {
          selector: '.details img',
          replace: ['src'],
          prepareValue: prepareImageValue,
        },
      ],
    },
  },
  [EProductElements.PRODUCT_NAME]: {
    key: PRODUCT_NAME_KEY,
    map: {
      gridView: [
        {
          selector: '.prodimage',
          replace: ['title'],
        },
        {
          selector: '.img-wrap img',
          replace: ['alt'],
        },
        {
          selector: '.prodname',
          replace: ['title'],
        },
        {
          selector: '.productname',
          replace: [CONTENT],
        },
        {
          canBeNull: true,
          forNotActiveOnly: true,
          selector: '.availability-notifier-btn',
          replace: ['data-product-name'],
        },
      ],
      listView: [
        {
          canBeNull: true,
          selector: '.description h3 a',
          replace: ['title', CONTENT],
        },
        {
          selector: '.prodimage',
          replace: ['title'],
        },
        {
          selector: '.img-wrap img',
          replace: ['alt'],
        },
        {
          selector: '.prodname',
          replace: ['title'],
        },
        {
          selector: '.productname',
          replace: [CONTENT],
        },
        {
          canBeNull: true,
          forNotActiveOnly: true,
          selector: '.availability-notifier-btn',
          replace: ['data-product-name'],
        },
      ],
      relatedView: [
        {
          selector: 'h3 a',
          replace: ['title'],
        },
        {
          selector: '.productname',
          replace: [CONTENT],
        },
        {
          selector: '.details',
          replace: ['title'],
        },
        {
          selector: '.details img',
          replace: ['alt'],
        },
      ],
    },
  },
  [EProductElements.PRODUCT_LINK]: {
    key: PRODUCT_LINK_KEY,
    map: {
      gridView: [
        {
          selector: '.prodimage',
          replace: ['href'],
        },
        {
          selector: '.prodname',
          replace: ['href'],
        },
      ],
      listView: [
        {
          selector: '.description h3 a',
          replace: ['href'],
          canBeNull: true,
        },
        {
          selector: '.prodimage',
          replace: ['href'],
        },
        {
          selector: '.prodname',
          replace: ['href'],
        },
      ],
      relatedView: [
        {
          selector: 'h3 a',
          replace: ['href'],
        },
        {
          selector: '.details',
          replace: ['href'],
        },
      ],
    },
  },
  [EProductElements.PRICE]: {
    key: PRODUCT_PRICE_KEY,
    map: {
      gridView: [
        {
          selector: '.price em',
          replace: [CONTENT],
        },
      ],
      listView: [
        {
          selector: '.price em',
          replace: [CONTENT],
        },
      ],
      relatedView: [
        {
          selector: '.price em',
          replace: [CONTENT],
        },
      ],
    },
  },

  [EProductElements.PRODUCER]: {
    key: PRODUCT_PRODUCER_NAME_KEY,
    map: {
      gridView: [
        {
          selector: '.product',
          replace: ['data-producer'],
        },
        {
          selector: '.manufacturer a',
          canBeNull: true,
          replace: ['title', CONTENT],
        },
      ],
      listView: [
        {
          selector: '.product',
          replace: ['data-producer'],
        },
      ],
      relatedView: [
        {
          selector: '.product',
          replace: ['data-producer'],
        },
      ],
    },
  },
  [EProductElements.PRODUCER_LINK]: {
    key: PRODUCT_PRODUCER_ID_KEY,
    map: {
      gridView: [
        {
          canBeNull: true,
          selector: '.manufacturer a',
          replace: ['href'],
          prepareValue: prepareProducerLink,
        },
      ],
      listView: [],
      relatedView: [],
    },
  },
  [EProductElements.CATEGORY]: {
    key: PRODUCT_CATEGORY_KEY,
    map: {
      gridView: [
        {
          selector: '.product',
          replace: ['data-category'],
        },
      ],
      listView: [
        {
          selector: '.product',
          replace: ['data-category'],
        },
      ],
      relatedView: [
        {
          selector: '.product',
          replace: ['data-category'],
        },
      ],
    },
  },
  [EProductElements.AVAILABILITY]: {
    key: PRODUCT_AVAILABILITY_KEY,
    map: {
      gridView: [
        {
          canBeNull: true,
          selector: '.avail span:last-child',
          replace: [CONTENT],
        },
      ],
      listView: [
        {
          canBeNull: true,
          selector: '.avail span:last-child',
          replace: [CONTENT],
        },
      ],
      relatedView: [],
    },
  },
  [EProductElements.DELIVERY]: {
    key: PRODUCT_DELIVERY_KEY,
    map: {
      gridView: [
        {
          forActiveOnly: true,
          canBeNull: true,
          selector: '.deliv span:last-child',
          replace: [CONTENT],
        },
      ],
      listView: [
        {
          forActiveOnly: true,
          canBeNull: true,
          selector: '.deliv span:last-child',
          replace: [CONTENT],
        },
      ],
      relatedView: [],
    },
  },
  [EProductElements.DESCRIPTION]: {
    key: PRODUCT_DESCRIPTION_KEY,
    map: {
      gridView: [],
      listView: [
        {
          selector: '.product-short-description',
          replace: [CONTENT],
        },
      ],
      relatedView: [
        {
          selector: '.js__prodcut-short-desc',
          replace: [CONTENT],
        },
      ],
    },
  },
  [EProductElements.STOCK_ID]: {
    key: PRODUCT_STOCK_ID_KEY,
    map: {
      gridView: [
        {
          canBeNull: true,
          forActiveOnly: true,
          selector: '.basket input[name="stock_id"]',
          replace: ['value'],
        },
        {
          canBeNull: true,
          forActiveOnly: true,
          selector: '.basket:not(:has(input[name="stock_id"]))',
          replace: [BASKET_ID],
        },
        {
          canBeNull: true,
          forNotActiveOnly: true,
          selector: '.availability-notifier-btn',
          replace: ['data-stock-id'],
        },
      ],
      listView: [
        {
          forActiveOnly: true,
          selector: '.basket input[name="stock_id"]',
          replace: ['value'],
        },
        {
          canBeNull: true,
          forNotActiveOnly: true,
          selector: '.availability-notifier-btn',
          replace: ['data-stock-id'],
        },
      ],
      relatedView: [
        {
          selector: '.addtobasket input[name="stock_id"]',
          replace: ['value'],
        },
      ],
    },
  },
};

export {
  REPLACE_CONTENT_MAP,
  CONTENT,
  BASKET_ID,
  PRODUCT_ID_KEY,
  PRODUCT_NAME_KEY,
  PRODUCT_LINK_KEY,
  PRODUCT_CATEGORY_KEY,
  PRODUCT_MAIN_IMAGE_KEY,
  PRODUCT_IMAGE_FILENAME_KEY,
  PRODUCT_PRICE_KEY,
  PRODUCT_AVAILABILITY_KEY,
  PRODUCT_DELIVERY_KEY,
  PRODUCT_DESCRIPTION_KEY,
  PRODUCT_STOCK_ID_KEY,
  PRODUCT_PRODUCER_NAME_KEY,
  PRODUCT_PRODUCER_ID_KEY,
};
