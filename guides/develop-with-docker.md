# Develop with docker

First you need to install docker. The easiest method is to just install [Docker Desktop](https://www.docker.com/products/docker-desktop). The select one of the options below
(via VSCode or via the shell).


## VSCode: Develop with docker via VSCode
If you just have the ``Remote - Containers`` extension (made by the vsode team), you should be asked if you want to open the project in the remote container when you open the project. If you are not asked, you
can use the ``Remote - Containers`` at the bottom left of the vscode window,
or one of the following commands in the commapdn palette:

- ``Remote-Container: Open folder in Container``
- ``Remote-Container: Rebuild and Reopen in Container``
- ``Remote-Container: Reopen in Container``

Since we have a ready-to-use configuration in ``.devcontainer/``, this should *just work*. Check out https://code.visualstudio.com/docs/remote/containers-tutorial for more details.


### VSCode: Build css/javascript
Start up a terminal via VSCode. This starts a terminal in the docker container. Run:
```
$ yarn run watch
```

### VSCode: Install javascript packages
You should not need to do this unless you have updated package.json since this is done when the docker container launches (configured in ``postCreateCommand`` in ``.devcontainer/devcontainer.json``).
Start up a terminal via VSCode. This starts a terminal in the docker container. Run:
```
$ yarn
```

### VSCode: Rebuild the docker image
Run the ``Remote-Container: Rebuild and Reopen in Container`` command palette command.


### VSCode: Connect to the docker container via terminal
You may want to open the shell in your docker container via the "normal" terminal instead of via VSCode. You can do that with:

```
$ docker ps
... find the name of the container (last column) ...
$ docker exec -it <container-name or ID> bash -c "sudo -u codemonkey -s"
... drops you into /, so do "cd /workspaces/ievv_jsbase/" to get to the repo root ...
```

---


## CLI: Develop with docker via the shell
We have a Dockerfile with all you need for ievv_jsbase in ``.devcontainers/Dockerfile``.

### CLI: Build the docker image with:

```
$ docker build -t ievv_jsbase_dev .devcontainer/
```

### CLI: Run the built image

```
$ docker run -t -i --mount type=bind,src=$(pwd),dst=/workspaces/ievv_jsbase,consistency=cached --mount source=ievv_jsbase_dockerdev_persistent,destination=/home/codemonkey/persistent/ -w "/workspaces/ievv_jsbase" -p 6060 -u codemonkey --name ievv_jsbase ievv_jsbase_dev bash
```

This starts the bash shell in the container. Run the following command to install the required packages:

```
$ yarn
```

**NOTE:** This shell is the process keeping the docker container running, so do not exit the bash shell.


### CLI: Build css/javascript
Run the following command to start a shell in the docker container:
```
$ docker exec -it ievv_jsbase bash
```
The you can build and other stuff you normally do from the shell. E.g.:

```
$ yarn run build
```


### CLI: Rebuild the docker image
Just repeast the command used to build the docker image above.


### CLI: Mount an extra folder
Just add more ``--mount`` statements the ``docker run`` command in the *CLI: Run the built image* section above. To mount your home folder, add
```
--mount type=bind,src=$HOME,dst=/host_userhome/,consistency=cached
```
and that makes your HOME directory available as ``/host_userhome/`` within the docker container.


---

## When to rebuild the docker image?
You need to rebuild it each time you pull changes to ``.devcontainers/Dockerfile``. If you are using the VSCode integration/extension, you also have to rebuild when ``.devcontainers/devcontainer.json`` changes. How to rebuild is explained in each of the sections above.

NOTE: The VSCode plugin will often just detect this and ask you to rebuild.


## Choices made for the docker setup
The docker setup is optimized for development. It tries to avoid having to rebuild the docker image all the time, but that comes at the cost of having to re-install all python, javascript and CSS stuff each time you "kill" the docker image. On the other hand it makes the setup fairly bulletproof since it is fairly hard to screw up and not install the correct stuff (it works or not, and is hard to get into partly working states).