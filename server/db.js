import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: "hypnotie",
  database: "postgres",
  password: "123",
  host: "postgres",
  port: 5432,
});

export default pool;
