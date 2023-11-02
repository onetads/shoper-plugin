enum ETemplates {
  LIST_FULL_AVAILABLE = 'LIST_FULL_AVAILABLE',
  LIST_FULL_NOT_AVAILABLE = 'LIST_FULL_NOT_AVAILABLE',
  LIST_PHOTO_AVAILABLE = 'LIST_PHOTO_AVAILABLE',
  LIST_PHOTO_NOT_AVAILABLE = 'LIST_PHOTO_NOT_AVAILABLE',
  LIST_RELATED_PRODUCTS_AVAILABLE = 'LIST_RELATED_PRODUCTS_AVAILABLE',
  LIST_RELATED_PRODUCTS_NOT_AVAILABLE = 'LIST_RELATED_PRODUCTS_NOT_AVAILABLE',
}

type TContentMap = {
  selector: string;
  replace: string[];
  forActiveOnly?: boolean;
  forNotActiveOnly?: boolean;
  canBeNull?: boolean;
};

type TReplaceContentMap = {
  key: string;
  map: {
    photoView: TContentMap[];
    fullView: TContentMap[];
    relatedView: TContentMap[];
  };
};

export { ETemplates };
export { TReplaceContentMap };
