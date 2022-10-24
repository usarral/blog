---
title: "Docker Install and commands"
date: 2022-10-07
topic: docker
toc: true
tags:
    - docker
    - servidor
draft: false
---
## Docker installation

### Linux distros with APT package manager

To install Docker on Linux distros such as Ubuntu or Debian that have the APT package manager, we can install it with the following commands:

```sh
# Delete previous versions:
sudo apt-get remove docker docker-engine docker.io containerd runc

# We add the packages to install add the docker repository
sudo apt-get install ca-certificates curl gnupg-agent lsb-release

# Add the GPG key of the Docker repository
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

#Add the repository to our souces.list file, which is the place from where APT queries the repositories to download the programs
threw out \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# We update the repositories so that it detects the docker repository
sudo apt update

#Install docker and its dependencies
sudo apt install docker-ce docker-ce-cli containerd.io
```

Configuration to be able to use docker without sudo

```sh
# Add the user to the Docker group
 sudo usermod -a -G docker $USER
# To be able to use it without having to restart we must use the following command to "login" to the group in the current session
newgrp docker
# We give permissions to the socket of the Docker daemon
sudo chmod 666 /var/run/docker.sock

# Docker should already be working, if it still doesn't work we will have to restart the system
reboot now
```

###windows

To install docker on Windows

1. Go to the [Docker] page (https://docker.com).

   ![Docker web screenshot with download button for Windows](https://i.imgur.com/gw33a0D.png)
2. Click on download for Windows
3. Once downloaded we follow the installer.
4. Before being able to execute we must also install the WSL2 Kernel which we can download [Here](https://aka.ms/wsl2kernel)

    ![WSL2 Kernel download link screenshot from Microsoft page](https://i.imgur.com/ntfA7G7.png)

5. We will install this package that will allow us to virtualize Docker

## Basic Docker Commands

```sh
# Create docker container:
docker run -ti --name web ubuntu:latest
# Create container with open port:
# The format is LocalPort:ContainerPort
# With this if we connect to localhost:8000
#from our browser we would be connecting
#to container port 80
docker run --name web2 -ti -p 8000:80 web:v1
# Create container with shared folder
# The format is LocalFolder:FolderInContainer
docker run -ti --name web -ti -p 8000:80 -v C:\\Docker\\web:/var/www/html web:v1
# Create image from container:
# If we are in the container we exit
# docker commit -m "Commit" containername repository:tag
docker commit -m "Image with apache" web web:v1
#View images in docker:
docker images
# view containers
docker ps -a

# delete container
docker rm web
# Connect to already started container
docker exec -ti web bash


```