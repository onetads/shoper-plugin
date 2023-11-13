import { TNoParamsNoReturnFunction } from 'types/common';
import { ATTEMPTS_LIMIT, ATTEMPT_DELAY } from 'consts/common';

const runWhenPageReady = (callback: TNoParamsNoReturnFunction): void => {
  let currentAttempt = 0;
  const intervalId = setInterval(() => {
    if (currentAttempt > ATTEMPTS_LIMIT) {
      clearInterval(intervalId);
      throw Error('ATTEMPTS LIMIT EXCEEDED');
    }

    currentAttempt++;
    if (
      !Shop.QuickView ||
      !Shop.AjaxBasket ||
      !frontAPI ||
      !dlApi.fetchNativeAd
    )
      return;
    clearInterval(intervalId);
    callback();
  }, ATTEMPT_DELAY);
};

export default runWhenPageReady;
