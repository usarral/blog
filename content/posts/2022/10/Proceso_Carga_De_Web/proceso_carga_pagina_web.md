---
title: "Proceso de Carga de una Página Web"
date: 2022-10-13
topic: servidor
toc: true
tags:
    - servidor
    - servidor
draft: false
---

Cuando nosotros queremos ver una página web, nosotros lo que hacemos es poner la dirección de esta en nuestro navegador, esperamos un par de segundos y esta como por arte de magia carga, pero... ¿Sabes realmente que es lo que hace de fondo el navegador?

## Terminos a conocer

### Las IPs, las matriculas de internet

Por si no lo sabías, los ordenadores internamente no funcionan con nombres de dominio (conocidos generalmente de forma incorrecta como URLs) sino que usan varios típos de identificadores, uno de ellos son las IPs.

Una IP se utiliza para conectar con un equipo en red, y de esta forma poder obtener recursos en el y/o enviarselos.

Las IPs en los sistemas domésticos las suele asignar el router, mediante un servidor interno conocido como DHCP.

Este lo que hace es cuando tu te conectas a la red, ya sea por wifi o por cable elige un numero dentro del rango que le tenemos asignado que no este usando ningun equipo más en la red. En un sistema casero suele ser una ip dentro del rango generalmente 192.168.1.[0-255]

### El servidor DNS, el diccionario de las webs

Como he explicado anteriormente intenet funciona por IPs, por lo tanto es necesario de alguna forma "convertir" una URL como google.es en una ip como
142.250.185.3

## El proceso de carga

1. PC CLIENTE introduce la URI del servidor que quiere visitar
2. PC CLIENTE manda solicitud al NAT del ROUTER CLIENTE
3. ROUTER CLIENTE hace NAT y realiza una solicitud al SERVIDOR DNS que esta configurado
4. SERVIDOR DNS busca en los registros y si no lo encuentra en sus registros, escala la solicitud a servidores DNS primarios hasta encontrarlo
5. El SERVIDOR DNS se encarga de devolver el registro al ROUTER CLIENTE (Este registro ha podido ser encontrado en el mismo servidor o puede ser el que le han devuelto los otros servidores DNS).
6. Se devuelve el registro al ROUTER CLIENTE.
7. El ROUTER CLIENTE realiza el NAT y se lo devuelve al PC CLIENTE.
8. El PC CLIENTE realiza la solicitud a la IP, que le ha devuelto el Servidor DNS, correspondiente al servidor del recurso solicitado.
9. Se vuelve a mandar la solicitud al ROUTER CLIENTE que vuelve a hacer NAT.
10. El ROUTER CLIENTE realiza la solicitud al SERVIDOR WEB.
11. El SERVIDOR atiende a la solicitud mediante el siguiente orden de prioridad:

    ```mermaid
    flowchart LR;
        A[Protocolo]
        B[Dominio]
        C[Puerto]
        D[Ruta]
        E[Parámetros]
        A --> B
        B --> C
        C --> D
        D --> E
    ```

12. En caso de carga de pagina web por ejemplo al ver el protocolo http/https se mandará la petición al servicio apache2/nginx instalados en SERVIDOR, que son los que procesarán el resto de la petición.
13. El servidor devuelve el recurso solicitado al ROUTER CLIENTE
14. El ROUTER CLIENTE vuelve a realizar NAT
15. El ROUTER CLIENTE devuelve la petición al PC CLIENTE
