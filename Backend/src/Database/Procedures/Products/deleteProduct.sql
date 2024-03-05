CREATE OR ALTER PROCEDURE deleteProduct(@product_id VARCHAR(100))
AS
BEGIN
    UPDATE Products SET isDeleted = 1 WHERE product_id = @product_id
END