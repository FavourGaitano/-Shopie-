CREATE OR ALTER PROCEDURE getAllOrders
AS
BEGIN
    SELECT 
        O.order_id,
        O.user_id,
        O.cart_id,
        O.created_at AS order_created_at,
        O.isCancel,
        O.status,
        
        C.cart_id AS cart_unique_id,  
        C.product_id,
        P.name AS product_name,  
        C.quantity,
        C.total_price
    FROM    
        Orders O
        INNER JOIN Cart C ON O.cart_id = C.cart_id 
        INNER JOIN Products P ON C.product_id = P.product_id
    WHERE 
        C.isCheckout = 1 AND C.isDelete = 0 AND O.isCancel = 0
END;
