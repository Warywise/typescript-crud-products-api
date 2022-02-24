export type Token = { token: string };

export type UserInfoStrings = {
  username: string,
  classe: string,
  password: string,
};

export type ErrorReturn = {
  code: number,
  error: string,
};

export type LoginContent = {
  username: string,
  password: string,
};

export type LoginReturn = {
  OK: boolean,
  code: number,
  error: string | boolean,
  token: string,
};

export type AuthReq = {
  authorization: string,
};

export type IdParams = {
  id: string,
};
