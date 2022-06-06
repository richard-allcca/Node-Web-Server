const express = require("express");
const app = express();

// ============================
// inyeccion de html contenido static
// ============================
app.use(express.static("public-road"));

// ============================
// Manejo de rutas ejemplo
// ============================
// no necesita esta ruta por defecto busca index en public-road
// app.get("/", (req, res) => {
//   res.render("home");
// });

app.get("/generic", (req, res) => {
  res.sendFile(__dirname + "/public-road/generic.html");
});

app.get("/elements", (req, res) => {
  res.sendFile(__dirname + "/public-road/elements.html");
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/template/404.html");
});

app.listen(8080, () => {
  console.log("Example app listening on port 8080!");
});
