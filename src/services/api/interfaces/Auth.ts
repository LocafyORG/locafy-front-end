export interface RegisterPayload {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }

  export interface LoginPayload {
    email: string;
    password: string;
  }