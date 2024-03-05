CREATE OR ALTER PROCEDURE getOrderByUserId
    @user_id VARCHAR(100)
AS
BEGIN
    
    SELECT 
        o.order_id, 
        o.user_id, 
        c.product_id, 
        p.name, 
        p.descr, 
        p.price, 
        c.quantity,
        c.total_price
    FROM Orders o
    INNER JOIN Cart c ON o.cart_id = c.cart_id
    INNER JOIN Products p ON c.product_id = p.product_id
    WHERE o.user_id = @user_id 
      AND c.isCheckOut = 1 
      AND c.isDelete = 0
      AND o.isCancel = 0
END;
