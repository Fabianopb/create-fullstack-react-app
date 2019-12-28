## Backend instructions

This backend uses PostgreSQL, make sure you have it installed in your system.

Change `username`, `password`, and `database` in `server/db/config.js` according to your own PostgreSQL configurations.

start the server (might change depeding on your configurations):

```
pg_ctl -D /usr/local/var/postgres start
```

Create the database:

```
npx sequelize db:create
```

Migrate database:

```
npx sequelize-cli db:migrate
```

Seed database with sample data if you want:

```
npx sequelize-cli db:seed:all
```

When needed, you can stop the server using (might change depeding on your configurations):

```
pg_ctl -D /usr/local/var/postgres stop
```
