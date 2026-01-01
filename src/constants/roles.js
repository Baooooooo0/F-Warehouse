export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MANAGER: 'manager',
  GUEST: 'guest',
};

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: ['read', 'write', 'delete', 'manage_users', 'manage_products'],
  [ROLES.MANAGER]: ['read', 'write', 'manage_products'],
  [ROLES.USER]: ['read', 'write'],
  [ROLES.GUEST]: ['read'],
};

export const hasPermission = (role, permission) => {
  return ROLE_PERMISSIONS[role]?.includes(permission) || false;
};
