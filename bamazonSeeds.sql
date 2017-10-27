DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;
USE bamazon_DB;
CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Eloquent JavaScript", "Books", 19.99, 12),
		("Too Good At Goodbyes", "Music", 14.99, 122),
		("Senhizer Earbuds", "Electronics", 38.69, 150),
		("Dry Goji Berries", "Produce", 8.99, 300),
		("Protein Powder", "Supplements", 38.89, 90),
		("Converse Backpack", "Sports", 81.99, 130),
		("MiniHDMI cord", "Electronics", 11.99, 350),
		("Crinkle Balls Cat pack", "Pets", 3.99, 150),
		("Wild Alaskan Salmon", "Grocery", 8.99, 200),
		("B12 Gummies", "Supplements", 9.49, 110),
		("Freeze Dried Bananas", "Grocery", 14.95, 400),
		("Green Tea Powder", "Supplements", 9.45, 250);
