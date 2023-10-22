import { PAGES } from 'consts/pages';
import { TPages } from 'types/pages';

type TGetCurrentPageInfoResult = TPages | null;

const getCurrentPageInfo = (): TGetCurrentPageInfoResult => {
  const currentPageType = Shop.pageType;

  const foundPage = PAGES.find((page) =>
    currentPageType.split(' ').some((pageTypeItem) => pageTypeItem === page),
  );

  if (!foundPage) return null;

  return foundPage as TPages;
};

export default getCurrentPageInfo;
