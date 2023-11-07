enum ETemplates {
  LIST_VIEW_AVAILABLE = 'LIST_VIEW_AVAILABLE',
  LIST_VIEW_NOT_AVAILABLE = 'LIST_VIEW_NOT_AVAILABLE',
  GRID_VIEW_AVAILABLE = 'GRID_VIEW_AVAILABLE',
  GRID_VIEW_NOT_AVAILABLE = 'GRID_VIEW_NOT_AVAILABLE',
  LIST_RELATED_PRODUCTS_AVAILABLE = 'LIST_RELATED_PRODUCTS_AVAILABLE',
  LIST_RELATED_PRODUCTS_NOT_AVAILABLE = 'LIST_RELATED_PRODUCTS_NOT_AVAILABLE',
}

type TContentMap = {
  selector: string;
  replace: string[];
  forActiveOnly?: boolean;
  forNotActiveOnly?: boolean;
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

export { ETemplates };
export { TReplaceContentMap };
