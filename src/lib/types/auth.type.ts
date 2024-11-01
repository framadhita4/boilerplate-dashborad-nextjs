import RoleType from './role.type';

export interface AuthType {
  uuid: string;
  email: string;
  role: RoleType;
}
