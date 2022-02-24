import { Request, Response, NextFunction } from 'express';

import { UserData } from '../interfaces/userInterface';
import { ErrorReturn } from '../interfaces/typesHelper';
import verifyUserInfos from './validations/UserValidations';

const UserVerifier = (req: Request, res: Response, next: NextFunction): Response | void => {
  const UserInfos: UserData = req.body;
  const verifyResult = verifyUserInfos(UserInfos);

  if (verifyResult) {
    const { code, error } = verifyResult as ErrorReturn;
    return res.status(code).json({ error });
  }

  next();
};

export default UserVerifier;
