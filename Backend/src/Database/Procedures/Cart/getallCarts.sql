CREATE OR ALTER PROCEDURE getAllCarts
AS
BEGIN
    SELECT * FROM Cart WHERE isDelete = 0
END