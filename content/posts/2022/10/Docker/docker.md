---
title: "Instalación de Docker"
date: 2022-10-07
topic: docker
toc: true
tags:
    - docker
    - servidor
draft: false
---
## Instalación de Docker

### Distros Linux con gestor de paquetes APT

Para instalar Docker en distros Linux como Ubuntu o Debian que tienen el gestor de paquetes APT podemos instalarlo con los siguientes comandos:

```sh
# Borrar las versiones anteriores:
sudo apt-get remove docker docker-engine docker.io containerd runc

# Añadimos los paquetes para instalar agregar el repositorio de docker
sudo apt-get install  ca-certificates   curl   gnupg-agent  lsb-release

# Añadimos la clave GPG del repositorio de Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

#Añadimos el repositorio a nuestro fichero souces.list, que es el lugar desde donde APT hace las consultas a los repositorios para descargar los programas
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Actualizamos los repositorios para que detecte el repositorio de docker
sudo apt update

#Instalamos docker y sus dependencias
sudo apt install docker-ce docker-ce-cli containerd.io
```

Configuración para poder utilizar docker sin sudo

```sh
# Agregamos el usuario al grupo Docker
 sudo usermod -a -G docker $USER
# Para poder usarlo sin tener que reiniciar debemos usar el siguiente comando para "loguearnos" en el grupo en la sesion actual
newgrp docker
# Damos permisos al socket del demonio de Docker
sudo chmod 666 /var/run/docker.sock

# Ya debería de funcionar Docker, si siguera sin funcionarnos deberemos reiniciar el sistema
reboot now
```

### Windows

Para instalar docker en Windows

1. Vamos a la pagina de [Docker](https://docker.com).

   ![Captura de la web de Docker con el botón de descarga para Windows](https://i.imgur.com/gw33a0D.png)
2. Pulsamos en descargar para Windows
3. Una vez descargado seguimos el instalador.
4. Antes de poder ejecutar deberemos instalar tambien el Kernel WSL2 el cual podemos descargar [Aquí](https://aka.ms/wsl2kernel)

    ![Captura del enlace de descarga del Kernel WSL2 desde la pagina de Microsoft](https://i.imgur.com/ntfA7G7.png)

5. Instalaremos este paquete que nos permitirá la virtualización de Docker

## Comandos básicos Docker

```sh
# Crear contenedor docker:
docker run -ti --name web ubuntu:latest
# Crear contenedor con puerto abierto:
# El formato es PuertoLocal:PuertoContenedor
# Con esto si nos conectamos a localhost:8000 
#desde nuestro navegador nos estariamos conectando
#al puerto 80 del contenedor
docker run --name web2 -ti -p 8000:80 web:v1
# Crear contenedor con carpeta compartida
# El formato es CarpetaLocal:CarpetaEnContenedor
docker run -ti --name web -ti -p 8000:80 -v C:\\Docker\\web:/var/www/html web:v1
# Crear imagen desde contenedor:
# Si estamos en el contenedor salimos
# docker commit -m "Commit" nombrecontenedor repositorio:tag
docker commit -m "Imagen con apache" web web:v1 
#Ver imagenes en docker:
docker images
# Ver contenedores
docker ps -a

# Borrar contenedor
docker rm web
# Conectar a contenedor ya iniciado
docker exec -ti web bash


```
