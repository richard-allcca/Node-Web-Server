const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

// ============================
// Inyección de html contenido static
// ============================
app.use(express.static(path.join(__dirname, "public-express-static")));


// ============================
// Manejo de rutas ejemplo
// ============================
// NOTE - si usamos app.use() no necesita este fragment, busca index por defecto
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public-express-static/index.html');
// })

app.get('/generic', (req, res) => {
  // __dirname is the directory where the server.js file is located
  // + the path to the file
  res.sendFile(__dirname + '/public-express-static/generic.html');
})

app.get('/elements', (req, res) => {
  res.sendFile(__dirname + '/public-express-static/elements.html');
})

app.get("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public/404.html"));
});

app.listen(port, () => console.log(`Servidor en Puerto ${port}`));
