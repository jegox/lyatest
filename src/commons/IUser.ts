export interface ISignup {
  fullname: string;
  nickname: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  fullname: string;
  nickname: string;
  email: string;
}