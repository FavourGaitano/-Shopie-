CREATE OR ALTER PROCEDURE deleteCategory(@category_id VARCHAR(100))
AS
BEGIN
    UPDATE Categories SET isDeleted = 1 WHERE category_id = @category_id
END