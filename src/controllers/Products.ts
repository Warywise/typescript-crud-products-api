import { Response, Request } from 'express';

import StatusCode from '../interfaces/enumStatusCodes';
import { ItemFields } from '../interfaces/productInterface';
import ProductServices from '../services/Products';

const Create = async (req: Request, res: Response): Promise<Response> => {
  const itemInfos = req.body as ItemFields;
  const createResult = await ProductServices.Create(itemInfos);

  return res.status(StatusCode.CREATED).json(createResult);
};

const GetAll = async (_req: Request, res: Response): Promise<Response> => {
  const getAllResult = await ProductServices.GetAll();

  return res.status(StatusCode.OK).json(getAllResult);
};

export default {
  Create,
  GetAll,
};
