import { Request, Response, NextFunction } from 'express';

import { LoginContent } from '../interfaces/typesHelper';
import StatusCode from '../interfaces/enumStatusCodes';

const LoginVerifier = (req: Request, res: Response, next: NextFunction): Response | void => {
  const { username, password } = req.body as LoginContent;

  if (!username) {
    const error = 'Username is required';
    return res.status(StatusCode.BAD_REQUEST).json({ error });
  }

  if (!password) {
    const error = 'Password is required';
    return res.status(StatusCode.BAD_REQUEST).json({ error });
  }

  next();
};

export default LoginVerifier;