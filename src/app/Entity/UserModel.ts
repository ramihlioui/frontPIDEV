export class User {
    id: number;
    email: string;
    fullName: string;
    loginAttempts: number;
    isEnabled: boolean;
    isLocked: boolean;
    roles: Role[];
    enabled: boolean;
    username: string;
    authorities: Authority[];
    accountNonLocked: boolean;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
  }
  
  export class Role {
    id: number;
    role: string;
  }
  
  export class Authority {
    authority: string;
  }