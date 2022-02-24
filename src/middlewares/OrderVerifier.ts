import { Request, Response, NextFunction } from 'express';

import StatusCode from '../interfaces/enumStatusCodes';
import { OrderProduct } from '../interfaces/ordersInterface';

const OrderVerifier = (req: Request, res: Response, next: NextFunction): Response | void => {
  const { products } = req.body as OrderProduct;

  if (!products) {
    const error = 'Products is required';
    return res.status(StatusCode.BAD_REQUEST).json({ error });
  }

  if (!Array.isArray(products)) {
    const error = 'Products must be an array of numbers';
    return res.status(StatusCode.INVALID_CONTENT).json({ error });
  }

  if (products.length < 1) {
    const error = 'Products can\'t be empty';
    return res.status(StatusCode.INVALID_CONTENT).json({ error });
  }

  next();
};

export default OrderVerifier;
