# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index[GET]'/products'
- Show[GET]'/products/:id'
- Create[POST]'/products'

#### Users
- Index[GET]'/users'
- Show[GET]'/users/:id'
- Create[POST]'/users'

#### Orders
- Index[GET]
- Show[GET]
- Create[POST]
- Current Order by user[GET]'currentorder/user/:id'

## Data Shapes
#### Product
-  id SERIAL PRIMARY KEY NOT NULL
- name VARCHAR(100) NOT NULL
- price DECIMAL NOT NULL

#### User
-id SERIAL PRIMARY KEY NOT NULL
- username VARCHAR(100) NOT NULL
- first_name VARCHAR(100) NOT NULL
- last_name VARCHAR(100) NOT NULL
- password TEXT NOT NULL

#### Orders
- id
- status ENUM ('active', 'complete') NOT NULL

#### Pruchase
- id SERIAL PRIMARY KEY NOT NULL
- order_id SERIAL REFERENCES orders(id) ON DELETE CASCADE
- product_id SERIAL REFERENCES products(id) ON DELETE CASCADE
- user_id SERIAL REFERENCES users(id) ON DELETE CASCADE
- quantity INTEGER NOT NULL