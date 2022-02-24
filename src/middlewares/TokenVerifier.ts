import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotEnv from 'dotenv';

import StatusCode from '../interfaces/enumStatusCodes';
import { AuthReq } from '../interfaces/typesHelper';
import { User } from '../interfaces/userInterface';

dotEnv.config();
const SECRET = process.env.JWT_SECRET || 'senhasecretasupersegurade1a8';

const TokenVerifier = (req: Request, res: Response, next: NextFunction): Response | void => {
  const { authorization: token } = req.headers as AuthReq;

  if (!token) {
    const error = 'Token not found';
    return res.status(StatusCode.UNAUTHORIZED_USER).json({ error });
  }

  try {
    const verifyToken = jwt.verify(token, SECRET) as User;
    if (verifyToken.id) next();
  } catch (err) {
    const error = 'Invalid token';
    return res.status(StatusCode.UNAUTHORIZED_USER).json({ error });
  }
};

export default TokenVerifier;