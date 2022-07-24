# Storefront-backend

- Default port which database runs at is ```5432```, port of server ```3000```.

### Environment variables:
 Configure .env (.env-example)
### Setup db:
 connect to the default postgres database
- ```psql -U postgres```
 create two databases dev and test database
- ```CREATE DATABASE storefront;```
- ```CREATE DATABASE storefronttest;```
 connect to the databases 
- dev database ```\c storefront```
- test database ```\c storefronttest```

  
### Package installation:
 ```npm install```

### Scripts:
- ```npm run watch```
- ```npm run start```
- ```npm run build```
- ```npm run jasmine```
- ```npm run test```
- ```npm run prettify```
- ```npm run lint```
- ```npm run db-up```
- ```npm run db-down```