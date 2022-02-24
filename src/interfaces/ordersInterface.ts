import { RowDataPacket } from 'mysql2';

export interface OrderProduct {
  products: number[],
}

export interface Order extends OrderProduct{
  userId: number,
}

export interface OrderReturn {
  order: Order,
}

export interface ProductId extends RowDataPacket{
  id: number,
}

export interface GetByIdReturn extends Order {
  id: number,
}

export interface GetAllReturn {
  id: number,
  userId: number,
}
