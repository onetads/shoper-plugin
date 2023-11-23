import { PRODUCT_PAGE } from 'consts/pages';
import { itemStyles, listStyles } from 'consts/styles';
import { TPages } from 'types/pages';
import applyStyles from 'utils/helpers/applyStyles';

const markProductAsPromoted = (product: HTMLElement, page: TPages) => {
  const tagsList = document.createElement('ul');
  const tagItem = document.createElement('li');

  applyStyles(tagItem, itemStyles);
  if (page === PRODUCT_PAGE) applyStyles(tagsList, listStyles);

  tagItem.textContent = 'sponsorowane';

  tagsList.className = 'tags';
  tagItem.className = 'new';

  tagsList.appendChild(tagItem);
  product.appendChild(tagsList);

  return product;
};

export default markProductAsPromoted;
