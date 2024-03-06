export interface productsResponse {
  products: [
    {
      product_id: string;
      name: string;
      image: string;
      descr: string;
      price: string;
      category_id: string;
      quantity:string;
    }
  ];
  error: {
    name: string;
    message: string;
  };
}

export interface OneproductResponse {
  product: [
    {
      product_id: string;
      name: string;
      image: string;
      descr: string;
      price: string;
      category_id: string;
      quantity:string;
      CategoryName: string;
    }
  ];
  // error: {
  //   name: string;
  //   message: string;
  // };
}
