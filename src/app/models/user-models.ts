export type User = {
  username: string;
  email?: string;
  password: string;
  createdAt?: Date | null;
  token?: string;
};

export type UserRegistered = {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
};
