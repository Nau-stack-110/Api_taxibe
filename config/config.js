require("dotenv").config();
module.exports = {
    "development": {
      "username": process.env.DB_USERNAME,
      "password":  process.env.DB_PASSWORD,
      "database":  process.env.DB_DATABASE,
      "host":  process.env.DB_HOST,
      "dialect": "mysql"
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": "udgkuwo0xrrzc7nm",
      "password": "udgkuwo0xrrzc7nm",
      "database": "bc7ryr9lhasequprjfua",
      "host": "bc7ryr9lhasequprjfua-mysql.services.clever-cloud.com",
      "dialect": "mysql"
    }
}
