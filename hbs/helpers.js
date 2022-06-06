/* no necesitas exportar estas funciones solo requerirlas directamente en tu principal */
const hbs = require("hbs");

// Helpers 1° require hbs, recibe un nombre y una funcion
hbs.registerHelper("getAnio", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("capitalizar", (texto) => {
  let palabras = texto.split(" ");
  palabras.forEach((palabra, idx) => {
    palabras[idx] =
      palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
  });
  return palabras.join(" ");
});
