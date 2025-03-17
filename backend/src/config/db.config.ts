import "dotenv/config";
import { createConnection } from 'mysql2';

// You can add password if you want
const connection = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database');
  
  const createDbQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`;

  connection.query(createDbQuery, (err, results) => {
    if (err) {
      console.error('Error creating database:', err);
      return;
    }
    console.log('Database created or already exists');
    process.exit(0);
  });
});
