import { TSelectors } from 'types/common';

const createSelector = (name: string, type: TSelectors = '.') => {
  let selector = name.replace(/^[#.]/, '');
  selector = `${type}${name}`;

  return selector;
};

export default createSelector;
