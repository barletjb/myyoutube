export type User = {
  username: string;
  email?: string;
  password: string;
  token?: string;
};

export type UserRegistered = {
  username: string;
  email: string;
  password: string;
};
