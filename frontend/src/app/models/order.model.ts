import { IProduct } from './product.model';


export interface IOrder {
  product: IProduct,
  quantity: number,
  productPrice: number,
  totalPrice: number,
  productStock: number,
};
