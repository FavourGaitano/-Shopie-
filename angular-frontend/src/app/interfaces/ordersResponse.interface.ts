export interface ordersResponse {
  orders: [
    {
      user_id: string;
      order_created_at: string;
      status: string;
      product_names: string;
      quantities: string;
      total_prices: string;

    }
  ];
  error: {
    name: string;
    message: string;
  };
}
