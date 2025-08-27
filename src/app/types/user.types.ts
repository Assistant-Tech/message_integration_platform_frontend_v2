export enum UserStatus {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  BUSY = "BUSY",
  AWAY = "AWAY",
}

export enum SystemRoles {
  SUPER_ADMIN = "SUPER_ADMIN",
  TENANT_ADMIN = "TENANT_ADMIN",
  MEMBER = "MEMBER",
  GUEST = "GUEST",
}

export interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  roleId: string;
  userStatus: UserStatus;
  role: SystemRoles;
}
