import initTemplateManager from 'utils/initTemplateManager';
import addScripts from 'utils/addScripts';

const attemptsLimit = 30;
const delay = 50;

let currentAttempt = 0;

const intervalId = setInterval(() => {
  if (currentAttempt > attemptsLimit) return;

  const shopObject = window.Shop;
  const frontAPIObject = window.frontAPI;

  currentAttempt++;
  if (!shopObject || !frontAPIObject) return;

  addScripts();

  const TemplateManager = initTemplateManager();
  TemplateManager.injectProduct();
  clearInterval(intervalId);
}, delay);
