CREATE OR ALTER PROCEDURE getCartByUserId
    @user_id VARCHAR(100)
AS
BEGIN
    
    SELECT c.cart_id, c.user_id, c.product_id, p.name, p.descr, p.price
    FROM Cart c
    INNER JOIN Products p ON c.product_id = p.product_id
    WHERE c.user_id = @user_id AND isCheckOut = 0 AND isDelete = 0;
END;

