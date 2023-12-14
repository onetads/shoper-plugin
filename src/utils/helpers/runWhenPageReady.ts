import { TNoParamsNoReturnFunction } from 'types/common';
import { ATTEMPTS_LIMIT, ATTEMPT_DELAY } from 'consts/common';
import getMessage from 'utils/formatters/getMessage';
import { ATTEMPTS_LIMIT_MSG } from 'consts/messages';

const runWhenPageReady = (callback: TNoParamsNoReturnFunction) => {
  return new Promise<void>((resolve, reject) => {
    let currentAttempt = 0;

    const intervalId = setInterval(async () => {
      try {
        if (currentAttempt > ATTEMPTS_LIMIT) {
          clearInterval(intervalId);
          reject(new Error(getMessage(ATTEMPTS_LIMIT_MSG)));
        }

        currentAttempt++;
        if (
          !Shop.QuickView ||
          !Shop.AjaxBasket ||
          !window.frontAPI ||
          !window.dlApi ||
          !window.dlApi.fetchNativeAd
        )
          return;

        clearInterval(intervalId);
        await callback();
        resolve();
      } catch (error) {
        reject(new Error(error.message));
      }
    }, ATTEMPT_DELAY);
  });
};

export default runWhenPageReady;
