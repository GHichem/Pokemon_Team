# Pokémon_Team
1) make changes in index,js to fit your DB:
 ```javascript
const db = new pg.Client({
  user: 'YOUR_DB_USER',
  host: 'YOUR_DB_HOST',
  database: 'YOUR_DB_NAME',
  password: 'YOUR_DB_PASSWORD',
  port: YOUR_DB_PORT,  // e.g., 5432 for PostgreSQL
});
```
2) create in DB the Table:
```javascript
CREATE TABLE IF NOT EXISTS public.pok (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    img TEXT NOT NULL,
    shiny_img TEXT NOT NULL,
    type1 TEXT NOT NULL,
    type2 TEXT,
    shiny BOOLEAN DEFAULT false
);
```
3) Navigate to the Correct Directory:
```bash
cd 'c:/path/to/your/project/pokemon'
```

4) install all the dependencies using :
```bash
npm i
```
5) Run the Application Locally:
```bash
nodemon index.js 
```
## screenshot 
![image](https://github.com/user-attachments/assets/0156938a-554e-4edf-bc2d-505ac8f010c1)


