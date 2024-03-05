CREATE TABLE Products (
    product_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
	image VARCHAR(255) NOT NULL,
    descr VARCHAR(MAX) NOT NULL, 
    price VARCHAR(255) NOT NULL,
    category_id VARCHAR(255) ,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id),
    quantity VARCHAR(255) NOT NULL,
    isDeleted BIT NOT NULL DEFAULT 0,
);

ALTER TABLE Products
ADD CONSTRAINT FK_Category_Product
FOREIGN KEY (category_id) REFERENCES Categories(category_id);