const mysql = require("mysql");
const dns = require("dns");

const connectToDB = () => {
  try {
    var connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "yunxi",
    });
    console.log("connected");
    connection.connect();
    return connection;
  } catch (error) {
    console.log(error);
    const msg = {
      status: 500,
      message: "failed to connect to server",
    };

    return msg;
  }
};

// const connectToDB = () => {
//   dns.lookup("", (err, address) => {
//     if (err) {
//       console.log("*****error", err);
//     } else {
//       console.log("*****address", address);
//       try {
//         var connection = mysql.createConnection({
//           host: "sdb-75.hosting.stackcp.net",
//           user: "yunxidb-35303731bee0",
//           password: "root2025",
//           database: "yunxidb-35303731bee0",
//         });
//         console.log("db connected");
//         connection.connect();
//         return connection;
//       } catch (error) {
//         console.log("in catch", error);
//         const msg = {
//           status: 500,
//           message: "failed to connect to server",
//         };

//         return msg;
//       }
//     }
//   });
// };

module.exports = {
  connectToDB,
};
