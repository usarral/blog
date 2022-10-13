---
title: "Proceso de Carga de una Página Web"
date: 2022-10-13
topic: servidor
toc: true
tags:
    - servidor
    - servidor
draft: true
---

Cuando nosotros queremos ver una página web, nosotros lo que hacemos es poner la dirección de esta en nuestro navegador, esperamos un par de segundos y esta como por arte de magia carga, pero... ¿Sabes realmente que es lo que hace de fondo el navegador?

## Terminos a conocer

### Las IPs, las matriculas de internet

Por si no lo sabías, los ordenadores internamente no funcionan con nombres de dominio (conocidos generalmente de forma incorrecta como URLs) sino que usan varios típos de identificadores, uno de ellos son las IPs.

Una IP se utiliza para conectar con un equipo en red, y de esta forma poder obtener recursos en el y/o enviarselos.

Las IPs en los sistemas domésticos las suele asignar el router, mediante un servidor interno conocido como DHCP. 

Este lo que hace es cuando tu te conectas a la red, ya sea por wifi o por cable elige un numero dentro del rango que le tenemos asignado que no este usando ningun equipo más en la red. En un sistema casero suele ser una ip dentro del rango generalmente 192.168.1.[0-255]

### El servidor DNS, el diccionario de las webs

Como he explicado anteriormente intenet funciona por IPs, por lo tanto 