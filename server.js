import express from "express";
import { Liquid } from "liquidjs";

// Express
const app = express();
app.use(express.static("public"));

// Liquid
const engine = new Liquid();
app.engine("liquid", engine.express());

// Views
app.set("views", "./views");
app.use(express.urlencoded({extended: true}))

const pokeApi = "https://pokeapi.co/api/v2/";

app.get("/", async function (req, res) {

    // Alle pokemon, laden gelimiteerd tot 15 per keer
    const pokeResponse = await fetch(`${pokeApi}/pokemon?limit=15`)
    const pokeResponseJSON = await pokeResponse.json()

    // Pokemon details
    const pokemonResponse = await fetch(pokeApi);
    const pokemonResponseJSON = await pokemonResponse.json();
    pokemon.data = pokemonResponseJSON;
  
    res.render("index.liquid", {
        pokemon: pokeResponseJSON,
        pokemonDetail: pokemonResponseJSON,
    });

});



// Port
app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})