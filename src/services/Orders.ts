import jwt from 'jsonwebtoken';

import OrderModel from '../models/Orders';
import { User } from '../interfaces/userInterface';
import { GetByIdReturn, OrderReturn } from '../interfaces/ordersInterface';

const Create = async (products: number[], token: string): Promise<OrderReturn> => {
  const { id } = jwt.decode(token) as User;
  const createResult = await OrderModel.Create(products, id);

  return createResult;
};

const GetById = async (id: number, token: string): Promise<boolean | GetByIdReturn> => {
  const orderById = await OrderModel.GetById(id);

  if (orderById.length > 0) {
    const { id: userId } = jwt.decode(token) as User;
    return {
      id, userId, products: orderById.map(({ id: prodId }) => prodId),
    };
  }

  return false;
};

const GetAll = async (): Promise<GetByIdReturn[]> => {
  const getAllOrders = await OrderModel.GetAll();

  const getAllOrderProducts = getAllOrders.map(async ({ id, userId }) => {
    const getProducts = await OrderModel.GetById(id);

    return {
      id, userId, products: getProducts.map(({ id: prodId }) => prodId),
    };
  });

  const allOrders = await Promise.all(getAllOrderProducts);

  return allOrders;
};

export default {
  Create,
  GetById,
  GetAll,
};
