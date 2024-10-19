import { useEffect, useState } from 'react';
import HeaderC from '../Components/HeaderC/HeaderC';
import './Games.css';
import axios from "axios";
import GameC from '../Components/Games/GameC';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@nextui-org/react";
import { jwtDecode } from "jwt-decode";
import FooterC from '../Components/FooterC/FooterC';
import Spinner from './Spinner';
import Backend_URL from '../config';

const Games = () => {
  const token = localStorage.getItem("token");
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 5;
  const adminEmail = "admin@gmail.com";

  let loggedInUserEmail = null;
  if (token) {
    const decodedToken = jwtDecode(token);
    loggedInUserEmail = decodedToken.email; // Assumes email is stored in the token
  }

  const getGames = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${Backend_URL}/api/games/`);
      console.log(response.data);
      setGames(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGames();
  }, []);

  const handleGameClick = (gameId) => {
    navigate(`/gamedis/${gameId}`);
  };

  const filteredGames = games
    .filter((game) => game.name.toLowerCase().includes(searchQuery))
    .filter((game) => {
      if (selectedCategory === "") return true;
      if (!game.genres) return false;
      const genresArray = game.genres.split(',').map(genre => genre.trim().toLowerCase());
      return genresArray.includes(selectedCategory.toLowerCase());
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <HeaderC />
      <div className="games-page text-text bg-background">
        <div className='block lg:hidden mx-auto mt-4'>
          <div className='flex flex-col items-center'>
            {(loggedInUserEmail === adminEmail) && (
              <Link to="/CreateGame">
                <Button className="bg-secondary border-2 border-red-600 text-xl font-sidebar text-white button hover:bg-red-600" variant="solid">
                  Add Game
                </Button>
              </Link>
            )}
          </div>
          <div className="search-bar mt-4 text-secondary">
            <input
              type="text"
              placeholder="Search Games"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            />
          </div>
        </div>
        <aside className="hidden lg:block sidebar font-sidebar bg-background">
          <div className="search-bar text-secondary">
            <input
              type="text"
              placeholder="Search Games"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            />
          </div>
          <div className='flex flex-col items-center'>
            {(loggedInUserEmail === adminEmail) && (
              <Link to="/CreateGame">
                <Button className="bg-secondary border-2 border-red-600 text-xl font-sidebar text-white button hover:bg-red-600" variant="solid">
                  Add Game
                </Button>
              </Link>
            )}
          </div>
          <div className="hidden lg:block categories font-sidebar text-lg">
            <h3>Categories</h3>
            <ul>
              <li onClick={() => { setSelectedCategory(""); setCurrentPage(1); }} className={selectedCategory === "" ? "selected-category" : ""}>
                All Categories
              </li>
              <li onClick={() => { setSelectedCategory("Action"); setCurrentPage(1); }} className={selectedCategory === "Action" ? "selected-category" : ""}>
                Action
              </li>
              <li onClick={() => { setSelectedCategory("Adventure"); setCurrentPage(1); }} className={selectedCategory === "Adventure" ? "selected-category" : ""}>
                Adventure
              </li>
              <li onClick={() => { setSelectedCategory("Open World"); setCurrentPage(1); }} className={selectedCategory === "Open World" ? "selected-category" : ""}>
                Open World
              </li>
              <li onClick={() => { setSelectedCategory("Racing"); setCurrentPage(1); }} className={selectedCategory === "Racing" ? "selected-category" : ""}>
                Racing
              </li>
              <li onClick={() => { setSelectedCategory("RPG"); setCurrentPage(1); }} className={selectedCategory === "RPG" ? "selected-category" : ""}>
                RPG
              </li>
              <li onClick={() => { setSelectedCategory("Shooter"); setCurrentPage(1); }} className={selectedCategory === "Shooter" ? "selected-category" : ""}>
                Shooter
              </li>
              <li onClick={() => { setSelectedCategory("Sports"); setCurrentPage(1); }} className={selectedCategory === "Sports" ? "selected-category" : ""}>
                Sports
              </li>
            </ul>
          </div>
        </aside>
        <main className="games-main mx-auto bg-background">
          <div className="games-list text-white">
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                {currentGames.map((game, index) => (
                  <GameC key={index} game={game} onClick={() => handleGameClick(game._id)} />
                ))}
              </>
            )}
          </div>
          {/* Pagination */}
          {totalPages > 0 && (
          <div className="pagination">
            <Button className='bg-background border-2 border-white text-white' disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>Previous</Button>
            <span> Page {currentPage} of {totalPages} </span>
            <Button className='bg-background border-2 border-white text-white' disabled={currentPage === totalPages} onClick={() => paginate(currentPage + 1)}>Next</Button>
          </div>
          )}
        </main>
        <aside className="upcoming-games ml-0 bg-background font-sidebar text-center">
          <h3 className='text-lg'>Upcoming Games</h3>
          <ul>
            <li className='hover:text-red-600'><a href="https://youtu.be/vovkzbtYBC8?si=kEtrWBONVPoOoMjl" target="_blank" rel="noopener noreferrer">Assassin&apos;s Creed Shadows</a></li>
            <li className='hover:text-red-600'><a href="https://youtu.be/u83VdXAVq08?si=xBV-yG33DDH06Hgq" target="_blank" rel="noopener noreferrer">Black Myth Wukong</a></li>
            <li className='hover:text-red-600'><a href="https://youtu.be/7z7kqwuf0a8?si=ceGW4nUFzlIpWxVY" target="_blank" rel="noopener noreferrer">Ghost of Yōtei</a></li>
            <li className='hover:text-red-600'><a href="https://youtu.be/QdBZY2fkU-0?si=NMW_epycTEl-bg5j" target="_blank" rel="noopener noreferrer">Grand Theft Auto VI</a></li>
            <li className='hover:text-red-600'><a href="https://youtu.be/Lq594XmpPBg?si=9KH-Bym3DGZOWFiR" target="_blank" rel="noopener noreferrer">Horizon Forbidden West</a></li>
            <li className='hover:text-red-600'><a href="https://youtu.be/Lb2wwEx6DVw?si=f48Lcs6ekuqiDH45" target="_blank" rel="noopener noreferrer">Marvel 1943: Rise of Hydra</a></li>
          </ul>
        </aside>
      </div>
      <FooterC />
    </div>
  );
}

export default Games;
