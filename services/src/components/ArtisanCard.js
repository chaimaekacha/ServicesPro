import { useNavigate } from 'react-router-dom';
import RatingStars from '../common/RatingStars';

export const ArtisanCard = ({ artisan }) => {
  const navigate = useNavigate();

  return (
    <div className="artisan-card">
      <img src={artisan.image} alt={artisan.name} />
      <div className="card-content">
        <span className="category">{artisan.service.toUpperCase()}</span>
        <h3>{artisan.name}</h3>
        <p>{artisan.city} • {artisan.district}</p>
        <RatingStars rating={artisan.rating} />
        <button onClick={() => navigate(`/profil/${artisan.id}`)}>
          Voir profil
        </button>
      </div>
    </div>
  );
};