import express from "express";
import { Liquid } from "liquidjs";
import methodOverride from "method-override"; // Importeer de "method-override" module, die het mogelijk maakt om HTTP-methoden te gebruiken

// Express
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Method Override
app.use(methodOverride("_method"));

// Liquid
const engine = new Liquid();
app.engine("liquid", engine.express());

// Views
app.set("views", "./views");

const PokeAppUrl = "https://pokeapi.co/api/v2/pokemon/ditto";

app.get("/", async function (req, res) {
    // req + res plss T-T
    // Filter de content op gewenste keys
  
    res.render("index.liquid");
});





// Port
app.set("port", process.env.PORT || 8000);

app.listen(app.get("port"), function () {
  console.log(`http://localhost:${app.get("port")}`);
});

console.log('Hier komt je server voor Sprint 12.')
