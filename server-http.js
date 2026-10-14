const http = require("http");
require("dotenv").config();

const port = process.env.PORT || 8080;

// puedes crear el http.createServer().listen() sin asignarlo a una variable
const app = http.createServer((req, res) => {
  // console.log(req.headers);// muestra los headers de la petición

  /**
   * Ejemplos de Content-Type
   * application/json
   * application/xml
   * application/x-www-form-urlencoded
   * multipart/form-data
   * text/html
   * text/css
   * text/javascript
   * text/xml
   * image/jpeg
   * image/png
   * image/gif
   * image/svg+xml
   *
   */

  //? Ejemplo application/csv, archivo delimitado por comas (necesita el setHeader)
  // res.setHeader("Content-Disposition", 'attachment; filename="lista.csv"');
  // res.writeHead(200, { "Content-Type": "application/csv" });
  //? contenido del archivo
  // res.write("id, nombre\n");
  // res.write("1, Fernando\n");
  // res.write("2, Maria\n");
  // res.write("3, Juan\n");
  // res.write("4, pedro\n");


  res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });

  let salida = {
    nombre: "richard",
    edad: 34,
    url: req.url,
  };

  res.write(JSON.stringify(salida));

  res.end();
});

app.listen(port);

console.log(`escuchando el puerto ${port}`);
