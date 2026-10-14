// ! este archivo solo es de prueba si necesitas renderizar algo usa los server-
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

require("dotenv").config();
// require("./hbs/helpers");

const port = process.env.PORT || 8082;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views/partials"));

app.use(express.static(path.join(__dirname, "public-express-hbs")));

// ============================
// rutas
// ============================
app.get("/", (req, res) => {
  res.render("home", {
    title: "Curso Node",
    message: "Servidor Express HBS",
  });
});

app.listen(port, () => {
  console.log(`Escuchando peticiones en el puerto ${port}`);
});
