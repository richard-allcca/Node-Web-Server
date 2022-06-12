const express = require("express");

const app = express();

// ============================
// inyeccion de html contenido static
// ============================
app.use(express.static("public-express-static"));


// ============================
// Manejo de rutas ejemplo
// ============================
// si usamos app.use() no necesita esta ruta por defecto busca index
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
  res.sendFile(__dirname + "/public/404.html");
});


const newLocal = 8080;

app.listen(newLocal, () => console.log(`Servidor en Puerto ${newLocal}`));
