import { ResultSetHeader } from 'mysql2';
import connection from './connection';

import { GetAllReturn, OrderReturn, ProductId } from '../interfaces/ordersInterface';

const GetAll = async (): Promise<GetAllReturn[]> => {
  const [data] = await connection.execute('SELECT * FROM Trybesmith.Orders');
  return data as GetAllReturn[];
};

const Create = async (products: number[], userId: number): Promise<OrderReturn> => {
  const [getOrder] = await connection.execute<ResultSetHeader>(
    'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
    [userId],
  );
  const { insertId: orderId } = getOrder;

  const queryValues = products.map((prodNum) => (connection
    .execute(`UPDATE Trybesmith.Products SET orderId = ${orderId} WHERE id = ${prodNum}`)
  ));

  await Promise.all(queryValues);

  return { order: { userId, products } };
};

const GetById = async (id: number): Promise<ProductId[]> => {
  const [order] = await connection
    .execute<ProductId[]>(`SELECT id FROM Trybesmith.Products WHERE orderId=${id}`);

  return order;
};

export default {
  GetAll,
  Create,
  GetById,
};
