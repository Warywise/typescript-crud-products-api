import { ResultSetHeader } from 'mysql2';
import connection from './connection';

import { UserData, User, UserPass } from '../interfaces/userInterface';

const GetAll = async (): Promise<UserData[]> => {
  const [data] = await connection.execute('SELECT * FROM MySchema.Users');
  return data as UserData[];
};

const Create = async ({ username, classe, level, password }: UserData): Promise<User> => {
  const [createResult] = await connection.execute<ResultSetHeader>(
    'INSERT INTO MySchema.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
    [username, classe, level, password],
  );
  const { insertId: id } = createResult;

  const insertedUser: User = { id, username, classe, level };

  return insertedUser;
};

const GetByQuery = async (query: string, value: string): Promise<UserPass[]> => {
  const [data] = await connection.execute(
    `SELECT * FROM MySchema.Users WHERE ${query}=?`,
    [value],
  );
  return data as UserPass[];
};

export default {
  GetAll,
  Create,
  GetByQuery,
};
