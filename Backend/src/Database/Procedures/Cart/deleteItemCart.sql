CREATE OR ALTER PROCEDURE deleteItemCart
    @cart_id VARCHAR(100),
    @product_id VARCHAR(200)
AS
BEGIN
    
    UPDATE Cart
    SET isDelete = 1
    WHERE cart_id = @cart_id AND product_id = @product_id AND quantity= 0;
END;
GO
