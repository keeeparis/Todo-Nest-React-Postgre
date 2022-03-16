module.exports = {
   development: {
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'todoapp',
   },
   test: {
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'todoapp',
   },
   production: {
      dialect: 'postgres',
      host: 'postgres_db',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'todoapp',
   },
}