import { CreatedUpdatedType } from './globals.type';

// mod = module
export interface PermissionType extends CreatedUpdatedType {
  mod_name: string;
  name: string;
  permission: {
    [key: string]: boolean;
  }[];
}

export interface AllPermissionsType extends Omit<PermissionType, 'permission'> {
  permission: {
    name: string;
    uuid: string;
  }[];
}
