const mariadb = require('mariadb')
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node-mariadb-app',
  password: 'mariaDB'
})

module.exports = pool
