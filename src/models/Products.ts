import { ResultSetHeader } from 'mysql2';
import connection from './connection';

import { Item, ItemData, ItemFields } from '../interfaces/productInterface';

const GetAll = async (): Promise<ItemData[]> => {
  const [data] = await connection.execute('SELECT * FROM Trybesmith.Products');
  return data as ItemData[];
};

const Create = async ({ name, amount }: ItemFields): Promise<Item> => {
  const [createResult] = await connection.execute<ResultSetHeader>(
    'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
    [name, amount],
  );
  const { insertId: id } = createResult;

  const insertedUser = { item: { id, name, amount } };

  return insertedUser;
};

export default {
  GetAll,
  Create,
};