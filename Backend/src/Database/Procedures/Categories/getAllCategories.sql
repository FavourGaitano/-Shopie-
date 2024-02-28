CREATE OR ALTER PROCEDURE getAllCategories
AS
BEGIN
    SELECT * FROM Categories WHERE isDeleted = 0
END