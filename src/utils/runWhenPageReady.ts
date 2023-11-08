import { TNoParamsNoReturnFunction } from 'types/common';
import { ATTEMPTS_LIMIT, ATTEMPT_DELAY } from 'consts/common';

const runWhenPageReady = (callback: TNoParamsNoReturnFunction): void => {
  let currentAttempt = 0;
  const intervalId = setInterval(() => {
    if (currentAttempt > ATTEMPTS_LIMIT) return;

    const shopObject = window.Shop;
    const frontAPIObject = window.frontAPI;

    currentAttempt++;
    if (!shopObject || !frontAPIObject) return;
    clearInterval(intervalId);
    callback();
  }, ATTEMPT_DELAY);
};

export default runWhenPageReady;
