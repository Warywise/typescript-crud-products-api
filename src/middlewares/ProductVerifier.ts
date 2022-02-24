import { Request, Response, NextFunction } from 'express';

import verifyProductInfos from './validations/ProductValidations';
import { ItemFields } from '../interfaces/productInterface';
import { ErrorReturn } from '../interfaces/typesHelper';

const ProductVerifier = (req: Request, res: Response, next: NextFunction): Response | void => {
  const ProductInfos: ItemFields = req.body;
  const verifyResult = verifyProductInfos(ProductInfos);

  if (verifyResult) {
    const { code, error } = verifyResult as ErrorReturn;
    return res.status(code).json({ error });
  }

  next();
};

export default ProductVerifier;
