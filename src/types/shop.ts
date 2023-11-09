type TUserOptions = {
  ajaxbasket: {
    mode: number;
  };
};

type TModalOptions = {
  showMask: boolean;
  position: 'center' | 'top';
  positionType: 'fixed' | 'absolute';
  offset: number;
  header: string;
  content: string;
};

export type { TModalOptions, TUserOptions };
