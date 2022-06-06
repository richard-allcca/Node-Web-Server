const http = require("http");

// puedes crear el http.createServer().listen() sin asignarlo a una variable
const proxy = http.createServer((req, res) => {
  // ============================
  // primer ejemplo
  // ============================

  // res.writeHead(200, { "Content-Type": "application/json" });

  let salida = {
    nombre: "richard",
    edad: 34,
    url: req.url,
  };
  //  res.write(JSON.stringify('hola'))
  // res.write(JSON.stringify(salida));

  // ============================
  // segundo ejemplo
  // ============================

  // attachment es para que el navegador lo descargue
  res.setHeader("Content-Disposition", 'attachment; filename="lista.csv"');
  res.writeHead(200, { "Content-Type": "application/csv" });

  res.write("id, nombre\n");
  res.write("1, Fernando\n");
  res.write("2, Maria\n");
  res.write("3, Juan\n");
  res.write("4, pedro\n");

  res.end();
});

proxy.listen(8080);

console.log("escuchando el puerto 8080");

// req - es toda la informacion de la peticion url, headers, etc
// res - es lo que el servidor le responde al cliente
// res.end() - termina el proceso de la peticion
