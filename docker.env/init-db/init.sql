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

insert into shops (name, logo) values ('McDonald’s', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/800px-McDonald%27s_Golden_Arches.svg.png');