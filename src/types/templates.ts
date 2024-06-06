import { EProductElements } from 'types/products';

enum ETemplates {
  LIST_VIEW = 'LIST_VIEW',
  GRID_VIEW = 'GRID_VIEW',
  LIST_RELATED_PRODUCTS = 'LIST_RELATED_PRODUCTS',
}

type TContentMap = {
  selector: string;
  replace: string[];
  canBeNull?: boolean;
  prepareValue?: (item: Element) => string;
};

type TReplaceContentMap = {
  key: string;
  map: {
    gridView: TContentMap[];
    listView: TContentMap[];
    relatedView: TContentMap[];
  };
};

type TReplaceMap = Record<EProductElements, TReplaceContentMap>;

export { ETemplates };
export type { TReplaceContentMap, TReplaceMap };
