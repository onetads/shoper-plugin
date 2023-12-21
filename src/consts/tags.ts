const TAG_LIST_CLASSNAME = 'tags';
const TAG_ITEM_CLASSNAME = 'tags';
const TAG_TEXT_MARK_PL = 'sponsorowane';
const TAG_TEXT_MARK_EN = 'sponsored';

const ITEM_STYLES = {
  'margin-top': '4px',
  'background-color': 'white',
  color: 'black',
  opacity: '0.5',
  padding: '0',
  'z-index': '1000',
};

const LIST_STYLES = {
  position: 'relative',
  'line-height': '1em',
  marginBottom: '10px',
};

const ITEM_STYLES_PRODUCT_PAGE = {
  'background-color': 'rgba(255,255,255,0.85)',
  'text-transform': 'lowercase',
  'font-weight': 'normal',
  color: 'rgba(0,0,0,0.5)',
  'letter-spacing': '0',
  'line-height': '1em',
  padding: '0',
  'font-size': '11px',
  position: 'relative',
};

const MEDIA_QUERIES_TAG_PRODUCT_PAGE = `
@media screen and (min-width: 768px) {
  .tags li {
      margin-bottom: 8px !important;
  }
}

@media screen and (max-width: 768px) {
  .product:has(.tags) h3 {
      margin-top: 0 !important;
  }
}
`;

export {
  ITEM_STYLES,
  LIST_STYLES,
  TAG_TEXT_MARK_PL,
  TAG_TEXT_MARK_EN,
  TAG_LIST_CLASSNAME,
  TAG_ITEM_CLASSNAME,
  ITEM_STYLES_PRODUCT_PAGE,
  MEDIA_QUERIES_TAG_PRODUCT_PAGE,
};
