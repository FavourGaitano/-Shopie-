export interface OneUsercartResponse {
  cartDetails: [
    {
      cart_id: string;
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

export interface OnecartResponse {
  cartById: [
    {
      product_id?: string;
      name: string;
      image: string;
      price: number;
      quantity:number;
      
    }
  ];
  // error: {
  //   name: string;
  //   message: string;
  // };
}

