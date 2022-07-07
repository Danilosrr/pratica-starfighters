import pg from "pg";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const { Pool } = pg;

const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default connection;