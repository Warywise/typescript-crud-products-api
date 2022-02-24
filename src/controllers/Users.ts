import { Response, Request } from 'express';

import StatusCode from '../interfaces/enumStatusCodes';
import { UserData } from '../interfaces/userInterface';
import { LoginContent } from '../interfaces/typesHelper';
import UserServices from '../services/Users';

const Create = async (req: Request, res: Response): Promise<Response> => {
  const UserInfos = req.body as UserData;

  const createResult = await UserServices.Create(UserInfos);

  return res.status(StatusCode.CREATED).json(createResult);
};

const Login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body as LoginContent;
  const LoginResult = await UserServices.Login(username, password);
  const { OK, code, error, token } = LoginResult;

  if (OK) return res.status(code).json({ token });

  return res.status(code).json({ error });
};

export default {
  Create,
  Login,
};
