# Node Web Server

Colección didáctica de servidores alternativos con Node.js y Express. Cada variante se ejecuta por separado.

## Requisitos

- Node.js 22 o posterior
- npm

Instala las dependencias con:

```sh
npm install
```

## Variantes

| Comando | Servidor | Puerto predeterminado |
| --- | --- | --- |
| `npm start` o `npm run start:react` | Express sirve la compilación estática de React | `8080` |
| `npm run start:http` | HTTP nativo, devuelve JSON | `8080` |
| `npm run start:hbs` | Express con Handlebars | `8080` |
| `npm run start:static` | Express sirve las páginas HTML estáticas | `8080` |
| `npm run start:app` | Ejemplo alternativo de Express con Handlebars | `8082` |

Todos los servidores leen `PORT` del entorno o de un archivo `.env`. Como comparten el puerto predeterminado, ejecuta una variante a la vez, o asigna puertos distintos.

El proyecto incluye el build de React, pero no el código fuente ni un comando para reconstruirlo.

## Pruebas

```sh
npm test
```

Las pruebas usan `node:test`, asignan puertos disponibles y arrancan los servidores desde un directorio ajeno al proyecto para comprobar rutas, respuestas HTTP y recursos.

## Referencias

- [Handlebars](https://handlebarsjs.com/)
- [hbs](https://github.com/pillarjs/hbs)
