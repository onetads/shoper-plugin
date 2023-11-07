import { TNoParamsNoReturnFunction } from 'types/common';

const runWhenPageReady = (callback: TNoParamsNoReturnFunction): void => {
  const attemptsLimit = 50;
  const delay = 100;
  let currentAttempt = 0;

  const intervalId = setInterval(() => {
    if (currentAttempt > attemptsLimit) return;

    const shopObject = window.Shop;
    const frontAPIObject = window.frontAPI;

    currentAttempt++;
    if (!shopObject || !frontAPIObject) return;
    clearInterval(intervalId);
    callback();
  }, delay);
};

export default runWhenPageReady;
