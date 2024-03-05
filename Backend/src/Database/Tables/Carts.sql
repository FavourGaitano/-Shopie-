CREATE TABLE Cart (
    cart_id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    product_id VARCHAR(255) NOT NULL,
    created_at datetime NOT NULL DEFAULT GETDATE(),
	quantity VARCHAR(255)NOT NULL,
	total_price VARCHAR (255)NOT NULL,
	isDelete BIT NOT NULL DEFAULT 0,
	isCheckOut BIT NOT NULL DEFAULT 0
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

ALTER TABLE Cart
ALTER COLUMN quantity NUMERIC(10, 0);

ALTER TABLE Cart
ALTER COLUMN total_price NUMERIC(10, 2);

ALTER TABLE Cart
ADD quantity INT NOT NULL DEFAULT 1;

ALTER TABLE Cart
ADD CONSTRAINT PK_Cart_CartID_UserID PRIMARY KEY (cart_id, user_id);