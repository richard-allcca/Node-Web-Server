const express = require("express");
const app = express();
const hbs = require("hbs");

const port = 8080;

// Configura express para que use hbs pueda renderizar las páginas
app.set("view engine", "hbs");
// __dirname, variable global que contiene el path del directorio actual
hbs.registerPartials(__dirname + "/views/partials", function (err) {
  console.log(err)
});

// Inyección de html contenido static
app.use(express.static("public-express-hbs"));

/**
 * Ruta para la página principal
 * @param {string} path - ruta de la página
 * @param {Object} envía un objeto con los datos de la página
 */
app.get("/", (req, res) => {
  res.render("home", {
    title: "Richard Allcca",
    message: "Server Express HBS"
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/generic", (req, res) => {
  res.render("generics");
});

app.get("/elements", (req, res) => {
  res.render("elements");
});

app.get("*", (req, res) => {
  res.render("404");
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
