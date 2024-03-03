export interface categoriesResponse {
  categories: [
    {
      category_id: string;
      name: string;

    }
  ];
  error: {
    name: string;
    message: string;
  };
}

export interface OnecategoryResponse {
  category: [
    {
      category_id: string;
      name: string;

    }
  ];
  error: {
    name: string;
    message: string;
  };
}
