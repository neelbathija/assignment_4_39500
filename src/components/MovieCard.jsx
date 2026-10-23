import React from 'react';

export default function MovieCard({ movie, onSelect }) {
  return (
    <article className="card">
      <button className="movie-button" onClick={() => onSelect(movie)}>
        <div className="poster">
          {movie.poster_path ? (
            <img src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt={`${movie.title} poster`} />
          ) : (
            <div className="no-poster">No image</div>
          )}
        </div>
        <div className="card-info">
          <h3>{movie.title}</h3>
          <p>{movie.release_date?.slice(0, 4)} · ★ {movie.vote_average.toFixed(1)}</p>
        </div>
      </button>
    </article>
  );
}
