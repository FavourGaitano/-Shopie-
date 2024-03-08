CREATE OR ALTER PROCEDURE checkoutCart(
    @cart_id VARCHAR(100),
    @order_id VARCHAR(100),
    @user_id VARCHAR(200)
    )
AS
BEGIN
    UPDATE Cart SET isCheckOut = 1 WHERE cart_id = @cart_id AND isCheckOut = 0;
    
    INSERT INTO Orders(order_id, cart_id, user_id)
    VALUES(@order_id, @cart_id, @user_id)
END 