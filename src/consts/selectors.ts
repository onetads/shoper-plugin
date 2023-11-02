import { EProductElements } from 'types/products';
import { TReplaceContentMap } from 'types/templates';

const PRODUCT_NAME_KEY = '{{ PRODUCT_NAME_KEY }}';
const PRODUCT_LINK_KEY = '{{ PRODUCT_LINK_KEY }}';
const PRODUCT_PRODUCER_KEY = '{{ PRODUCT_PRODUCER_KEY }}';
const PRODUCT_PRODUCER_LINK_KEY = '{{ PRODUCT_PRODUCER_LINK_KEY }}';
const PRODUCT_ID_KEY = '{{ PRODUCT_ID_KEY }}';
const PRODUCT_CATEGORY_KEY = '{{ PRODUCT_CATEGORY_KEY }}';
const PRODUCT_IMAGE_KEY = '{{ PRODUCT_IMAGE_KEY }}';
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
      photoView: [
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
      fullView: [
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
    key: PRODUCT_IMAGE_KEY,
    map: {
      photoView: [
        {
          selector: '.img-wrap img',
          replace: ['src', 'data-src'],
        },
      ],
      fullView: [
        {
          selector: '.img-wrap img',
          replace: ['src', 'data-src'],
        },
      ],
      relatedView: [
        {
          selector: '.details img',
          replace: ['src'],
        },
      ],
    },
  },
  [EProductElements.PRODUCT_NAME]: {
    key: PRODUCT_NAME_KEY,
    map: {
      photoView: [
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
      fullView: [
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
      photoView: [
        {
          selector: '.prodimage',
          replace: ['href'],
        },
        {
          selector: '.prodname',
          replace: ['href'],
        },
      ],
      fullView: [
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
      photoView: [
        {
          selector: '.price em',
          replace: [CONTENT],
        },
      ],
      fullView: [
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
    key: PRODUCT_PRODUCER_KEY,
    map: {
      photoView: [
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
      fullView: [
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
    key: PRODUCT_PRODUCER_LINK_KEY,
    map: {
      photoView: [
        {
          canBeNull: true,
          selector: '.manufacturer a',
          replace: ['href'],
        },
      ],
      fullView: [],
      relatedView: [],
    },
  },
  [EProductElements.CATEGORY]: {
    key: PRODUCT_CATEGORY_KEY,
    map: {
      photoView: [
        {
          selector: '.product',
          replace: ['data-category'],
        },
      ],
      fullView: [
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
      photoView: [
        {
          canBeNull: true,
          selector: '.avail span:last-child',
          replace: [CONTENT],
        },
      ],
      fullView: [
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
      photoView: [
        {
          forActiveOnly: true,
          canBeNull: true,
          selector: '.deliv span:last-child',
          replace: [CONTENT],
        },
      ],
      fullView: [
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
      photoView: [],
      fullView: [
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
      photoView: [
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
      fullView: [
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
  PRODUCT_PRODUCER_KEY,
  PRODUCT_PRODUCER_LINK_KEY,
  PRODUCT_CATEGORY_KEY,
  PRODUCT_IMAGE_KEY,
  PRODUCT_PRICE_KEY,
  PRODUCT_AVAILABILITY_KEY,
  PRODUCT_DELIVERY_KEY,
  PRODUCT_DESCRIPTION_KEY,
  PRODUCT_STOCK_ID_KEY,
};
