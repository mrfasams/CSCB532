import {Role} from './role.model';


export class User {

  id!: number;
  email!: string;
  lastName!: string;
  firstName!: string;
  username!: string;
  password!: string;
  roles!: Role[];
  role!: string;
  officeId!: number;
  companyId!: number;
  clientBelongsToCompany!: number [];
}
