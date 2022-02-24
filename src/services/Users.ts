import jwt from 'jsonwebtoken';
import dotEnv from 'dotenv';
import UserModel from '../models/Users';

import { UserData, User } from '../interfaces/userInterface';
import { Token, LoginReturn } from '../interfaces/typesHelper';
import StatusCode from '../interfaces/enumStatusCodes';

dotEnv.config();
const SECRET = process.env.JWT_SECRET || 'senhasecretasupersegurade1a8';

const Create = async (user: UserData): Promise<Token> => {
  const createResult: User = await UserModel.Create(user);

  const token = jwt.sign(createResult, SECRET);

  return { token };
};

const Login = async (user: string, password: string): Promise<LoginReturn> => {
  const userInfos = await UserModel.GetByQuery('username', user);

  if (userInfos.length < 1 || userInfos[0].password !== password) {
    return {
      OK: false,
      code: StatusCode.UNAUTHORIZED_USER,
      error: 'Username or password invalid',
      token: '',
    };
  }

  const { id, username, classe, level } = userInfos[0];
  const token = jwt.sign({ id, username, classe, level }, SECRET);

  return {
    OK: true, code: StatusCode.OK, error: false, token,
  };
};

export default {
  Create,
  Login,
};
