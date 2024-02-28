export interface User{
    user_id:string;
    name:string;
    email:string;
    phone_no:string;
    role?:string;
    password:string;
    
}

export interface loginUserDetails{
    user_id: string,
    name: string,
    email: string,
    phone_no:string,
    role: string,
    isWelcomed: boolean,
}