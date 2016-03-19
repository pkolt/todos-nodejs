#!/usr/bin/env bash

NODE_ENV=production
export NODE_ENV

PATH=/sbin:/usr/sbin:/bin:/usr/bin

# Каталог где лежит package.json
BASE=/home/user/projects/todos-nodejs

# Если каталога нет, то выходим ничего не делаем.
[ -d "$BASE" ] || exit 0

# Переходим в каталог где лежит package.json
cd $BASE

# Запускаем start|stop|restart через npm.
npm $1
