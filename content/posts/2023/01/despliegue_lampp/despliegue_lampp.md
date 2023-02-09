---
title: "Despliegue de una pila LAMPP en Docker"
date: 2023-01-23
topic: docker
toc: true
tags:
    - docker
    - despliegue
draft: true
---
# Despliegue de una pila LAMPP en Docker



## Descripción

Para esta tarea se pide instalar una pila LAMPP y ejecutar un fichero PHP en ella.

## ¿Qué es una pila LAMPP?

Una pila LAMP es un conjunto de programas que se instalan en un servidor para poder ejecutar aplicaciones web. Estos programas son:

- **L**inux: Sistema operativo del servidor.
- **A**pache: Servidor web.
- **M**ySQL: Sistema de gestión de bases de datos.
- **P**HP: Lenguaje de programación para el servidor.
- **P**hpMyAdmin: Herramienta para administrar bases de datos MySQL.

<div style="page-break-after: always !important;"></div>

## Instalación de la pila LAMP

En mi caso voy a hacer la instalación en un contenedor Docker. Para ello voy a usar la imagen oficial de Ubuntu 20.04.

### Preparación del contenedor

Para preparar el contenedor, lo primero que hay que hacer es crearlo:

```sh
docker run -ti --name despliegue_lampp -p 3000:80 -v ~/docker/despliegue_lampp:/var/www/html ubuntu:20.04
```

![docker run](https://i.imgur.com/qHWzUHS.png)
Una vez creado, actualizamos los repositorios de paquetes y el sistema:

```sh
apt update && apt upgrade
```

![apt update](https://i.imgur.com/yVUAvK4.png)

Una vez hecho esto, podemos empezar a instalar los paquetes necesarios para la pila LAMPP.
<div style="page-break-after: always !important;"></div>

### Instalación de Apache

Para poder ejecutar Apache en Ubuntu, lo primero que hay que hacer es instalar el paquete `apache2`:

```sh
apt install apache2
```

![apt install apache2](https://i.imgur.com/obgRtTY.png)

Mientras se instala, nos pedira configurar tzdata, que es el paquete que se encarga de la configuración de la zona horaria. En mi caso, voy a elegir la zona horaria de Madrid:

![tzdata](https://i.imgur.com/Nyvgx9n.png)

Una vez instalado, podemos comprobar que el servicio esta apagado:

```sh
service apache2 status
```

![service apache2 status](https://i.imgur.com/nOlmyul.png)

Para arrancarlo, ejecutamos el siguiente comando y comprobamos que se ha iniciado correctamente:

```sh
service apache2 start

service apache2 status
```

![service apache2 start](https://i.imgur.com/i1U57WB.png)

Con esto ya tenemos Apache instalado y funcionando. Al ser un contenedor, podemos acceder a él desde el navegador de nuestra máquina anfitriona. Para ello, tenemos que acceder a la dirección `http://localhost:3000`:

![apache2 en navegador](https://i.imgur.com/wUuLlkr.png)

<div style="page-break-after: always !important;"></div>

### Instalación de MySQL

En mi caso voy a instalar MariaDB, que es un fork de MySQL. Para instalarlo, ejecutamos el siguiente comando:

```sh
apt install mariadb-server
```

![apt install mariadb-server](https://i.imgur.com/ArA1ail.png)

Una vez instalado, podemos comprobar que el servicio esta apagado, para arrancarlo usamos el siguiente comando y comprobamos que se ha iniciado correctamente:

```sh
service mysql status
service mysql start
service mysql status
```

![service mysql start](https://i.imgur.com/kMCJkvU.png)

Con esto ya tendríamos MySQL instalado y funcionando.

Ahora vamos a utilizar el comando `mysql_secure_installation` para configurar la contraseña del usuario root y eliminar los usuarios anónimos, los usuarios de prueba y las bases de datos de prueba. Para ello, ejecutamos el siguiente comando:

```sh
mysql_secure_installation
```

<div style="page-break-after: always !important;"></div>

Nos hará una serie de preguntas, a las que tenemos que responder con `y` o `n`:

```sh
#Notas: 
# - Lo comentado con # es lo que se escribe en la terminal
# - Los comentarios que no empiezan por # son las preguntas que nos hace el comando y las respuestas que hay que darle
# - Los comentarios entre -- son anonotaciones mías

~: mysql_secure_installation 

#NOTE: RUNNING ALL PARTS OF THIS SCRIPT IS RECOMMENDED FOR ALL MariaDB
#      SERVERS IN PRODUCTION USE!  PLEASE READ EACH STEP CAREFULLY!

#In order to log into MariaDB to secure it, we'll need the current
#password for the root user.  If you've just installed MariaDB, and
#you haven't set the root password yet, the password will be blank,
#so you should just press enter here.

Enter current password for root (enter for none):
#--Como docker no tiene contraseña por defecto, le damos a enter--

# OK, successfully used password, moving on...

# Setting the root password ensures that nobody can log into the MariaDB
# root user without the proper authorisation.

Set root password? [Y/n] Y # Le decimos que si
New password: # Ponemos la contraseña que queramos (Hay que recordarla)
Re-enter new password: # Volvemos a escribirla
# Password updated successfully!
# Reloading privilege tables..
#  ... Success!


# By default, a MariaDB installation has an anonymous user, allowing anyone
# to log into MariaDB without having to have a user account created for
# them.  This is intended only for testing, and to make the installation
# go a bit smoother.  You should remove them before moving into a
# production environment.

Remove anonymous users? [Y/n] Y

# ... Success!

# Normally, root should only be allowed to connect from 'localhost'.  This
# ensures that someone cannot guess at the root password from the network.

Disallow root login remotely? [Y/n] Y
# -- Le decimos que si ya que no queremos que se pueda acceder remotamente, para acceder en remoto con phpMyAdmin crearemos un usuario de conexión --
# ... Success!

# By default, MariaDB comes with a database named 'test' that anyone can
# access.  This is also intended only for testing, and should be removed
# before moving into a production environment.

Remove test database and access to it? [Y/n] Y

#  - Dropping test database...
#  ... Success!
#  - Removing privileges on test database...
#  ... Success!

# Reloading the privilege tables will ensure that all changes made so far
# will take effect immediately.

Reload privilege tables now? [Y/n] Y
#  ... Success!

# Cleaning up...

# All done!  If you've completed all of the above steps, your MariaDB
# installation should now be secure.

# Thanks for using MariaDB!

```

Con esto ya tendríamos MySQL configurado y seguro.

<div style="page-break-after: always !important;"></div>

#### Crear usuario de conexión para phpMyAdmin

Ya que hemos deshabilitado el acceso remoto al usuario root, vamos a crear un usuario de conexión para phpMyAdmin. Para ello, ejecutamos el siguiente comando:

```sh
mysql -u root -p
# -- Nos pedirá la contraseña que hemos puesto en el paso anterior --
```

Con esto entraremos en la consola de MySQL. Ahora vamos a crear el usuario de conexión para phpMyAdmin. Para ello, ejecutamos el siguiente comando:

```sh

MariaDB [(none)]> CREATE USER 'webmanager'@'%' identified by 'password'; # En lugar de password ponemos la contraseña que queramos
Query OK, 0 rows affected (0.001 sec)

MariaDB [(none)]> GRANT ALL PRIVILEGES ON *.* TO 'webmanager'@'%';

MariaDB [(none)]> FLUSH PRIVILEGES;

MariaDB [(none)]> exit

# -- Salimos de la consola de MySQL --

# -- Comprobamos que podemos acceder con el usuario que hemos creado --

~: mysql -u webmanager -p
Enter password: # Ponemos la contraseña que hemos puesto en el paso anterior
# Welcome to the MariaDB monitor.  Commands end with ; or \g.
# Your MariaDB connection id is 75
# Server version: 10.3.37-MariaDB-0ubuntu0.20.04.1 Ubuntu 20.04

# Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

# Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

# -- Con esto ya vemos que podemos acceder con el usuario que hemos creado asi que salimos --
MariaDB [(none)]> exit
# Bye
```

<div style="page-break-after: always !important;"></div>

## Instalación de PHP

La instalación de PHP es muy sencilla, solo tenemos que ejecutar el siguiente comando:

```sh
apt install php libapache2-mod-php php-mysql
```

![apt install php](https://i.imgur.com/hmURtTb.png)

Con esto ya tendríamos PHP instalado y funcionando. Podemos comprobarlo con el siguiente comando:

```sh
php -v
```

![php -v](https://i.imgur.com/xmextmr.png)

Para poder ejecutar ficheros PHP en el apache, tenemos que reiniciar el servicio, ya que cuando este se arrancó, no teníamos PHP instalado. Para reiniciar el servicio, ejecutamos el siguiente comando:

```sh
service apache2 restart
```

![service apache2 restart](https://i.imgur.com/Rmmboj6.png)

Una vez reiniciado, podemos comprobar que podemos ejecutar ficheros PHP en el navegador. Para ello, creamos un fichero `index.php` en el directorio `/var/www/html`:

```sh
echo "<?php phpinfo(); ?>" > /var/www/html/index.php
```

Y accedemos a la dirección `http://localhost:3000`:

![echo phpinfo](https://i.imgur.com/xYMAMWv.png)
<div style="page-break-after: always !important;"></div>

## Instalación de phpMyAdmin

Para instalar phpMyAdmin, lo primero que tenemos que hacer es instalar el paquete `phpmyadmin`:

```sh
apt install phpmyadmin
```

Una vez instalado, nos pedirá que elijamos el servidor web que queremos configurar. Como estamos usando Apache, elegimos la opción `apache2`.

Cuando se termine de instalar, reiniciamos el servicio de Apache:

```sh
service apache2 restart
```

Y accedemos a la dirección `http://localhost:3000/phpmyadmin`, probamos el usuario que hemos creado anteriormente y ya podemos acceder a phpMyAdmin:

![phpmyadmin](https://i.imgur.com/HAOIzTu.png)

<div style="page-break-after: always !important;"></div>

## Instalación CRUD

### Descargando el código fuente y cargándolo en Apache

Para instalar el CRUD , lo primero que tenemos que hacer es descargar el código fuente. Para ello, ejecutamos el siguiente comando:

```sh
apt install git -y # Instalamos git para poder descargar el código fuente

cd # Nos movemos al directorio home

git clone https://github.com/usarral/PHP_CRUD.git # Descargamos el código fuente

cd PHP_CRUD # Nos movemos al directorio donde se encuentra el código fuente

rm -rf /var/www/html/* # Borramos el contenido de la carpeta de Apache para que no haya ningún conflicto

cp -r * /var/www/html # Copiamos el código fuente a la carpeta de Apache

cd /var/www/html # Nos movemos a la carpeta de Apache

chown -R www-data:www-data * # Cambiamos el propietario de los ficheros a www-data

chmod -R 755 * # Cambiamos los permisos de los ficheros a 755
```

### Configurando la base de datos

```sh
mysql -u webmanager -p 
# -- Nos pedirá la contraseña del usuario que hemos creado anteriormente --
# -- Entramos en la consola de MySQL --

MariaDB [(none)]> CREATE DATABASE dwes;
# Query OK, 1 row affected (0.001 sec)
MariaDB [(none)]> USE dwes;
# Database changed
# -- Salimos de la consola de MySQL --
MariaDB [dwes]> exit
# Bye
# -- Con esto ya tenemos la base de datos creada, ahora vamos a insertar los datos --
mysql -u webmanager -p dwes < db.sql
# -- Nos pedirá la contraseña del usuario que hemos creado anteriormente --
```

<div style="page-break-after: always !important;"></div>

Vamos a crear un nuevo usuario en MySQL para que el CRUD pueda conectarse a la base de datos. Para ello, entramos en el phpMyAdmin y creamos un nuevo usuario:
![phpmyadmin](https://i.imgur.com/OtxteCo.png)
Cuando nos pregunte por los permisos, le damos todos los permisos a la base de datos `dwes`:
![phpmyadmin](https://i.imgur.com/0WvKlYs.png)
<div style="page-break-after: always !important;"></div>

Por ultimo en la pantalla de configuración de permisos le daremos todos los permisos de datos para las tablas de la base de datos `dwes`:
![phpmyadmin](https://i.imgur.com/iSHiR4i.png)

Con eso ya tendriamos el usuario creado

### Conectando el CRUD a la base de datos

Ahora vamos a editar el fichero de configuración para que el CRUD pueda conectarse a la base de datos. Para ello, ejecutamos el siguiente comando:

```sh
mv credentials.php.example credentials.php
apt install vim -y # Instalamos nano para poder editar el fichero de configuración o sino podemos usar el editor que tengamos instalado
vim credentials.php
En el fichero, cambiamos los datos de la base de datos por los que hemos creado anteriormente:
<?php
DB_HOST = '127.0.0.1';
DB_USER = 'webapp'; # <-- Cambiamos el usuario por el que hemos creado anteriormente
DB_PASS = 'webapp'; # <-- Cambiamos la contraseña por la que hemos creado anteriormente
DB_NAME = 'dwes'; # <-- Cambiamos el nombre de la base de datos por el que hemos creado anteriormente


?>
# Guardamos el fichero y salimos
```

### Añadiendo usuarios

Por ultimo paso vamos a añadir los usuarios a la tabla usuarios para que puedan acceder, para ello vamos a volver al phpMyAdmin y vamos a la base de datos dwes, a la tabla usuarios y añadimos los usuarios que queramos:

```sh
user: # <-- Usuario que queramos
pass: # <-- Contraseña que queramos
```

![phpmyadmin](https://i.imgur.com/fV7KMz1.png)

Ahora ya podemos acceder al CRUD en la dirección `http://localhost:3000`:

![crud](https://i.imgur.com/vA2u0oV.png)
