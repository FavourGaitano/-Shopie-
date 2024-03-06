CREATE OR ALTER PROCEDURE CheckOrderExists
    @cart_id VARCHAR(255)
AS
BEGIN
    
    SELECT * FROM Orders WHERE cart_id= @cart_id;

    
END;