export interface Cart{
    cart_id:string;
    user_id:string;
    product_id:string;
    quantity:number;
    total_price?:number;
    isDelete?:string;
    isCheckout?:string;

  
   
}