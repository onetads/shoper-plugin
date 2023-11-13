import { TProduct } from 'types/products';

type TGetProduct = (productId: { id: number }) => TProduct;

export type { TGetProduct };
