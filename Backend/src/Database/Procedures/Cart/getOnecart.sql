

CREATE OR ALTER PROCEDURE getOnecart
    @cart_id VARCHAR(100)
AS
BEGIN
    SELECT 
        c.cart_id, 
        c.quantity, 
        c.user_id, 
        c.product_id, 
        p.name, 
        p.descr AS descr, 
        p.price, 
        p.image
    FROM 
        Cart c
        INNER JOIN Products p ON c.product_id = p.product_id
    WHERE 
        c.cart_id = @cart_id AND c.isCheckout = 1
        AND c.isDelete = 0;
END;
