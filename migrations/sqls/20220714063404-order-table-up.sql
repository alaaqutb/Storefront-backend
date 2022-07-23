CREATE TYPE orderStatus AS ENUM ('active', 'complete');
CREATE TABLE orders (
id SERIAL PRIMARY KEY NOT NULL,
status orderStatus NOT NULL
)