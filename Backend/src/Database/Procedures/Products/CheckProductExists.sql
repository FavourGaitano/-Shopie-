CREATE OR ALTER PROCEDURE CheckProductExists
    @name VARCHAR(255)
AS
BEGIN
    
    SELECT * FROM Products WHERE name= @name;

    
END;