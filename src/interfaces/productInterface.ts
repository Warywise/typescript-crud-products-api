export interface ItemFields {
  name: string,
  amount: string,
}

export interface ItemInfos extends ItemFields {
  id: number,
}

export interface ItemData extends ItemInfos {
  orderId: number,
}

export interface Item {
  item: ItemInfos,
}
