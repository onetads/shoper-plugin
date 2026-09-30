import { TOnetAdsConfig } from 'types/config';

type TResolvedPositions = {
  hasDedicatedPositions: boolean;
  positions: number[];
};

const toPosition = (value: unknown) => {
  const parsedValue = Number(String(value).trim());

  return Number.isInteger(parsedValue) && parsedValue > 0 ? parsedValue : null;
};

const toItemNumbersList = (itemNumbers: unknown) => {
  if (Array.isArray(itemNumbers)) return itemNumbers;

  if (typeof itemNumbers === 'string') return itemNumbers.split(',');

  return [];
};

const resolveProductPositions = (
  config: TOnetAdsConfig,
): TResolvedPositions => {
  const productsCount = toPosition(config.productsCount) ?? 1;

  const uniquePositions = new Set<number>();

  for (const itemNumber of toItemNumbersList(config.itemNumbers)) {
    const position = toPosition(itemNumber);

    if (position) uniquePositions.add(position);
  }

  const positions = Array.from(uniquePositions).slice(0, productsCount);

  if (!positions.length) {
    return {
      hasDedicatedPositions: false,
      positions: Array.from({ length: productsCount }, (_, index) => index + 1),
    };
  }

  return {
    hasDedicatedPositions: true,
    positions,
  };
};

export default resolveProductPositions;
