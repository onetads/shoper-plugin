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
const PRODUCT_PRICE_REGULAR_KEY = '{{ PRODUCT_PRICE_REGULAR_KEY }}';
const PRODUCT_AVAILABILITY_KEY = '{{ PRODUCT_AVAILABILITY_KEY }}';
const PRODUCT_DELIVERY_KEY = '{{ PRODUCT_DELIVERY_KEY }}';

const REPLACE_CONTENT_MAP: Record<EProductElements, TReplaceContentMap> = {
  [EProductElements.ID]: {
    key: PRODUCT_ID_KEY,
    map: {
      default: [
        {
          selector: '.product',
          replace: ['data-product-id'],
        },
        {
          selector: '.buttons input[name="stock_id"]',
          replace: ['value'],
        },
        {
          selector: '.buttons .quickview',
          replace: ['data-id'],
        },
      ],
    },
  },

  [EProductElements.IMG]: {
    key: PRODUCT_IMAGE_KEY,
    map: {
      default: [
        {
          selector: '.img-wrap img',
          replace: ['src', 'data-src'],
        },
      ],
    },
  },
  [EProductElements.PRODUCT_NAME]: {
    key: PRODUCT_NAME_KEY,
    map: {
      default: [
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
          replace: ['content'],
        },
      ],
      additional: [
        {
          selector: '.description h3 a',
          replace: ['title', 'content'],
        },
      ],
    },
  },
  [EProductElements.PRODUCT_LINK]: {
    key: PRODUCT_LINK_KEY,
    map: {
      default: [
        {
          selector: '.prodimage',
          replace: ['href'],
        },
        {
          selector: '.prodname',
          replace: ['href'],
        },
      ],
      additional: [
        {
          selector: '.description h3 a',
          replace: ['href'],
        },
      ],
    },
  },
  [EProductElements.PRICE]: {
    key: PRODUCT_PRICE_KEY,
    map: {
      default: [
        {
          selector: '.price p em',
          replace: ['content'],
        },
      ],
    },
  },
  [EProductElements.REGULAR_PRICE]: {
    key: PRODUCT_PRICE_REGULAR_KEY,
    map: {
      default: [
        {
          selector: '.price__inactive',
          replace: ['content'],
        },
      ],
    },
  },

  [EProductElements.PRODUCER]: {
    key: PRODUCT_PRODUCER_KEY,
    map: {
      default: [
        {
          selector: '.product',
          replace: ['data-producer'],
        },
        {
          selector: '.manufacturer a',
          replace: ['title', 'content'],
        },
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
      default: [
        {
          selector: '.manufacturer a',
          replace: ['href'],
        },
      ],
    },
  },
  [EProductElements.CATEGORY]: {
    key: PRODUCT_CATEGORY_KEY,
    map: {
      default: [
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
      default: [],
      additional: [
        {
          selector: '.avail span:last-child',
          replace: ['content'],
        },
      ],
    },
  },
  [EProductElements.DELIVERY]: {
    key: PRODUCT_DELIVERY_KEY,
    map: {
      default: [],
      additional: [
        {
          selector: '.deliv span:last-child',
          replace: ['content'],
        },
      ],
    },
  },
};

export {
  REPLACE_CONTENT_MAP,
  PRODUCT_NAME_KEY,
  PRODUCT_PRODUCER_KEY,
  PRODUCT_ID_KEY,
  PRODUCT_CATEGORY_KEY,
  PRODUCT_IMAGE_KEY,
};
