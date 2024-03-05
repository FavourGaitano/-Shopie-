CREATE TABLE Cart (
    cart_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    product_id VARCHAR(255) NOT NULL,
    created_at datetime NOT NULL DEFAULT GETDATE(),
	quantity INT NOT NULL DEFAULT 1,
	total_price INT NOT NULL,
	isDelete BIT NOT NULL DEFAULT 0,
	isCheckOut BIT NOT NULL DEFAULT 0
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);



ALTER TABLE Cart
ADD cart_primary_key INT IDENTITY(1,1) PRIMARY KEY;

