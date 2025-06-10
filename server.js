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
    const pokeResponse = await fetch(`${pokeApi}/pokemon?limit=150`)
    const pokeResponseJSON = await pokeResponse.json()

    // pokemon met Sprites 
    const pokeSprites = await Promise.all(
        pokeResponseJSON.results.map(async (pokemon) => {
            const PokeDetailsResponse = await fetch(pokemon.url)
            const PokeDetails = await PokeDetailsResponse.json()

            return {
                name: PokeDetails.name,
                sprite: PokeDetails.sprites.other.dream_world.front_default,
            }
        })
    )
  
    res.render("index.liquid", {
        pokemon: pokeResponseJSON,
        pokemonDetail: pokeSprites,
    });

});

app.get("/pokemon/:id", async function (req, res) {
    const id = req.params.id;

    const detailResponse = await fetch(`${pokeApi}/pokemon/${id}`);
    const detailResponseJSON = await detailResponse.json();

    res.render("detail.liquid", {
        pokemonDetail: detailResponseJSON,
    });
})


// Port
app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})