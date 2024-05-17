import { TReplaceMap } from 'types/templates';

const prepareReplaceMap = (defaultReplaceMap: TReplaceMap) => {
  if (!window?.OnetAdsConfig?.selectors) {
    return defaultReplaceMap;
  }

  const replaceMap = defaultReplaceMap;

  const selectorsToReplace = window.OnetAdsConfig.selectors;

  for (const { changeFrom, changeTo } of selectorsToReplace) {
    for (const key in replaceMap) {
      const objKey = key as keyof typeof replaceMap;

      const map = replaceMap[objKey].map;

      for (const keyInMap in map) {
        const objKeyMap = keyInMap as keyof typeof map;

        const replaceItems = map[objKeyMap];

        for (const replaceItem of replaceItems) {
          if (replaceItem.selector === changeFrom) {
            console.log('TESTTESTTEST');

            replaceItem.selector = changeTo;
          }
        }
      }
    }
  }

  return replaceMap;
};

export default prepareReplaceMap;
