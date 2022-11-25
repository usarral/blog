---
title: "Generador de Carteles"
date: 2022-11-25
toc: false
topic: me
draft: false
tags:
    - me
    - php
---


## Introducción

Durante estos días he estado trabajando en un generador de carteles para el club GDM La Merced.

El generador de carteles es una aplicación web que accede a un correo electronico al cual llegan los partidos con sus respectivos datos, los cuales son procesados y se genera un cartel con los datos del partido.

Esta webapp nace de la necesidad de semanalmente generar los carteles de los partidos con los señalamientos de los mismos el cual es un trabajo tedioso y repetitivo.

Este proceso debia ser realizado por un miembro del club, el cual se encargaba de consultar las designaciones en los correos, cargar la plantilla del cartel en un software de edición de imagenes y rellenar los datos del partido en la plantilla.

Por ello lo que hice hace unos meses fue crear un programa en NodeJS que se encargaba de leer los datos de un archivo JSON y generar el cartel con los datos del partido. Esto resolvia la parte de la generación del cartel, pero no la parte de la obtención de los datos del partido, además de que el programa debia ser ejecutado manualmente.

Por ello, durante estas semanas que he estado aprendiendo PHP en clase, he visto la posibilidad de usar las variables de PHP para imprimir los datos del partido en la plantilla del cartel y así poder generar el cartel de forma automática.
Ademas investigando descubrí que PHP puede leer correos electronicos usando el protocolo IMAP, por lo que se me ocurrio que si podía leer los correos, podía obtener los datos del partido y pasarle los datos a la plantilla del cartel.

## Objetivos

- Generar carteles de partidos de forma automática.
- Evitar tener que instalar programas en el equipo.
- Poder ejecutar el programa desde cualquier dispositivo.

## Proceso de uso

El proceso es el siguiente:

1. El correo asignado recibe un correo con los datos del partido como se muestra en la siguiente imagen:
![Correo](/images/posts/2022/11/Generador_Carteles/email.png)
2. El correo es leido y procesado por la aplicación web, el cual recibe los datos del partido.
3. Una vez están leidos todos los correos, se muestra una lista con los partidos de esa semana que van a ser incluidos en el cartel:
![Lista](/images/posts/2022/11/Generador_Carteles/procesados.png)
4. Al pulsar el botón "Imprimir Cartel", se genera el cartel con los datos de los partidos seleccionados y se muestra en la pantalla la vista de impresión para poder imprimirlo a PDF o imprimirlo directamente:
![Vista Impresión](/images/posts/2022/11/Generador_Carteles/vista_impresion.png)

## Tecnologías

Para el desarrollo de esta aplicación se han utilizado las siguientes tecnologías:

- PHP
- HTML
- CSS
- JavaScript

### Backend

Para el desarrollo del backend se ha utilizado PHP, para leer los correos se ha utilizado la librería PHP IMAP, la cual permite leer los correos de un servidor IMAP. Una vez leidos los correos, se procesan los datos del partido y se guardan memoria. Una vez guardados los datos, se muestran en la interfaz de lista.

### Frontend

El desarrollo del frontend se ha realizado en HTML, CSS y JavaScript. La interfaz de usuario se ha desarrollado basandose en un cartel ya existente en Photoshop, aunque esta planeado hacer un rediseño proximamente. Se ha usado Javascript para lanzar la vista de impresión sin necesidad de que el usuario tenga que pulsar el botón de imprimir del navegador.

## Conclusiones

El desarrollo de esta aplicación ha sido muy interesante, ya que he podido aprender a utilizar la librería PHP IMAP para leer correos de un servidor IMAP.
Además me ha servido para aprender a hacer una migración de un proyecto originalmente realizado en NodeJS a PHP debido a que el hosting donde se aloja la aplicación no soporta NodeJS y este método es mucho más sencillo de usar para un usuario que no tiene conocimientos de programación.
