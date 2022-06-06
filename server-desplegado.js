const express = require("express");
const app = express();

// hbs
const hbs = require("hbs");
require("./hbs/helpers");

// config variables de entorno
require("dotenv").config();
const port = process.env.PORT || 8080;

// archivos estaticos
app.use(express.static(__dirname + "/public-desplegado"));

// midelwares
app.set("view engine", "hbs"); // USAR VIEW ENGINE COMO RENDERIZADOR

// routes con partials hbs
hbs.registerPartials(__dirname + "/views/parciales");

app.get("/", (request, response) => {
  response.render("home", {
    nombre: "richard nicanor",
    saludos: "hola cristina",
  });
});
app.get("/about", (request, response) => {
  response.render("about");
});

app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`);
});
