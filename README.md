# Ras

This project contains javascript for OnetAds widget.

# Reqs

Node: v20.8.1 (https://nodejs.org/dist/v20.8.1/docs/api/)
Yarn: v1.22.19

# Scripts

yarn build - builds minified js (code is bundled to dist/bundle.js file) <br/>
yarn test - build minified js (code is bundled to dist/bundle.js file). This code is intended for testing in shops <br/>
yarn eslint - checks for eslint errors

# Config

```javascript
window.OnetAdsConfig = {
    shouldShowLoader: true, // boolean
    productsCount: 1, // number
    selectors: [
        {
            changeFrom: '.dummy-selector',
            changeTo: '.changed-dummy-selector'
        }
    ] // Optional, example structure
}
```

# How to test code in shops

- Build code intended for testing `yarn test` then copy the bundled code from `dist/bundle.js`
- Go to any shop
- Open console and paste the bundled code