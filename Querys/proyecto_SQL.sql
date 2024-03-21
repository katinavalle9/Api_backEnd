INSERT INTO customer (name, last_name, email, phone_number, address, colony, city) VALUES
('John', 'Doe', 'john.doe@example.com', '555-1234', '123 Elm St', 'Downtown', 'Colombia'),
('Jane', 'Doe', 'jane.doe@example.com', '555-5678', '456 Maple St', 'Westside', 'Monterrey'),
('Mike', 'Smith', 'mike.smith@example.com', '555-9012', '789 Oak St', 'Eastside', 'Yucatan'),
('Lucy', 'Jones', 'lucy.jones@example.com', '555-3456', '321 Pine St', 'Southside', 'Guadalajara'),
('Chris', 'Brown', 'chris.brown@example.com', '555-7890', '654 Spruce St', 'Northside', 'Monterrey'),
('Pat', 'Taylor', 'pat.taylor@example.com', '555-2345', '987 Birch St', 'Downtown', 'Cancun'),
('Sam', 'Manzano', 'sam.manzano@example.com', '555-1045', '123 Playa Coral St', 'Downtown', 'Cancun'),
('Alex', 'Johnson', 'alex.johnson@example.com', '555-6789', '654 Cedar St', 'Westside', 'Colombia');

INSERT INTO products (name, description, sku, price) VALUES
('Eau Divine', 'Perfume unisex con notas cítricas', 107, 2500),
('Bolso Bohemio', 'Bolso estilo boho con bordados a mano', 108, 850),
('Reloj Solaris', 'Reloj de pulsera solar con correa de cuero', 109, 5600),
('Pañuelo Seda', 'Pañuelo de seda pura con estampado floral', 110, 340),
('Botas Trekker', 'Botas de senderismo impermeables', 111, 2890),
('Sombrero Fedora', 'Sombrero de lana estilo fedora color gris', 112, 780),
('Cámara Retro', 'Cámara vintage de 35mm con lente ajustable', 113, 1230);


INSERT INTO products (name, description, sku, price) VALUES
('paleta bomba', 'paleta con chile', 114, 3),
('chicles', 'marca trident', 115, 10);



INSERT INTO sale (customer_id) VALUES
(1),
(5),
(3),
(8),
(2),
(11),
(6);

INSERT INTO public."product_Sales" (sale_id, product_id, amount) VALUES
(1, 2, 1),
(2, 11, 2),
(3, 6, 3),
(4, 2, 6),
(5, 5, 4),
(6, 9, 1),
(7, 1, 2),
(1, 7, 1),
(2, 10, 10),
(2, 14, 4)
(3, 4, 3);

INSERT INTO public."product_Sales" (sale_id, product_id, amount) VALUES
(2, 14, 4);

SELECT customer_id
FROM customer
WHERE city = 'Monterrey';


SELECT product_id, description
FROM products
WHERE price < 15;


SELECT 
    c.customer_id, 
    c.name, 
    ps.amount, 
    p.description
FROM 
    customer AS c
JOIN 
    sale AS s ON c.customer_id = s.customer_id
JOIN 
    public."product_Sales" AS ps ON s.sale_id = ps.sale_id
JOIN 
    products AS p ON ps.product_id = p.product_id
WHERE 
    ps.amount > 10;

SELECT 
    c.customer_id, 
    c.name
FROM 
    customer AS c
LEFT JOIN 
    sale AS s ON c.customer_id = s.customer_id
WHERE 
    s.sale_id IS NULL;


SELECT 
    c.customer_id, 
    c.name
FROM 
    customer AS c
JOIN 
    (SELECT sale_id, customer_id FROM sale) AS s ON c.customer_id = s.customer_id
JOIN 
    (SELECT sale_id, product_id FROM public."product_Sales") AS ps ON s.sale_id = ps.sale_id
GROUP BY 
    c.customer_id
HAVING 
    COUNT(DISTINCT ps.product_id) = (SELECT COUNT(DISTINCT product_id) FROM products);

SELECT 
    c.customer_id, 
    c.name, 
    SUM(ps.amount) AS total_products
FROM 
    customer AS c
JOIN 
    sale AS s ON c.customer_id = s.customer_id
JOIN 
    public."product_Sales" AS ps ON s.sale_id = ps.sale_id
GROUP BY 
    c.customer_id;
	
	
SELECT p.product_id
FROM products AS p
WHERE NOT EXISTS (
    SELECT 1
    FROM public."product_Sales" AS ps
    JOIN sale AS s ON ps.sale_id = s.sale_id
    JOIN customer AS c ON s.customer_id = c.customer_id
    WHERE c.city = 'Guadalajara'
    AND p.product_id = ps.product_id
);

SELECT DISTINCT ps.product_id
FROM public."product_Sales"  AS ps
JOIN sale AS s ON ps.sale_id = s.sale_id
JOIN customer AS c ON s.customer_id = c.customer_id
WHERE c.city = 'Monterrey'
AND ps.product_id IN (
    SELECT ps.product_id
    FROM public."product_Sales" AS ps
    JOIN sale AS s ON ps.sale_id = s.sale_id
    JOIN customer AS c ON s.customer_id = c.customer_id
    WHERE c.city = 'Cancún'
);

select customer.city,products.product_id, products.name 
from customer 
inner join sale on sale.customer_id=customer.customer_id
inner join "product_Sales" on "product_Sales".sale_id=sale.sale_id
inner join products on products.product_id = "product_Sales".product_id
where customer.city in ('Monterrey','Cancun')

SELECT 
    customer.city,
    array_agg(products.product_id) AS product_ids,
    array_agg(products.name) AS product_names
FROM 
    customer
INNER JOIN 
    sale ON sale.customer_id = customer.customer_id
INNER JOIN 
    "product_Sales" ON "product_Sales".sale_id = sale.sale_id
INNER JOIN 
    products ON products.product_id = "product_Sales".product_id
WHERE 
    customer.city IN ('Monterrey', 'Cancun')
GROUP BY 
    customer.city;

SELECT 
    customer.city,
    array_agg(DISTINCT products.product_id) AS product_ids,
    array_agg(DISTINCT products.name) AS product_names
FROM 
    customer 
INNER JOIN 
    sale ON sale.customer_id = customer.customer_id
INNER JOIN 
    "product_Sales" ON "product_Sales".sale_id = sale.sale_id
INNER JOIN 
    products ON products.product_id = "product_Sales".product_id
WHERE 
    customer.city IN ('Monterrey', 'Cancun')
GROUP BY 
    customer.city;

SELECT c.city
FROM customer AS c
JOIN sale AS s ON c.customer_id = s.customer_id
JOIN "product_Sales" AS ps ON s.sale_id = ps.sale_id
JOIN products AS p ON ps.product_id = p.product_id
GROUP BY c.city
HAVING COUNT(DISTINCT p.product_id) = (SELECT COUNT(DISTINCT product_id) FROM products);


INSERT INTO public."product_Sales" (sale_id, product_id, amount) VALUES
(7, 14, 1),
(7, 4, 1),
(7, 5, 1),
(7, 6, 1),
(7, 7, 1),
(7, 8, 1),
(7, 9, 1),
(7, 10, 1),
(7, 11, 1),
(7, 12, 1),
(7, 13, 1);




