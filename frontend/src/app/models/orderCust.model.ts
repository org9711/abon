import { ICustomer } from './customer.model';
import { IAddress } from './address.model';


export interface IOrderCust {
  order_token: string,
  payment_method: string,
  customer_details: ICustomer,
  address: IAddress
};
