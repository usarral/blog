---
title: "Installation du CMS Hugo et création du site de base avec template"
date: 2022-09-28
topic: terminal
toc: true
tags:
    - terminal
    - servidor
draft: false
---
## Installation Hugo

Dans ce tutoriel, nous allons installer Hugo, un CMS qui gagne progressivement en popularité en raison de sa rapidité et de sa fluidité lors de la rédaction d'articles.

Nous allons l'installer dans sa version *extended*, car elle inclut le package de base Hugo et quelques fonctionnalités supplémentaires dont certains thèmes peuvent avoir besoin.

### Installer Hugo sous Linux

#### Vérifiez si Snap est installé

Pour installer Hugo sur Linux, nous allons utiliser le gestionnaire de packages Snap. Pour cette raison, la première chose que nous allons faire est de vérifier si nous avons installé ce gestionnaire, pour cela nous utiliserons la commande suivante :

```sh
snap version

```

Cela devrait nous donner une réponse comme celle-ci :

```sh
snap    2.55.3+22.04
snapd   2.55.3+22.04
series  16
ubuntu  22.04
kernel  5.15.0-48-generic

```

Dans ce cas, cela signifie que Snap est installé. Ensuite, nous pouvons commencer l'installation.

#### Instalar el paquete hugo-extended

En utilisant le gestionnaire Snap, nous allons installer le package *hugo-extended*.

```sh
snap install hugo --channel=extended

```

### Installer Hugo sous Windows

Pour installer la dernière version de Hugo sur Windows, la première chose que nous devons faire est d'aller à ce qui suit[link](https://github.com/gohugoio/hugo/releases).

Une fois ici, nous téléchargerons la dernière version qui porte le nom du format *hugo_extended_x.x.x_windows-amd64.zip* où x.x.x correspondra à la version.

Ce zip contiendra le CMS, mais l'installation devra se faire manuellement.

Nous allons extraire le zip et pour plus de facilité nous déplacerons le fichier Hugo.exe résultant vers le chemin *C:\Hugo\bin* que nous allons créer.

Une fois que nous l'avons, dans le moteur de recherche Windows, nous accéderons *Modifier les variables d'environnement système* chercher ça dedans.

Une fenêtre appelée Propriétés système s'ouvrira et dans celle-ci, nous cliquerons sur *Variables d'environnement*.

Dans la liste qui nous montrera nous chercherons la variable PATH, et à la fin nous ajouterons 'C:\Hugo\bin'.

Avec ce redémarrage du système, nous aurons hugo installé et accessible dans notre système.

### Installer Hugo sur MacOS

Si nous ne l'avons pas déjà installé, nous installerons le gestionnaire de paquets brew avec la commande suivante

```sh
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Une fois installé, nous utiliserons cette commande pour installer Hugo.

````sh
brew install hugo

````

## Création de site avec Hugo

### Création du site

Suite au tutoriel précédent, Hugo devrait déjà être installé sur notre système.

Maintenant pour créer un site avec le CMS nous allons utiliser les commandes :

```sh
# ATTENTION CES COMMANDES DOIVENT ÊTRE EFFECTUÉES DEPUIS NOTRE UTILISATEUR HABITUEL, JAMAIS DEPUIS SUDO
hugo new site nombredelsitio
cd nombredelsitio
```

Notre site est déjà créé, mais pour le moment il n'est pas fonctionnel. Pour que cela fonctionne, nous devons d'abord trouver un thème à utiliser.

### Installer un thème sur le site

Comme exemple, je vais utiliser le thème [PaperMod](https://github.com/adityatelange/hugo-PaperMod), mais il y en a beaucoup sur Internet que nous pouvons utiliser. Pour installer le thème ce que nous allons faire dans ce cas (chaque thème peut avoir sa propre méthode d'installation, mais la plupart sont ainsi)

```sh
echo "theme = 'hugo-PaperMod'" >> config.toml
cd themes
#Clonez ou téléchargez dans ce dossier le thème qui nous plaît.
git clone https://github.com/adityatelange/hugo-PaperMod
# Nous entrons dans le dossier de notre thème
cd hugo-PaperMod
# Nous supprimons le dossier .git de ce thème afin qu'il ne nous cause pas de problèmes
#lors du téléchargement de notre page
rm -rf .git

 
```

Avec cela, nous aurons le thème installé et nous pourrons démarrer notre site en utilisant

```sh
hugo-server
```

Après l'avoir démarré, la commande renverra une URL dans laquelle nous pourrons voir notre site pendant que ce serveur est activé.

### Création d'articles dans Hugo

Pour créer des articles dans Hugo, nous devons aller dans le dossier de contenu, et à l'intérieur du dossier de publication, nous pouvons commencer à les écrire au format *MarkDown* ou *MD* pour faire court.

Au moment où nous écrivons ceci, il sera ajouté au site et visible sur notre serveur local.

### Téléchargez notre site sur Internet et publiez-le gratuitement

Pour télécharger notre site, nous allons utiliser Github comme hébergement, une plate-forme de code qui nous permet de télécharger des fichiers statiques.

Nous aurons besoin d'un compte [Github](https://github.com) et du programme [GIT](https://git-scm.com/downloads).

Étapes pour télécharger notre page sur github en utilisant le protocole GIT.

```sh
# Ces commandes sont exécutées à partir de la racine ou du dossier de base de notre site.
# Nous allons d'abord initialiser un dépôt.
git init
# Nous ajouterons nos fichiers à la Staging Area
git add *
# =============
# AVIS : Ces commandes séparées (git config) ne doivent être
#run la première fois que nous configurons git.
git config user.name "TU NOMBRE"
git config user.email "TU EMAIL"
#=======
# Nous ajouterons le "SUBJECT" du téléchargement.
git commit -m "primer commit"
#Nous allons aller sur notre compte github et créer un référentiel.
# Nous allons configurer le dépôt distant de destination,
#Cette URL nous sera fournie par github lors de la création du référentiel.
git remote add origin urldegithub
git branch -M main
# Enfin, nous enverrons les modifications au serveur.
git push -u origin main
```

Nous avons déjà téléchargé notre code sur Github, maintenant démarrons-le.

### Déploiement à Vercel

Nous allons d'abord créer un compte dans [Vercel](https://vercel.com), pour cela nous pouvons utiliser notre compte Github.

Une fois dans notre compte Vercel, nous créerons un nouveau projet.
A l'origine du projet nous lui dirons que nous voulons l'importer depuis Github.

Cela détectera automatiquement que nous utilisons Hugo et configurera tout pour nous.

Il y a des moments où le déploiement échoue à cause de la version par défaut de Hugo, si cela nous donne une erreur ce que nous devons faire est dans la section Variables d'environnement nous définissons une variable HUGO_VERSION avec la version que nous utilisons localement. Pour connaître cette version nous utilisons dans notre machine la commande

```sh
hugo version
```

Et avec cela, nous appuyons sur déployer en quelques secondes, notre page sera affichée et nous donnera une URL qui sera notre adresse Web publique.

Pour mettre à jour le site simplement en mettant à jour les fichiers sur Github et en quelques minutes Vercel détectera automatiquement les changements et affichera les changements.
