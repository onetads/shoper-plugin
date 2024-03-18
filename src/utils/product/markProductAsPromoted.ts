import { PRODUCT_PAGE } from 'consts/pages';
import {
  ITEM_STYLES,
  LIST_STYLES,
  TAG_ITEM_CLASSNAME,
  TAG_LIST_CLASSNAME,
  TAG_TEXT_MARK_PL,
  TAG_TEXT_MARK_EN,
  MEDIA_QUERIES_TAG_PRODUCT_PAGE, PSEUDOCLASS_STYLES
} from 'consts/tags';
import { TPages } from 'types/pages';
import applyStyles from 'utils/helpers/applyStyles';

const markProductAsPromoted = (product: HTMLElement, page: TPages) => {
  const tagsList = document.createElement('ul');
  const tagItem = document.createElement('li');

  applyStyles(tagItem, ITEM_STYLES);

  if (page === PRODUCT_PAGE) {
    const mediaQueryStyles = document.createElement('style');
    mediaQueryStyles.innerHTML = MEDIA_QUERIES_TAG_PRODUCT_PAGE;
    product.appendChild(mediaQueryStyles);

    applyStyles(tagsList, LIST_STYLES);
  }

  const locale = Shop.lang.name ? Shop.lang.name : 'pl_PL';

  tagItem.textContent =
    locale === 'pl_PL' ? TAG_TEXT_MARK_PL : TAG_TEXT_MARK_EN;

  tagsList.className = TAG_LIST_CLASSNAME;
  tagItem.className = TAG_ITEM_CLASSNAME;

  const styles = document.createElement('style');
  styles.innerHTML = PSEUDOCLASS_STYLES;
  tagsList.appendChild(styles);

  tagsList.appendChild(tagItem);

  product.prepend(tagsList);

  return product;
};

export default markProductAsPromoted;