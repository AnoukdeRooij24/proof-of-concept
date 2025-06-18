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

// Base api link en post naar directus link
const pokeApi = "https://pokeapi.co/api/v2/";
const favoPokemon = 'https://fdnd.directus.app/items/person/169?fields=custom';


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

// MARK: search
app.get("/search", async function (req, res) {
    try {
        // zoekterm ophalen en omzetten naar kleine letters
        const keyword = req.query.p?.toLowerCase() || "";

        // pokemon naam ophalen van alle 1000 pokemon
        const pokemonResponse = await fetch(`${pokeApi}pokemon?limit=1000`);
        const pokemonResponseJSON = await pokemonResponse.json();

        // resultaten filteren zodat alleen de pokemon met een matchende naam blijft
        const results = pokemonResponseJSON.results.filter(pokemon =>
            pokemon.name.toLowerCase().includes(keyword)
        );

        // als hij niks kan vinden komt de 404 pagina (met zoekterm)
        if (results.length === 0) {
            return res.render('404.liquid', { p: keyword });
        }

        // van elke pokemon de detail informatie ophalen
        const detailedResults = await Promise.all(results.map(async (pokemon) => {
            try {
                const detailedResponse = await fetch(pokemon.url);
                const pokemonDetails = await detailedResponse.json();

                return {
                    name: pokemonDetails.name,
                    sprite: pokemonDetails.sprites.other.dream_world.front_default, 
                    types: pokemonDetails.types.map(t => t.type.name),
                };
            } 
            // als hij niks kan vinden komt de 404 pagina (met zoekterm)
            catch (error) {
                return res.render('404.liquid', { p: keyword });
            }
        }));

        //  
        const filteredDetailedResults = detailedResults.filter(p => p !== null);

        // alle informatie uit pokemonDetail laten zien + zoekterm
        return res.render('index.liquid', {
            pokemonDetail: filteredDetailedResults,
            p: keyword
        });
    } 
        // als hij niks kan vinden komt de 404 pagina (met zoekterm)
        catch (err) {
        return res.render('404.liquid');
    }
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
        res.status(404).send('Pokémon not found', error)
    }
});

// MARK: post
app.post('/:pokemon/catch', async (req, res) => {
    try {
      const { pokemon } = req.params;
  
      // fetch de huisige data
      const response = await fetch("https://fdnd.directus.app/items/person/169?fields=custom");
      const { data = {} } = await response.json();
      const customData = data.custom ?? {};
  
    // zorg dat er een lijst is van gevangen Pokemon
    let caughtList = [];

    if (Array.isArray(customData.favoPokemon)) {
    caughtList = customData.favoPokemon;
    }

    // maak een nieuwe lijst (toggle)
    let updatedList;

        // als de pokemon al gevangen is, dan release
        if (caughtList.includes(pokemon)) {
        // nieuwe lijst excl geklikte pokemon
        updatedList = caughtList.filter(name => name !== pokemon);
        } 
        
        // als de pokemon niet gevangen is, dan catch 
        else {
        // nieuwe lijst incl geklikte pokemon
        updatedList = [...caughtList, pokemon];
        }  

    // de post (patch, omdat je een field aanpast en niet toevoegd)
    await fetch("https://fdnd.directus.app/items/person/169", {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ custom: { favoPokemon: updatedList } })
    });
  
    // redirect naar de pagina waar de gebruiker vandaan kwam
    res.redirect(303, req.get("Referer") || "/");
    } 

    catch (error) {
      console.error("404.liquid", error);
      res.status(500).send("404.liquid");
    }
});

// MARK: 404 
app.use((req, res) => {
    res.status(404).render("404.liquid", { })
});

// MARK: port
app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})