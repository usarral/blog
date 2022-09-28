---
title: "Instalación de Hugo CMS"
date: 2022-09-28
topic: javascript
toc: true
tags:
    - terminal
draft: true
---
## Instalación Hugo en Linux

Para instalar Hugo en Linux lo primero que vamos a hacer es comprobar si tenemos snap, para ello utilizaremos el siguiente comando:

```sh
snap version

```


## Instalación Hugo en Windows

hugo new site nombredelsitio

cd nombredelsitio
cd themes
clonamos el tema que nos guste
cd nombredeltemaclonado
rm -rf .git
// creamos el repositorio en github para nuestra pagina
//volvemos a la raiz de nuestra pagina

git init
git add *
git commit -m "primer commit"
git remote add origin urldegithub
git branch -M main
git push -u origin main

// vamos a vercel y creamos un nuevo proyecto
// en el apartado de github seleccionamos el repositorio que acabamos de crear
// en el apartado de Environment Variables creamos una variable de entorno llamada HUGO_VERSION y le ponemos el valor 0.104.1 o la version que estemos usando en local y tengamos comprobado que funciona
// Deploy