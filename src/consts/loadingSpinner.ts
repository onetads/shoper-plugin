const LOADING_SPINNER_ID = 'LOADING_SPINNER_ID';
const LOADING_SPINNER_RELATED_CONTAINER_CLASS =
  'loader-onet-ads-related-container';
const LOADING_SPINNER_LISTING_CONTAINER_CLASS =
  'loader-onet-ads-listing-container';
const LOADING_SPINNER_CLASS = 'loader-onet-ads';
const LOADING_SPINNER_ADDITIONAL_SPACING = 'loader-onet-ads-additional-spacing';

const LOADING_SPINNER_STYLES = `<style>
.loader-onet-ads-listing-container {
  display: flex;
  align-items: center;
  top: 0;
  position: -webkit-sticky;
  position: sticky;
  width: 100%;
}

.loader-onet-ads-related-container {
  position: absolute;
  width: 100%;
  height: 100%;
  visibility: visible;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-onet-ads-additional-spacing {
  margin: 24px auto auto auto;
}

.loader-onet-ads {
    width: 36px;
    height: 36px;
    border: 3px solid black;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } </style>`;

export {
  LOADING_SPINNER_STYLES,
  LOADING_SPINNER_ID,
  LOADING_SPINNER_RELATED_CONTAINER_CLASS,
  LOADING_SPINNER_LISTING_CONTAINER_CLASS,
  LOADING_SPINNER_ADDITIONAL_SPACING,
  LOADING_SPINNER_CLASS,
};
