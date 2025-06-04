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

const PokeAppUrl = "https://pokeapi.co/api/v2/pokemon/ditto";

app.get("/", async function (req, res) {
    // req + res plss T-T
    // Filter de content op gewenste keys
  
    res.render("index.liquid");
});



// Port
app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})