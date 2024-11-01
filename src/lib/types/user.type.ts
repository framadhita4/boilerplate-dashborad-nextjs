import { CreatedUpdatedType, FileStorageType } from './globals.type';
import RoleType from './role.type';

interface UserType extends CreatedUpdatedType {
  uuid: string;
  email: string;
  role: RoleType;
  photo: FileStorageType;
  user_information: {
    name: string;
    phone_number: string;
    position: string;
  };
}

export default UserType;
