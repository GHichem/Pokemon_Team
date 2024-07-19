# Pokémon_Team
1) make changes in index,js to fit your DB:
const db = new pg.Client({
  user: 'YOUR_DB_USER',
  host: 'YOUR_DB_HOST',
  database: 'YOUR_DB_NAME',
  password: 'YOUR_DB_PASSWORD',
  port: YOUR_DB_PORT,  // e.g., 5432 for PostgreSQL
});

2) create in DB the Table:
3) 
CREATE TABLE IF NOT EXISTS public.pok (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    img TEXT NOT NULL,
    shiny_img TEXT NOT NULL,
    type1 TEXT NOT NULL,
    type2 TEXT,
    shiny BOOLEAN DEFAULT false
);

4) Navigate to the Correct Directory:
 cd 'c:/path/to/your/project/pokemon'


5) install all the dependencies using :
npm i

6)Run the Application Locally:
 nodemon index.js 
