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
};

type TReplaceContentMap = {
  key: string;
  map: {
    default: TContentMap[];
    additional?: TContentMap[];
  };
};

export { ETemplates };
export { TReplaceContentMap };
