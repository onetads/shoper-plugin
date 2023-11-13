import { SHOP_NOT_FOUND_MSG } from 'consts/messages';
import { PAGES } from 'consts/pages';
import { TPages } from 'types/pages';
import getMessage from 'utils/getMessage';

type TGetCurrentPageInfoResult = TPages | null;

const getCurrentPageInfo = (): TGetCurrentPageInfoResult => {
  // ADDITIONAL CHECK BECAUSE IN SOME SHOPS GLOBAL OBJECT SHOP IS NOT DECLARED
  if (window.Shop === undefined)
    throw new Error(getMessage(SHOP_NOT_FOUND_MSG));

  const currentPageType = Shop.pageType;

  const foundPage = PAGES.find((page) =>
    currentPageType.split(' ').some((pageTypeItem) => pageTypeItem === page),
  );

  if (!foundPage) return null;

  return foundPage as TPages;
};

export default getCurrentPageInfo;
