import '../css/MovieCard.css'
import { useMovieContext } from '../context/MovieContext';

function MovieCard({movie}){

  const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()

  const favorite = isFavorite(movie.id)
  

    function onFavoriteClick(e){
        e.preventDefault()
        if(favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

  // Truncate overview text to fit in hover overlay
  const truncateOverview = (text, maxLength = 120) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Format rating to show stars
  const formatRating = (rating) => {
    const stars = '★'.repeat(Math.floor(rating / 2)) + '☆'.repeat(5 - Math.floor(rating / 2));
    return stars;
  };

  return(
    <div className = "movie-card">
      <div className="movie-poster">
        <img src = {`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt = {movie.title}/>
        <div className = "movie-overlay">
            <button className ={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
            ♥
            </button>
            
            {/* Hover Information */}
            <div className="hover-info">
              <h4 className="hover-title">{movie.title}</h4>
              <div className="hover-rating">
                <span className="stars">{formatRating(movie.vote_average)}</span>
                <span className="rating-text">{movie.vote_average.toFixed(1)}/10</span>
              </div>
              <p className="hover-overview">{truncateOverview(movie.overview)}</p>
              <div className="hover-details">
                <span className="release-year">{movie.release_date?.split("-")[0]}</span>
                <span className="vote-count">{movie.vote_count} votes</span>
              </div>
            </div>
        </div>
      </div>
      <div className = "movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>
      </div>
    </div>
  )
}

export default MovieCard;