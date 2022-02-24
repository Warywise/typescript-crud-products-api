export interface UserInfo {
  username: string,
  classe: string,
  level: number,
}

export interface UserData extends UserInfo {
  password: string,
}

export interface User extends UserInfo {
  id: number
}

export interface UserPass extends User {
  password: string,
}
