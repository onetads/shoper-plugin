import { TProduct } from 'types/products';

const getQuickViewContent = (
  {
    availability,
    delivery,
    shortDescription,
    main_image_filename,
    rate,
    price,
    stockId,
    main_image,
    producer,
    name,
    url,
  }: TProduct,
  pageLang: string,
): string => {
  const { quickview } = Shop.lang;

  const getVoteStars = (rating: number) => {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      stars += `<img src="/libraries/images/1px.gif" class="px1 star${
        i > rating ? 0 : 1
      }">`;
    }

    return stars;
  };

  return `<div class="product-innerdesc-wrap">
    <div class="gallery f-row">
      <a href="${url}">
        <img src="/environment/cache/images/300_300_productGfx_${main_image}/${main_image_filename}" width="300" height="372" data-src="/environment/cache/images/300_300_productGfx_7/${main_image_filename}" alt="${name}">
      </a>
    </div>
    <div class="product-info">
      <div class="availability row">
        <div class="row">
          <div class="row availability">
            <span class="first">${quickview.availability}: </span>
            <span class="second">${availability.name}</span>
          </div>
          <div class="delivery">
            <span class="first">${quickview.delivery}: </span>
            <span class="second">${delivery.name}</span>
          </div>
        </div>
      </div>
      <div class="description f-row resetcss">
        ${shortDescription}
      </div>
      <div class="productdetails-more row">
        <div class="row evaluation">
          <em>${quickview.evaluation}: </em>
          <span class="votestars">
            ${getVoteStars(rate)}
          </span>
        </div>
        <div class="row manufacturer">
          <em>${quickview.producer}: </em>
          <a class="brand" href="/${pageLang}/producer/${producer.name}/${
            producer.id
          }" title="${producer.name}">${producer.name}</a>
        </div>
        <div class="price price_quickview">
            <p>${quickview.price}</p>
            <em class="price__value">${price.gross.final}</em>
            <p></p>
        <div>
      <form class="basket" action="/${pageLang}/basket/add/${stockId}" method="get">
        <fieldset>
          <button class="addtobasket btn btn-red" type="submit">
            <img src="/libraries/images/1px.gif" class="px1">
            <span>${quickview.addtobasket}</span>
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>`;
};

export default getQuickViewContent;
