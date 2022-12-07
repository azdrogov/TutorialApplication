# TutorialApplication 

## Перед запуском
1. Создать конфиг в `App/src/main/resources/application.conf` в соответсвие с `application.template.conf`
2. Запустить `App/src/main/resources/init.sql`

## Бэк
Запускается из App/
`sbt run`

## Фронт
Запускается из fronted-typescript/
`npm start`

## Запуск через Docker
`docker-compose build`

`docker-compose up`

Фронт доступен на [http:\\localhost:3000](http:\\localhost:3000)

Бэк доступен на [http:\\localhost:8000](http:\\localhost:8000)

БД доступна на `sudo psql -h 0.0.0.0 -p 5001 -U postgres -W`