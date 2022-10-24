---
title: "Installation de Docker et commandes de base"
date: 2022-10-07
topic: docker
toc: true
tags:
    - docker
    - servidor
draft: false
---
## Installation de Docker

### Distributions Linux avec gestionnaire de packages APT

Pour installer Docker sur des distributions Linux telles que Ubuntu ou Debian qui ont le gestionnaire de packages APT, nous pouvons l'installer avec les commandes suivantes :

```sh
# Supprimer les versions précédentes :
sudo apt-get supprimer docker docker-engine docker.io containerd runc

# Nous ajoutons les packages à installer ajouter le référentiel docker
sudo apt-get install ca-certificates curl gnupg-agent lsb-release

# Ajouter la clé GPG du dépôt Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

#Ajoutez le référentiel à notre fichier souces.list, qui est l'endroit à partir duquel APT interroge les référentiels pour télécharger les programmes
chassèrent \
  "deb [arch=$(dpkg --print-architecture) signé-par=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Nous mettons à jour les référentiels afin qu'il détecte le référentiel docker
mise à jour sudo apt

#Installer docker et ses dépendances
sudo apt installer docker-ce docker-ce-cli containerd.io
```

Configuration pour pouvoir utiliser docker sans sudo

```sh
# Ajouter l'utilisateur au groupe Docker
 sudo usermod -a -G menu fixe $USER
# Pour pouvoir l'utiliser sans avoir à redémarrer, nous devons utiliser la commande suivante pour "se connecter" au groupe dans la session en cours
menu fixe newgrp
# Nous donnons des autorisations au socket du démon Docker
sudo chmod 666 /var/run/docker.sock

# Docker devrait déjà fonctionner, si cela ne fonctionne toujours pas, nous devrons redémarrer le système
redémarrer maintenant
```

### les fenêtres

Pour installer Docker sur Windows

1. Accédez à la page [Docker] (<https://docker.com>).

   ![Capture d'écran Web Docker avec bouton de téléchargement pour Windows](https://i.imgur.com/gw33a0D.png)
2. Cliquez sur télécharger pour Windows
3. Une fois téléchargé, nous suivons le programme d'installation.
4. Avant de pouvoir exécuter, nous devons également installer le noyau WSL2 que nous pouvons télécharger [ici] (<https://aka.ms/wsl2kernel>)

    ![Capture d'écran du lien de téléchargement du noyau WSL2 depuis la page Microsoft](https://i.imgur.com/ntfA7G7.png)

5. Nous allons installer ce package qui nous permettra de virtualiser Docker

## Commandes Docker de base

```sh
# Créer un conteneur Docker :
docker run -ti --name web ubuntu:latest
# Créer un conteneur avec un port ouvert :
# Le format est LocalPort:ContainerPort
# Avec ceci si nous nous connectons à localhost:8000
#depuis notre navigateur, nous serions en train de nous connecter
#au port à conteneurs 80
docker run --name web2 -ti -p 8000:80 web:v1
# Créer un conteneur avec un dossier partagé
# Le format est LocalFolder:FolderInContainer
docker run -ti --name web -ti -p 8000:80 -v C:\\Docker\\web:/var/www/html web:v1
# Créer une image à partir du conteneur :
# Si nous sommes dans le conteneur nous sortons
# docker commit -m "Commit" nom du conteneur repository:tag
docker commit -m "Image avec apache" web web:v1
#Afficher les images dans le docker :
images de docker
# afficher les conteneurs
docker ps-a

# supprimer le conteneur
docker rm web
# Se connecter au conteneur déjà démarré
docker exec -ti web bash


```
