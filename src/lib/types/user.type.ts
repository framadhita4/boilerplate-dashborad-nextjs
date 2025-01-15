import { CreatedUpdatedType, FileStorageType } from './globals.type';
import RoleType from './role.type';

interface UserType {
  uuid: string;
  name: string;
  email: string;
  role: RoleType;
  last_login: Date;
  status: boolean;
  project_assigned: number;
}

export default UserType;
