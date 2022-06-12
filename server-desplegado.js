const express = require("express");
const app = express();

// hbs
const hbs = require("hbs");

// config variables de entorno
require("dotenv").config();
const port = process.env.PORT || 8080;

// archivos estaticos
app.use(express.static(__dirname + "/public-desplegado"));

// configura express para que use hbs para renderizado de páginas
app.set("view engine", "hbs");
// __dirname, variable global que contiene el path del directorio actual
hbs.registerPartials(__dirname + "/views/partials");


app.get("/", (request, response) => {
  response.render("home", {
    nombre: "richard nicanor",
    saludos: "hola cristina",
  });
});

app.get("/elements", (request, response) => {
  response.render("elements");
});


app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`);
});
