import { TNoParamsNoReturnFunction } from 'types/common';

const runOutsideCallStack = (fn: TNoParamsNoReturnFunction) => {
  setTimeout(() => {
    fn();
  }, 0);
};

export default runOutsideCallStack;
