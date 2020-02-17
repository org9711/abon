import { ICustomer } from './customer.model';
import { IAddress } from './address.model';


export interface IOrderCust {
  payment_method: string,
  customer_details: ICustomer,
  address_details: IAddress
};
