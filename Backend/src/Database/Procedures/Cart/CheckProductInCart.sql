CREATE OR ALTER PROCEDURE CheckProductInCart
    @cart_id VARCHAR(100),
    @product_id VARCHAR(100)
AS
BEGIN
    SELECT  *
    FROM Cart
    WHERE cart_id = @cart_id AND product_id = @product_id AND isCheckout = 0 AND isDelete = 0;
END;
