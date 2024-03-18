const TAG_LIST_CLASSNAME = 'tags';
const TAG_ITEM_CLASSNAME = 'promo new rmn-tag-spons';
const TAG_TEXT_MARK_PL = 'sponsorowane';
const TAG_TEXT_MARK_EN = 'sponsored';

const ITEM_STYLES = {
  'margin-top': '4px',
  margin: '2px',
  'z-index': '1000',
  position: 'relative'
};

const LIST_STYLES = {
  position: 'relative',
  'line-height': '1em',
  marginBottom: '10px',
};

const pseudoClassName = TAG_ITEM_CLASSNAME.split(' ').join('.');

const PSEUDOCLASS_STYLES = `
    li.${pseudoClassName}::before,
    li.${pseudoClassName}::after {
      display: none !important;
    }
  `;

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
  PSEUDOCLASS_STYLES,
  MEDIA_QUERIES_TAG_PRODUCT_PAGE,
};
