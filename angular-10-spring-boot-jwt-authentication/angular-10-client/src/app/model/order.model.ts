
import {User} from './user.model';
import {CompanyOffice} from './companyoffice.model';


export class Order {

  id!: number;
  description!: string;
  sender!: string;
  recipient!: string;
  weight!: undefined;
  price!: undefined;
  receivedInOffice!: boolean;
  orderStatus!: string;
  employee!: User;
  employeeId!: number;
  senderUserId!: number;
  senderUser!: User;
  companyOfficeId!: number;
  companyOffice!: CompanyOffice;
  placedOrderDate!: undefined;
  receivedOrderDate!: undefined;
  shippingAddress!: string;
  companyOfficeToId!: number;
  companyOfficeTo!: CompanyOffice;
  receiverUser: User;
  receiverUserId: number;
}
