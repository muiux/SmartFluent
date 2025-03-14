import mysql from "mysql2";
import dbConfig from "../config/db.config";

export default mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  database: dbConfig.DB,
  connectionLimit: 10
});
