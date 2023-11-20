const markProductAsPromoted = (product: HTMLElement) => {
  const tagsList = document.createElement('ul');
  const tagItem = document.createElement('li');

  tagItem.className = 'new';
  tagItem.textContent = 'SPONSOROWANY';

  tagsList.className = 'tags';
  tagsList.appendChild(tagItem);

  product.appendChild(tagsList);

  return product;
};

export default markProductAsPromoted;
