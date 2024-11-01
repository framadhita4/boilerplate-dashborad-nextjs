import { CreatedUpdatedType } from './globals.type';

interface RoleType extends CreatedUpdatedType {
  uuid: string;
  name: string;
  code: string;
  description: string;
}

export default RoleType;
