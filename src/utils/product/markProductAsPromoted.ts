import { PRODUCT_PAGE } from 'consts/pages';
import {
  ITEM_STYLES,
  LIST_STYLES,
  TAG_ITEM_CLASSNAME,
  TAG_LIST_CLASSNAME,
  TAG_TEXT_MARK_PL,
  TAG_TEXT_MARK_EN,
  ITEM_STYLES_PRODUCT_PAGE,
  MEDIA_QUERIES_TAG_PRODUCT_PAGE,
} from 'consts/tags';
import { TPages } from 'types/pages';
import applyStyles from 'utils/helpers/applyStyles';

const markProductAsPromoted = (
  product: HTMLElement,
  dsaUrl: string,
  page: TPages,
) => {
  const tagsList = document.createElement('ul');
  const tagItem = document.createElement('li');

  applyStyles(tagItem, ITEM_STYLES);

  if (page === PRODUCT_PAGE) {
    const styles = document.createElement('style');
    styles.innerHTML = MEDIA_QUERIES_TAG_PRODUCT_PAGE;
    product.appendChild(styles);

    applyStyles(tagsList, LIST_STYLES);
    applyStyles(tagItem, ITEM_STYLES_PRODUCT_PAGE);
  }

  const locale = Shop.lang.name ? Shop.lang.name : 'pl_PL';

  tagItem.textContent =
    locale === 'pl_PL' ? TAG_TEXT_MARK_PL : TAG_TEXT_MARK_EN;

  tagsList.className = TAG_LIST_CLASSNAME;
  tagItem.className = TAG_ITEM_CLASSNAME;

  const sponsoredProductLink = document.createElement('a');
  sponsoredProductLink.href = dsaUrl;
  sponsoredProductLink.target = '_blank';
  sponsoredProductLink.innerHTML = 'ⓘ';

  tagItem.innerHTML = locale === 'pl_PL' ? TAG_TEXT_MARK_PL : TAG_TEXT_MARK_EN;
  tagItem.insertAdjacentElement('beforeend', sponsoredProductLink);

  tagsList.appendChild(tagItem);
  product.prepend(tagsList);

  return product;
};

export default markProductAsPromoted;
