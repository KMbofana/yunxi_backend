const mysql = require("mysql2/promise");

const dbConfig = {
  //   host: "https://yunximysql.fly.dev",
  //   port: 3306,
  //   user: "root",
  //   password: "root",
  //   database: "yunxi",
  host: "localhost",
  user: "root",
  password: "",
  database: "yunxi",
};

const connFunction = async () => {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "yunxi",
    });

    return connection;
  } catch (err) {
    console.log(err);
  }
};

// const db = mysql.createPool(dbConfig);

module.exports = {
  connFunction,
};
