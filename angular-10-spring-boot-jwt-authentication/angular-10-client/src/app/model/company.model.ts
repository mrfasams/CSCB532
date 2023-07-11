
import {User} from './user.model';


export class Company {

  id!: number;
  name!: string;
  companyClients!: User[];
  checked!: boolean;
}
