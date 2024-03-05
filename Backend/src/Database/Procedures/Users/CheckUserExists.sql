CREATE OR ALTER PROCEDURE CheckUserExists
    @email VARCHAR(255),
    @phone_no VARCHAR(255)
AS
BEGIN
    
    SELECT * FROM Users WHERE email = @email OR phone_no =  @phone_no;

    
END;