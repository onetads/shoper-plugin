import { TNoParamsNoReturnFunction } from 'types/common';
import { ATTEMPTS_LIMIT, ATTEMPT_DELAY } from 'consts/common';

const runWhenPageReady = (callback: TNoParamsNoReturnFunction): void => {
  let currentAttempt = 0;
  const intervalId = setInterval(() => {
    if (currentAttempt > ATTEMPTS_LIMIT) return;

    const frontAPIObject = window.frontAPI;

    currentAttempt++;
    if (!Shop.QuickView.prototype || !Shop.AjaxBasket || !frontAPIObject)
      return;
    clearInterval(intervalId);
    callback();
  }, ATTEMPT_DELAY);
};

export default runWhenPageReady;
