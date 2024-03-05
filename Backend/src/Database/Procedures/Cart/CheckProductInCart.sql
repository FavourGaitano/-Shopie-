CREATE OR ALTER PROCEDURE CheckProductInCart
    @cart_id VARCHAR(100),
    @product_id VARCHAR(100)
AS
BEGIN
    SELECT COUNT(*) AS ProductCount
    FROM Cart
    WHERE cart_id = @cart_id AND product_id = @product_id
END;
