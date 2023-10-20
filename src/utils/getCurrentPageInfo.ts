import { PAGES } from 'consts/pages';
import { TPages } from 'types/pages';

type TGetCurrentPageInfoResult = {
  type: TPages;
  id: string | null;
} | null;

const getCurrentPageInfo = (): TGetCurrentPageInfoResult => {
  const currentPageType = window.Shop.pageType;
  const currentPageId = window.Shop.pageId;

  const foundPage = PAGES.find((page) =>
    currentPageType.split(' ').some((pageTypeItem) => pageTypeItem === page),
  );

  if (!foundPage) return null;

  return {
    type: foundPage,
    id: currentPageId === '' ? null : currentPageId,
  };
};

export { getCurrentPageInfo };
