export interface userResponse {
  users: [
    {
      user_id: string;
      name: string;
      email: string;
      phone_no: string;
      created_at: string;
      password: string;
    }
  ];
  error: {
    name: string;
    message: string;
  };
}

export interface OneUserResponse {
  user: [
    {
      user_id: string;
      name: string;
      email: string;
      phone_no: string;
      created_at: string;
      password: string;
    }
  ];
  error: {
    name: string;
    message: string;
  };
}
