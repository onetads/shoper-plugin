import { TNoParamsNoReturnFunction } from 'types/common';
import { ATTEMPTS_LIMIT, ATTEMPT_DELAY } from 'consts/common';
import getMessage from 'utils/getMessage';
import { ATTEMPTS_LIMIT_MSG } from 'consts/messages';
import { hideLoadingSpinner } from 'utils/loadingSpinner';

const runWhenPageReady = (callback: TNoParamsNoReturnFunction): void => {
  let currentAttempt = 0;

  const intervalId = setInterval(() => {
    if (currentAttempt > ATTEMPTS_LIMIT) {
      clearInterval(intervalId);

      hideLoadingSpinner();
      throw new Error(getMessage(ATTEMPTS_LIMIT_MSG));
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
