CREATE OR ALTER PROCEDURE getOneUser(@user_id VARCHAR(50))
AS
BEGIN
    SELECT * FROM Users WHERE User_id = @user_id;

   
END