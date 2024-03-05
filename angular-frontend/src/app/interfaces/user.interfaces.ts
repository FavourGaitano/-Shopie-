export interface User{
    user_id:string;
    name:string;
    email:string;
    phone_no:string;
    role?:string;
    created_at?:string;
    password:string;

}

export interface updateUser{
  name:string;
  email:string;
  phone_no:string;
  password:string;

}
