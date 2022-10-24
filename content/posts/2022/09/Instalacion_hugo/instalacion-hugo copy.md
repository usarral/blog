---
title: "Instalación de Hugo CMS y creación de sitio básico con plantilla"
date: 2022-09-28
topic: terminal
toc: true
tags:
    - terminal
    - servidor
draft: false
---
## Installation Hugo

In this tutorial we are going to install Hugo, a CMS that is gradually gaining popularity due to its speed and fluidity when writing articles.

We are going to install it in its *extended* version, since it includes the Hugo base package and some extra features that some themes may require.

### Installation Hugo on Linux

#### Check if we have Snap installed

To install Hugo on Linux we are going to use the Snap package manager. For this reason, the first thing we are going to do is check if we have this manager installed, for this we will use the following command:

```sh
snap version

```

This should give us a response like the following:

```sh
snap 2.55.3+22.04
snapd 2.55.3+22.04
series 16
ubuntu 22.04
kernel 5.15.0-48-generic

```

In that case it will mean that we have snap installed. Then we can start with the installation.

#### Install the hugo-extended package

Using the Snap manager we are going to install the *hugo-extended* package.

```sh
snap install hugo --channel=extended

```

### Installation Hugo on Windows

To install the latest version of Hugo on Windows, the first thing we must do is go to the following [link](https://github.com/gohugoio/hugo/releases).

Once here we will download the latest version that has a name of the format *hugo_extended_x.x.x_windows-amd64.zip* where x.x.x will correspond to the version.

This zip will contain the CMS, but the installation will have to be done manually.

We will extract the zip and for ease we will move the resulting Hugo.exe file to the path *C:\Hugo\bin* which we will create.

Once we have it, in the Windows search engine, we will access *Edit system environment variables* looking for this in it.

A window called System Properties will open and in this we will click on *Environment Variables*.

In the list that will show us we will look for the PATH variable, and at the end of it we will add 'C:\Hugo\bin'.

With this restarting the system we will have hugo installed and accessible in our system.

### Installation Hugo on MacOS

If we do not have it already installed, we will install the brew package manager with the following command

```sh
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Once installed, we will use this command to install Hugo.

````sh
brew install hugo

````

## Site creation with Hugo

### Creating the site

Following the previous tutorial we should already have Hugo installed on our system.

Now to create a site with the CMS we will use the commands:

```sh
# WARNING THESE COMMANDS MUST BE CARRIED OUT FROM OUR USUAL USER, NEVER FROM SUDO
hugo new site sitename
cd sitename
```

Our site is already created, but at the moment it is not functional. In order for this to work, we must first find a theme to use.

### Installing a theme on the site

 As an example I am going to use the [PaperMod](https://github.com/adityatelange/hugo-PaperMod) theme, but there are many on the internet that we can use. To install the theme what we will do in this case (each theme can have its own installation method, but most are this way)

```sh
echo "theme = 'hugo-PaperMod'" >> config.toml
cd themes
#Clone or download in this folder the theme that we like.
git clone https://github.com/adityatelange/hugo-PaperMod
# We enter the folder of our theme
cd hugo-PaperMod
# We delete the .git folder from this theme so that it does not cause us problems
#when uploading our page
rm -rf .git

 
```

With this we will have the theme installed and we can start our site using

```sh
hugo-server
```

After starting it, the command will return a URL in which we can see our site while this server is on.

### Creating articles in Hugo

To create articles in Hugo we must go to the content folder, and inside the post folder we can start writing these in *MarkDown* or *MD* format for short.

As we write this it will be added to the site and visible on our local server.

### Upload our site to the internet and publish it for free

To upload our site we are going to use Github as hosting, a code platform that allows us to upload static files.

We will need a [Github](https://github.com) account and the [GIT](https://git-scm.com/downloads) program.

Steps to upload our page to github using the GIT protocol.

```sh
# These commands are executed from the root or base folder of our site.
# First we will initialize a repository.
git start
# We will add our files to the Staging Area
git add *
# =============
# NOTICE: These separate commands (git config) should only be
#run the first time we configure git.
git config user.name "YOUR NAME"
git config user.email "YOUR EMAIL"
#=======
# We will add the "SUBJECT" of the upload.
git commit -m "first commit"
#We will go to our github account and create a repository.
# We will configure the destination remote repository,
#This url will be provided to us by github when we create the repository.
git remote add origin github url
git branch -M main
# Finally we will send the changes to the server.
git push -u origin main
```

We already have our code uploaded on Github, now let's get it off the ground.

### Deployment in Vercel

First we will create an account in [Vercel](https://vercel.com), for this we can use our Github account.

Once inside our Vercel account we will create a new project.
In the origin of the project we will tell it that we want to import it from Github.

This will automatically detect that we are using Hugo and configure everything for us.

There are times that the deployment fails due to the default version of Hugo, if it gives us an error what we must do is in the Environment Variables section we define a variable HUGO_VERSION with the version that we are using locally. To know this version we use in our machine the command

```sh
hugo version
```

And with this we press deploy in a matter of seconds our page will be displayed and will give us a URL which will be our public web address.

To update the site simply by updating the files on Github and in a matter of minutes Vercel will automatically detect the changes and display the changes.
