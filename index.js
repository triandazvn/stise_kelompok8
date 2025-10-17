// Endpoint untuk filter judul movie
app.get('/movies/filter', (req, res) => {
  const title = req.query.title; // contoh: /movies/filter?title=avengers

  if (!title) {
    return res.status(400).json({ message: "Parameter 'title' harus diisi." });
  }

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(title.toLowerCase())
  );

  res.json(filteredMovies);
});
