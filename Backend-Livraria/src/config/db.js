import mysql from "mysql2/promise";

export const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "senai",
  database: "bibliotec",
  port: 3306,
});

console.log("✅ Conectado ao banco de dados dblivraria!");