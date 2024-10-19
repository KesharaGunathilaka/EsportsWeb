import PropTypes from 'prop-types'; // Import PropTypes
import './GameC.css';

const GameC = ({ game, onClick }) => {
  return (
    <div>
      <div className="game-item text-white" onClick={onClick}>
        <img src={game.imageURL} alt={game.name} /> {/* Updated alt for better accessibility */}
        <div className="game-details mt-4">
          <h3 className="text-2xl font-title">{game.name}</h3>
          <div className='mt-10'>GENRES: {game.genres}</div>
          <div>{game.companies ? `Companies: ${game.companies}` : null}</div>
          <div>{game.releasedate ? `Release Date: ${new Date(game.releasedate).toISOString().split('T')[0]}` : null}</div>
        </div>
      </div>
    </div>
  );
};

// Define prop types
GameC.propTypes = {
  game: PropTypes.shape({
    imageURL: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    genres: PropTypes.string.isRequired,
    companies: PropTypes.string,
    releasedate: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GameC;
