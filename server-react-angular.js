const express = require("express");
const path = require("path");
const app = express();

// config variables de entorno
require("dotenv").config();
const port = process.env.PORT || 8080;

/**
 * Este server es para el frontend react & angular
 * El server de node es para el backend
 ** Esta configurado para ejecutarse con el script de npm start
 */

// archivos estaticos
app.use(express.static(path.join(__dirname, "public-react-angular")));



app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`);
});
