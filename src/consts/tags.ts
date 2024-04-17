const TAG_LIST_CLASSNAME = 'tags';
const TAG_ITEM_CLASSNAME = 'promo new rmn-tag-spons';
const TAG_TEXT_MARK_PL = 'promowane';
const TAG_TEXT_MARK_EN = 'promoted';

const ITEM_STYLES = {
  position: 'relative',
  display: 'inline-flex',
  gap: '4px',
  'align-items': 'center',
};

const LIST_STYLES = {
  position: 'relative',
  'line-height': '1em',
  marginBottom: '10px',
  'z-index': '2',
};

const LIST_STYLES_ALL = {
  'pointer-events': 'initial',
  'z-index': '2',
};

const SPONSORED_STYLES = {
  'line-height': '1',
  color: 'inherit',
  background: 'none',
  padding: 'initial',
  margin: 'initial',
};

const SPONSORED_PSEUDOCLASS_STYLES = `
    .rmn-tag-spons a::before,
    .rmn-tag-spons a::after {
      display: none !important;
    }
  `;

const pseudoClassName = TAG_ITEM_CLASSNAME.split(' ').join('.');

const ADDITIONAL_STYLES = `
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
  LIST_STYLES_ALL,
  SPONSORED_STYLES,
  SPONSORED_PSEUDOCLASS_STYLES,
  TAG_TEXT_MARK_PL,
  TAG_TEXT_MARK_EN,
  TAG_LIST_CLASSNAME,
  TAG_ITEM_CLASSNAME,
  ADDITIONAL_STYLES,
  MEDIA_QUERIES_TAG_PRODUCT_PAGE,
};
