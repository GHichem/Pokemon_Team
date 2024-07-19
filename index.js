import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Pokemon",
  password: "619619",
  port: 5432,
});

db.connect();
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let err = "Enter Pokemon name";

// GET home page
app.get("/", async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM pok ORDER BY id ASC');
    res.render("index.ejs", { pokemons: result.rows, error: err });
  } catch (error) {
    console.error(error);
    res.render("index.ejs", { pokemons: [], error: "Failed to fetch Pokémon" });
  }
});

app.post("/add", async (req, res) => {
  const name = req.body.pokemon;
  try {
    const countResult = await db.query('SELECT COUNT(*) FROM pok');
    const count = parseInt(countResult.rows[0].count, 10);
    err = "Enter Pokemon name";
    if (count >= 6) {
      err = "Pokémon Team full";
      return res.redirect("/");
    }

    const result = await axios.get("https://pokeapi.co/api/v2/pokemon/" + name.toLowerCase());
    const img = result.data.sprites.front_default;
    const shiny_img = result.data.sprites.front_shiny;
    const type1 = result.data.types[0] ? result.data.types[0].type.name : null;
    const type2 = result.data.types[1] ? result.data.types[1].type.name : null;
    await db.query(
      'INSERT INTO pok (name, img, shiny_img, type1, type2) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, img, shiny_img, type1, type2]
    );
    res.redirect("/");
  } catch (error) {
    err = "Pokémon in Team or Wrong";
    console.error(error);
    res.redirect("/");
  }
});

// POST route for deleting a Pokémon
app.post("/delete/:id", async (req, res) => {
  const pokemonId = req.params.id;
  try {
    err = "Enter Pokemon name";
    await db.query('DELETE FROM pok WHERE id = $1', [pokemonId]);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to delete Pokemon" });
  }
});

// POST route for toggling shiny state
app.post("/toggle-shiny/:id", async (req, res) => {
  const pokemonId = req.params.id;
  try {
    err = "Enter Pokemon name";
    const result = await db.query('SELECT shiny FROM pok WHERE id = $1', [pokemonId]);
    const currentShinyState = result.rows[0].shiny;
    await db.query('UPDATE pok SET shiny = $1 WHERE id = $2', [!currentShinyState, pokemonId]);
    res.redirect("/");
  } catch (error) {
    res.status(500).send({ error: "Failed to toggle shiny state" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
