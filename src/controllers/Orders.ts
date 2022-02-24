import { Response, Request } from 'express';

import OrderServices from '../services/Orders';

import StatusCode from '../interfaces/enumStatusCodes';
import { AuthReq, IdParams } from '../interfaces/typesHelper';
import { OrderProduct } from '../interfaces/ordersInterface';

const Create = async (req: Request, res: Response): Promise<Response> => {
  const { products } = req.body as OrderProduct;
  const { authorization } = req.headers as AuthReq;

  const createResult = await OrderServices.Create(products, authorization);

  return res.status(StatusCode.CREATED).json(createResult);
};

const GetById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params as IdParams;
  const { authorization: token } = req.headers as AuthReq;
  const orderById = await OrderServices.GetById(Number(id), token);

  if (orderById) {
    return res.status(StatusCode.OK).json(orderById);
  }
  
  const error = 'Order not found';
  return res.status(StatusCode.NOT_FOUND).json({ error });
};

const GetAll = async (_req: Request, res: Response): Promise<Response> => {
  const allOrders = await OrderServices.GetAll();

  return res.status(StatusCode.OK).json(allOrders);
};

export default {
  Create,
  GetById,
  GetAll,
};
