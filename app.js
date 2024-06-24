// ! este archivo solo es de prueba si necesitas renderizar algo usa los server-
const express = require("express");
const app = express();

require("dotenv").config();
// require("./hbs/helpers");

const port = process.env.PORT || 8082;

app.set("view engine", "hbs");
// hbs.registerPartials(__dirname + "/views/parciales");

app.use(express.static(__dirname + "/public-handlebars"));

// ============================
// rutas
// ============================
app.get("/", (req, res) => {
  res.render("home", {
    nombre: "Richard",
    titulo: "Curso node",
  });
});

app.listen(port, () => {
  console.log(`Escuchando peticiones en el puerto ${port}`);
});
