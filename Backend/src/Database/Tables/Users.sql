CREATE TABLE Users (
    user_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_no VARCHAR(255) NOT NULL,
    role VARCHAR(255) DEFAULT 'user',
    password VARCHAR(255) NOT NULL,
    created_at datetime NOT NULL DEFAULT GETDATE(),
    isDeleted BIT NOT NULL DEFAULT 0,
    isWelcomed BIT NOT NULL DEFAULT 0
);
