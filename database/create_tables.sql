CREATE TABLE users (
    userId INTEGER PRIMARY KEY,
    userCreated DATETIME DEFAULT CURRENT_TIMESTAMP,
    userName TEXT NOT NULL,
    userEmail TEXT NOT NULL UNIQUE,
    userPassword TEXT NOT NULL,
    userType TEXT NOT NULL
);

CREATE TABLE cart (
    cartId INTEGER PRIMARY KEY,
    status TEXT NOT NULL,
    dateCreated DATETIME DEFAULT CURRENT_TIMESTAMP,
    userId INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(userId)
);

CREATE TABLE categories (
    categoryId INTEGER PRIMARY KEY,
    categoryName TEXT NOT NULL,
    categoryOrder INTEGER NOT NULL
);

CREATE TABLE products (
    productId INTEGER PRIMARY KEY,
    productName TEXT NOT NULL,
    productDescription TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    price REAL NOT NULL,
    categoryId INTEGER NOT NULL,
    isFeatured INTEGER DEFAULT 0,
    FOREIGN KEY (categoryId) REFERENCES categories(categoryId)
);

CREATE TABLE cartproducts (
    cartProductsId INTEGER PRIMARY KEY,
    cartId INTEGER NOT NULL,
    productId INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (cartId) REFERENCES cart(cartId),
    FOREIGN KEY (productId) REFERENCES products(productId)
);