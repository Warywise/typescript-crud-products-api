import ProductModel from '../models/Products';

import { Item, ItemData, ItemFields } from '../interfaces/productInterface';

const Create = async (item: ItemFields): Promise<Item> => {
  const createResult = await ProductModel.Create(item);

  return createResult;
};

const GetAll = async (): Promise<ItemData[]> => {
  const getAllProducts = await ProductModel.GetAll();

  return getAllProducts;
};

export default {
  Create,
  GetAll,
};
