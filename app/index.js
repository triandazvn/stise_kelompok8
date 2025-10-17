// Minimal Express + MySQL2 (hardcoded config, one endpoint)

const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const port = 3000;

// ==== HARD-CODED SETTINGS ====
const DB_HOST = "103.16.116.159";
const DB_PORT = 3306;
const DB_USER = "devops";
const DB_PASSWORD = "ubaya";
const DB_NAME = "movie";   
const PORT = 8000;         
// =============================

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

app.get("/movies", async (_req, res) => {
  const sql = `SELECT * FROM movies limit 50;`;
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows] = await conn.query(sql);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: String(err) });
  } finally {
    if (conn) conn.release();
  }
});

app.listen(PORT, () => {
  console.log(`Movies API (Node) running on http://0.0.0.0:${PORT}`);
});

// Endpoint baru untuk menampilkan URL poster film
app.get('/movies/poster', (req, res) => {
  const movies = [
    { id: 1, title: 'Inception', posterUrl: 'https://image.tmdb.org/t/p/original/inception.jpg' },
    { id: 2, title: 'Interstellar', posterUrl: 'https://image.tmdb.org/t/p/original/interstellar.jpg' },
    { id: 3, title: 'The Dark Knight', posterUrl: 'https://image.tmdb.org/t/p/original/darkknight.jpg' }
  ];
  res.json(movies);
});