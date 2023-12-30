export interface SignupPayload {
  username: string;
  fullname: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}
