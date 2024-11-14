// const connection = require("../mysqlconnection");
// const conn = connection.connectToDB();
// const bcrypt = require("bcrypt");
// const saltRounds = 10;

// const dbPool = require("../mysql2");
// const mysqlConn = dbPool.db;
// const mysql = require("mysql2/promise");

// const register = async (req, res) => {
//   const connection2 = await mysql.createConnection({
//     // host: "localhost",
//     // user: "root",
//     // password: "",
//     // database: "yunxi",

//     host: "https://yunximysql.fly.dev",
//     port: 3306,
//     user: "root",
//     password: "root",
//     database: "yunxi",
//   });
//   try {
//     const query = `SELECT email FROM adminusers WHERE email = ?`;
//     const params = [req.body.email];

//     connection2.execute(query, params).then((results) => {
//       if (results[0].length > 0) {
//         console.log(results[0].length, results[0]);
//         res.send({
//           status: 403,
//           message: "user already exist!",
//         });
//       } else {
//         console.log("*****results", results, results[0].length);

//         bcrypt.genSalt(saltRounds, function (err, salt) {
//           bcrypt.hash(req.body.password, salt, function (err, hash) {
//             const insertQuery = `INSERT INTO adminusers VALUES(?,?, ?, ?)`;
//             const insertParams = ["", req.body.email, hash, ""];
//             connection2.execute(insertQuery, insertParams);
//           });
//         });

//         res.send({
//           status: 200,
//           message: "account created successfully",
//         });
//       }
//     });

//     // conn.query(query, params, (err, results, field) => {
//     //   if (err) {
//     //     res.send({
//     //       status: 203,
//     //       message: "db error!",
//     //     });
//     //   } else {
//     //     console.log("*****results", results, results.length);
//     //     if (results.length <= 0) {
//     //       bcrypt.genSalt(saltRounds, function (err, salt) {
//     //         bcrypt.hash(req.body.password, salt, function (err, hash) {
//     //           const insertQuery = `INSERT INTO adminusers VALUES(?,?, ?, ?)`;
//     //           const insertParams = ["", req.body.email, hash, ""];
//     //           conn.query(insertQuery, insertParams);
//     //         });
//     //       });

//     //       res.send({
//     //         status: 200,
//     //         message: "account created successfully",
//     //       });
//     //     } else {
//     //       res.send({
//     //         status: 403,
//     //         message: "user already exist!",
//     //       });
//     //     }
//     //   }
//     // });
//   } catch (error) {
//     res.send({
//       status: 500,
//       message: "server error!",
//       extra: error.message,
//     });
//   }
// };

// const login = (req, res) => {
//   console.log(req.body.email);
//   console.log(req.body.password);
//   try {
//     const selectQuery = `SELECT password FROM adminusers WHERE email=?`;
//     const selectParams = [req.body.email];
//     conn.query(selectQuery, selectParams, (err, results, fields) => {
//       //   console.log(results[0].password);
//       if (err) {
//         res.send({
//           status: 500,
//           message: "db error!",
//         });
//       } else {
//         try {
//           bcrypt.compare(
//             req.body.password,
//             results[0].password,
//             function (err, result) {
//               if (result) {
//                 res.send({
//                   status: 200,
//                   message: "password is correct",
//                 });
//               } else {
//                 res.send({
//                   status: 401,
//                   message: "password incorrect",
//                 });
//               }
//             }
//           );
//         } catch (error) {
//           console.log(error);
//           res.send({
//             status: 403,
//             message: "user does not exist",
//           });
//         }
//       }
//     });
//   } catch (error) {
//     res.send({
//       status: 500,
//       message: "server error!",
//     });
//   }
// };

// module.exports = {
//   register,
//   login,
// };
