export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  token: string;
}

export interface CreateUserData {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface UpdateUserData {
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
}
