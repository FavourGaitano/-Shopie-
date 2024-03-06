export interface OneUsercartResponse {
  cartDetails: [
    {
      quantity: number;
      product_id: string;
      name: string;
      price: number;

    }
  ];
  error: {
    name: string;
    message: string;
  };
}
