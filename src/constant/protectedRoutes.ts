const PROTECTED_ROUTES = [
  {
    pathname: '/dashboard/home',
    permission_module: 'dashboard',
    permission_action: 'view',
  },

  // User
  {
    pathname: '/dashboard/user',
    permission_module: 'user',
    permission_action: 'view',
  },
  {
    pathname: '/dashboard/user/new',
    permission_module: 'user',
    permission_action: 'create',
  },
  {
    pathname: '/dashboard/user/:uuid',
    permission_module: 'user',
    permission_action: 'edit',
  },

  // Role
  {
    pathname: '/dashboard/role',
    permission_module: 'role',
    permission_action: 'view',
  },
  {
    pathname: '/dashboard/role/new',
    permission_module: 'role',
    permission_action: 'create',
  },
  {
    pathname: '/dashboard/role/:uuid',
    permission_module: 'role',
    permission_action: 'edit',
  },

  // Role Permission
  {
    pathname: '/dashboard/role/:uuid/permission',
    permission_module: 'role_permission',
    permission_action: 'edit',
  },
];

export default PROTECTED_ROUTES;
