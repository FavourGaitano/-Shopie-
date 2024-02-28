

CREATE OR ALTER PROCEDURE createProduct(
        @product_id VARCHAR(100), 
        @name VARCHAR(200),
        @image VARCHAR(200),
        @descr VARCHAR(255),
        @price VARCHAR(255),
        @category_id VARCHAR(200),
        @quantity VARCHAR(200)
        
        

    )
AS
BEGIN
    INSERT INTO Products(product_id, name, image, descr, price, category_id, quantity)
    VALUES(@product_id, @name, @image, @descr, @price, @category_id, @quantity)
END

