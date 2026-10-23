import React, { useEffect, useState } from 'react';
import { isCancel } from 'axios';
import { getPopularMovies, searchMovies } from './api/tmdb.js';
import MovieCard from './components/MovieCard.jsx';
import MovieDetails from './components/MovieDetails.jsx';
export default function App() {
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError(null);
    const request = search ? searchMovies(search, page, controller.signal) : getPopularMovies(page, controller.signal);
    request.then(data => {
      if (controller.signal.aborted) return;
      setMovies(previous => page === 1 ? data.results : [...previous, ...data.results]);
      setTotalPages(data.total_pages); setLoading(false);
    }).catch(err => {
      if (isCancel(err) || controller.signal.aborted) return;
      setError("Couldn't load movies. Try again later.");
      setLoading(false);
    });
    return () => controller.abort();
  }, [search, page]);
  function changeSearch(next) {
    if (next === search && page === 1) return;
    setMovies([]); setTotalPages(0); setPage(1); setSearch(next); setError(null); setLoading(true);
  }
  return (
    <main className="app">
      <h1>Movie Explorer</h1>
      <form onSubmit={e => { e.preventDefault(); changeSearch(query.trim()); }}>
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search movies…"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && movies.length === 0 && (
        <p>{search ? `No results for ‘${search}’` : 'No movies available right now'}</p>
      )}

      <div className="grid">
        {movies.map(movie => <MovieCard key={movie.id} movie={movie} onSelect={setSelected} />)}
      </div>
      {movies.length > 0 && page < totalPages && (
        <div className="pagination">
          <button disabled={loading} onClick={() => setPage(value => value + 1)}>
            {loading ? 'Loading…' : 'Load more movies'}
          </button>
        </div>
      )}
      {selected && <MovieDetails movie={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}
