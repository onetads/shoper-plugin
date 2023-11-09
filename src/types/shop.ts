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

type TProductAvailabilityOptions = {
  requestUrl: 'string';
  selectors: {
    availabilitynotifier: string;
    availabilitynotifier_btn: string;
  };
};

export type { TModalOptions, TUserOptions, TProductAvailabilityOptions };
