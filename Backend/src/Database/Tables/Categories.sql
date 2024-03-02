CREATE TABLE Categories (
    category_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    isDeleted BIT NOT NULL DEFAULT 0
);