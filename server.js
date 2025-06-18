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

// Base api link
const pokeApi = "https://pokeapi.co/api/v2/";

// MARK: home
app.get("/", async function (req, res) {

    // alle pokemon, laden gelimiteerd tot 12 per keer
    const pokeResponse = await fetch(`${pokeApi}/pokemon?limit=12`)
    const pokeResponseJSON = await pokeResponse.json()

    // van alle pokemon die hierboven aangeroepen zijn de Sprites (afbeeldingen) ophalen 
    // wacht tot alles is opgehaald en rendert alles tegelijk liquid in
    const pokeSprites = await Promise.all(
        pokeResponseJSON.results.map(async (pokemon) => {
            const PokeDetailsResponse = await fetch(pokemon.url)
            // console.log(pokemon.url)
            const PokeDetails = await PokeDetailsResponse.json()

            // het terug laten geven van de naam en sprite
            return {
                name: PokeDetails.name,
                sprite: PokeDetails.sprites.other.dream_world.front_default,
                types: PokeDetails.types.map(t => t.type.name),
            }
        })
    )

    // console.log(pokeSprites);
  
    res.render("index.liquid", {
        pokemonDetail: pokeSprites,
    });

});

app.get("/search", async function (req, res) {

    res.render("search.liquid", {
    });

});


// MARK: detail
app.get("/:name", async function (req, res)  {
    const name = req.params.name.toLowerCase();
    // .toLowerCase() achter zetten, database kan gevoelig zijn voor hoofdletters en dit kan fouten opleveren

    try {
        // op basis van de naam de data ophalen van de pokemon
        const detailResponse = await fetch(`${pokeApi}/pokemon/${name}`);
        const detailData = await detailResponse.json();

        res.render("detail.liquid", {
            detailsOfPokemon: {
                // about
                name: detailData.name,
                id: detailData.id,
                xp: detailData.base_experience,
                sprite: detailData.sprites.other.dream_world.front_default,
                height: detailData.height,
                weight: detailData.weight,
                types: detailData.types.map(t => t.type.name),
                abilities: detailData.abilities.map(a => a.ability.name),
                // states
                hp: detailData.stats[0].base_stat,
                attack: detailData.stats[1].base_stat,
                defense: detailData.stats[2].base_stat,
                specialAttack: detailData.stats[3].base_stat,
                specialDefense: detailData.stats[4].base_stat,
                speed: detailData.stats[5].base_stat,
            }
        })
    } 

    // als de pokemon niet gevonden is of er een foutmelding is komt er een 404
    catch (error) {
        res.status(404).send('Pokémon not found')
    }
})

// MARK: port
app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})