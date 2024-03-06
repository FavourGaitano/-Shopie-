CREATE OR ALTER PROCEDURE getOneProduct(@product_id VARCHAR(50))
AS
BEGIN
       
SELECT 
        P.*,
        C.name AS CategoryName 
    FROM    
        Products P
        INNER JOIN Categories C ON P.category_id = C.category_id
    WHERE 
        P.product_id = @product_id;
   
END