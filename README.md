# Blog | Usarral

Blog realizado en la asignatura Desarrollo Web en Entorno Servidor.
**Índice** :scroll:  

1. Despliegue
2. TODO

## Despliegue

El blog esta desplegado en Vercel mediante una Github Action la cual cuando se hace un push realiza un despliegue a la url ["usarral.com"](https://usarral.com)

Para la indexación de articulos hay que ejecutar, teniendo NodeJS instalado, el siguiente comando en la carpeta raiz del proyecto

````sh
npm run build
````

El cual carga las API KEYs desde variables de entorno. Genera una versión minificada de Hugo y ejecuta index-articles el cual manda el RSS formato a Algolia para la indexación del buscador

## TODO

* Add algolia for different lang
* OG images
* 
