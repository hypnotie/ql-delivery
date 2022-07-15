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
('McDonald’s', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/800px-McDonald%27s_Golden_Arches.svg.png') ,
('Burger King', 'https://seeklogo.com/images/B/burger-king-new-2021-logo-F43BDE45C7-seeklogo.com.png') ,
('Baskin Robbins', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Baskin-Robbins_logo.svg/1024px-Baskin-Robbins_logo.svg.png') ,
('Puzata Hata', 'https://i.imgur.com/MnRaOQG.png') ,
('Domino’s Pizza', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Domino%27s_pizza_logo.svg/2036px-Domino%27s_pizza_logo.svg.png') ,
('KFC', 'https://i.imgur.com/iGTdJmn.png') ,
('Sushiya', 'https://i.imgur.com/5aXABnx.png') ,
('Papa John’s', 'https://i.imgur.com/Y1JKJZu.png') ,
('Mister Cat', 'https://img.postershop.me/10900/Config/268261_1651117741.9328_original.png') ;