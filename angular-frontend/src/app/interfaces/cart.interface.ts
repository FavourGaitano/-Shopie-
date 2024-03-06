export interface Cart{
  user_id?: string,
  product_id: string,
  quantity: number,

}

export interface deleteItemCart{
  cart_id: string,
  product_id: string,
}
