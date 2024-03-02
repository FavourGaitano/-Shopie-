CREATE OR ALTER PROCEDURE updateProduct(
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
    UPDATE Products SET 
        name=@name, 
        image=@image, 
        descr=@descr,
        price=@price,
        category_id=@category_id,
        quantity=@quantity
        
       
    WHERE product_id = @product_id
END