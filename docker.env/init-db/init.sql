CREATE TABLE IF NOT EXISTS shops
(
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    logo text
);

CREATE TABLE IF NOT EXISTS products
(
    id SERIAL PRIMARY KEY,
    shop_id integer references shops(id) ON UPDATE CASCADE ON DELETE SET NULL,
    name text NOT NULL,
    price numeric NOT NULL,
    image text
);

CREATE TABLE IF NOT EXISTS orders
(
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    address text NOT NULL,
    total_price numeric NOT NULL
);

CREATE TABLE IF NOT EXISTS order_items
(
    id SERIAL PRIMARY KEY,
    product_id integer references products(id) ON DELETE SET NULL ON UPDATE CASCADE,
    order_id integer references orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
    quantity integer NOT NULL
);

INSERT INTO shops (name, logo)
VALUES 
('McDonald’s', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/800px-McDonald%27s_Golden_Arches.svg.png'),
('Burger King', 'https://seeklogo.com/images/B/burger-king-new-2021-logo-F43BDE45C7-seeklogo.com.png'),
('Baskin Robbins', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Baskin-Robbins_logo.svg/1024px-Baskin-Robbins_logo.svg.png'),
('Domino’s Pizza', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Domino%27s_pizza_logo.svg/2036px-Domino%27s_pizza_logo.svg.png'),
('KFC', 'https://i.imgur.com/iGTdJmn.png'),
('Papa John’s', 'https://i.imgur.com/Y1JKJZu.png');

INSERT INTO products (shop_id, name, price, image)
VALUES
(1, 'Cheeseburger', 1.09, 'https://i.imgur.com/1PtuQLj.jpg'),
(1, 'Double Cheeseburger', 1.49, 'https://i.imgur.com/UGj3XJy.jpg'),
(1, 'Royal Cheeseburger', 1.89, 'https://i.imgur.com/nDtPymF.jpg'),
(1, 'McChicken', 1.59, 'https://i.imgur.com/pUjiAMU.jpg'),
(1, 'Big Mac', 1.89, 'https://i.imgur.com/Xtq6MAR.jpg'),
(1, 'Filet-O-Fish', 2.19, 'https://i.imgur.com/PF5HiPM.jpg'),
(1, 'French Fries', 1.79, 'https://i.imgur.com/HeLBxr2.jpg'),
(1, 'Coca-Cola', 1.59, 'https://i.imgur.com/OV1iPX2.jpg'),
(2, 'BK Royal Crispy Chicken Sandwich', 5.29, 'https://i.imgur.com/ogilnBn.jpg'),
(2, 'Original Chicken Sandwich', 4.19, 'https://i.imgur.com/xTlq6G8.jpeg'),
(2, 'Chicken Nuggets', 1.79, 'https://i.imgur.com/dIL79Hr.jpg'),
(2, 'Chicken Fries', 6.29, 'https://i.imgur.com/DptOjgI.jpg'),
(2, 'Onion Rings', 1.99, 'https://i.imgur.com/0FKzghq.jpg'),
(3, 'Baseball Nut', 11.99, 'https://i.imgur.com/gPmAEcX.jpg'),
(3, 'Triple Mango', 11.99, 'https://i.imgur.com/kqfOpIx.jpg'),
(3, 'Cherries Jubilee', 11.99, 'https://i.imgur.com/JT4Dem9.jpg'),
(3, 'Chocolate Chip', 11.99, 'https://i.imgur.com/0v2BKtq.jpg'),
(3, 'Cookie Dough', 11.99, 'https://i.imgur.com/Ol15al8.jpg'),
(3, 'Chocolate Fudge', 11.99, 'https://i.imgur.com/kV7pH3F.jpeg'),
(4, 'Toscana', 9.29, 'https://i.imgur.com/AQBWpOQ.jpg'),
(4, 'Tony Pepperoni', 8.79, 'https://i.imgur.com/dv2rzSQ.jpg'),
(4, 'Chicken Kebab', 8.79, 'https://i.imgur.com/RfkkBAX.jpg'),
(4, 'Five Cheese', 9.99, 'https://i.imgur.com/a6ktDaQ.jpg'),
(4, 'Carbonara', 8.99, 'https://i.imgur.com/DenQEC1.jpg'),
(5, 'Dunked Zinger Burger', 2.69, 'https://i.imgur.com/SybieK8.jpg'),
(5, 'Colonel Burger', 2.39, 'https://i.imgur.com/4Rwpt1E.jpg'),
(5, 'Twister', 2.69, 'https://i.imgur.com/C5iSSHm.jpg'),
(5, '21 Piece Bucket', 19.19, 'https://i.imgur.com/LbiHqkd.jpg'),
(5, 'Boxmaster Original', 3.39, 'https://i.imgur.com/vot8ujh.jpg'),
(5, 'Chips', 1.29, 'https://i.imgur.com/V8sZoiB.jpg'),
(5, 'Coca-Cola', 0.89, 'https://i.imgur.com/bfZ5pd8.jpg'),
(6, 'The Works', 10.99, 'https://i.imgur.com/fuHz88M.jpg'),
(6, 'All The Meats', 10.99, 'https://i.imgur.com/Of3Loxc.jpg'),
(6, 'Garden Fresh', 10.99, 'https://i.imgur.com/S31CwzG.jpg'),
(6, 'Chicken Spinach Alfredo', 10.99, 'https://i.imgur.com/XBPyEHh.jpg');