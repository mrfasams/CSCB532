import {Role} from './role.model';
import {User} from './user.model';


export class CompanyOffice {

  id!: number;
  name!: string;
  officeEmployee!: User[];
  logisticCompanyId!: number;

}
