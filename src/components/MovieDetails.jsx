import React, { useEffect, useRef } from 'react';
export default function MovieDetails({ movie, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    const previousFocus = document.activeElement;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);
  return <dialog ref={ref} className="movie-dialog" onCancel={onClose}
    onClick={e => { if (e.target === ref.current) onClose(); }}>
    <button className="close-button" onClick={onClose} autoFocus>Close</button>
    <h2>{movie.title}</h2>
    <h3>Overview</h3>
    <p className="overview">{movie.overview}</p>
  </dialog>;
}
