CREATE OR ALTER PROCEDURE getAllProducts
AS
BEGIN
    SELECT 
        P.*,
        C.name AS CategoryName 
    FROM    
        Products P
        INNER JOIN Categories C ON P.category_id = C.category_id
    WHERE 
        P.isDeleted = 0
END