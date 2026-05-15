import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const connectionString =
  process.env.MYSQL_PUBLIC_URL;

const db = await mysql.createConnection(
  connectionString
);

console.log("MySQL Connected");

export default db;
