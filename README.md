# Todos на NodeJS

Простое приложение со списком дел с использованием связки React+Redux+MongoDB+Express

## Конфигурация Nginx

## Автозапуск приложения при старте системы

Создаем скрипт для запуска приложения:

```bash
cp example.todos-nodejs.sh todos-nodejs.sh
```

В файле `todos-nodejs.sh` указываем путь к папке проекта.

```bash
# Каталог где лежит package.json
BASE=/home/user/projects/todos-nodejs
```

Делаем символическую ссылку на файл в `init.d`:

```bash
sudo ln -s /home/user/projects/todos-nodejs/todos-nodejs.sh /etc/init.d/todos-nodejs
```

Добавляем скрипт в автозапуск:

```bash
sudo update-rc.d todos-nodejs start 99 2 3 5 . stop 01 0 6 .
```

- 99 - число обозначающее насколько позже остальных должен запускаться скрипт при запуске системы;
- 2 - многопользовательский режим, но без сети;
- 3 - многопользовательский режим с поддержкой сети;
- 5 - тоже что и 3, но с загрузкой графического интерфейса;
- 01 - число обозначающее насколько раньше остальных должен запускаться скрипт при остановке системы;
- 0 - остановка системы;
- 6 - перезапуск системы;

Для удаления скрипта из автозапуска:

```bash
sudo update-rc.d -f todos-nodejs remove
```

Управление приложением из консоли:

```bash
# Запуск службы
sudo service todos-nodejs start

# Остановка службы
sudo service todos-nodejs stop

# Перезапуск службы
sudo service todos-nodejs restart
```
