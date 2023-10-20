import { BODY_ID_PREFIX } from 'consts/bodyPrefix';
import { INDEX_PAGE, PAGES } from 'consts/pages';
import { TPages } from 'types/pages';

type TDetectCurrentPageTypeResult = {
  type: TPages;
  id: number | null;
} | null;

const detectCurrentPageType = (): TDetectCurrentPageTypeResult => {
  const bodyId = document.body.getAttribute('id');
  const bodyClassName = document.body.className.replace(BODY_ID_PREFIX, '');

  if (bodyClassName === INDEX_PAGE)
    return {
      type: INDEX_PAGE,
      id: null,
    };

  if (!bodyId) return null;

  const slicedBodyIdPrefix = bodyId.replace(BODY_ID_PREFIX, '');

  const currentPageType = slicedBodyIdPrefix.match(/^[a-zA-Z]+/);
  const currentPageTypeId = slicedBodyIdPrefix.match(/\d+/);

  if (
    !(
      currentPageType !== null &&
      currentPageType[0] !== null &&
      currentPageTypeId !== null
    )
  )
    return null;

  const finalCurrentPageType = currentPageType[0] as TPages;
  const finalCurrentPageTypeId = +currentPageTypeId[0];

  if (PAGES.includes(finalCurrentPageType))
    return {
      type: finalCurrentPageType,
      id: finalCurrentPageTypeId,
    };

  return null;
};

export { detectCurrentPageType };
