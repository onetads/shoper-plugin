import { PRODUCT_PAGE } from 'consts/pages';
import {
  ITEM_STYLES,
  LIST_STYLES,
  TAG_ITEM_CLASSNAME,
  TAG_LIST_CLASSNAME,
  TAG_TEXT_MARK_PL,
  TAG_TEXT_MARK_EN,
} from 'consts/tags';
import { TPages } from 'types/pages';
import applyStyles from 'utils/helpers/applyStyles';

const markProductAsPromoted = (product: HTMLElement, page: TPages) => {
  const tagsList = document.createElement('ul');
  const tagItem = document.createElement('li');

  applyStyles(tagItem, ITEM_STYLES);
  if (page === PRODUCT_PAGE) applyStyles(tagsList, LIST_STYLES);

  const locale = Shop.lang.name ? Shop.lang.name : 'pl_PL';

  tagItem.textContent =
    locale === 'pl_PL' ? TAG_TEXT_MARK_PL : TAG_TEXT_MARK_EN;

  tagsList.className = TAG_LIST_CLASSNAME;
  tagItem.className = TAG_ITEM_CLASSNAME;

  tagsList.appendChild(tagItem);
  product.appendChild(tagsList);

  return product;
};

export default markProductAsPromoted;
