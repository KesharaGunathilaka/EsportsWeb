import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import HeaderC from '../HeaderC/HeaderC';
import { Button } from '@nextui-org/react';
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import FooterC from "../FooterC/FooterC";
import Spinner from "../../Pages/Spinner";
import Backend_URL from "../../config";

const GameDisplay = () => {

  const { id } = useParams();
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
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
      setGames(response.data);
      setSelectedGame(response.data.find(game => game._id === id));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getGames();
  }, [id]);

  const handleGameClick = (gameId) => {
    navigate(`/gamedis/${gameId}`);
  };

  const deleteGame = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    })
    if (result.isConfirmed) {
      try {
        await axios.delete(`${Backend_URL}/api/games/${id}`);
        toast.success("Game Deleted Successfully");
        navigate("/Games");

      } catch (error) {
        toast.error(error.message);

      }

      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  }


  return (
    <div>
      <HeaderC />
      <div>
        <div className="flex bg-background text-slate-100">
          {/* Left Sidebar */}
          <aside className="hidden lg:block w-1/6 text-center p-4 h-screen border-r border-red-900">
            <h2 className="text-xl font-bold mb-6 mt-6 font-title">Games</h2>
            <ul className="space-y-4 font-sidebar">
              {games
                .slice() // Create a shallow copy to avoid mutating the original array
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort games by creation date in descending order
                .map((game) => (
                  <li key={game._id} className="block">
                    <button
                      className={` hover:underline ${game._id === id ? "font-bold text-red-600" : ""}`}
                      onClick={() => handleGameClick(game._id)}
                    >
                      {game.name}
                    </button>
                  </li>
                ))}
            </ul>
          </aside>



          {/* Main Content Area */}
          <main className="w-full lg:w-5/6 text-center lg:text-start p-8">
            {selectedGame && (
              <>
                <h1 className="text-3xl font-title font-bold mb-6">{selectedGame.name}</h1>

                {(loggedInUserEmail === adminEmail) && (
                  <div className="flex space-x-4 mb-4">
                    <Link to={`/gameedit/${selectedGame._id}`} >
                      <Button className="bg-secondary border-2 border-yellow-500 text-xl font-sidebar text-white button hover:bg-yellow-500" variant="solid">
                        Edit Game
                      </Button>
                  </Link>
                    
                    <Button onClick={() => deleteGame(selectedGame._id)} className="bg-secondary border-2 border-red-600 text-xl font-sidebar text-white button hover:bg-red-600" variant="solid">
                    Delete Game
                      </Button>
                  </div>
                )}

                <img
                  src={selectedGame.imageURL}
                  alt={selectedGame.name}
                  className="w-full h-auto mb-4"
                />
                <div className="text-lg">Genres: {selectedGame.genres}</div>
                <div className="text-lg">{selectedGame.companies ? `Companies: ${selectedGame.companies}` : null}</div>
                <div className="text-lg">{selectedGame.releasedate ? `Release Date: ${new Date(selectedGame.releasedate).toISOString().split('T')[0]}` : null}</div>

                <pre className="text-gray-300 text-lg font-sidebar mt-6 whitespace-pre-wrap">
                  {selectedGame.details}
                </pre>

                {/* <div className="post-stats">
                <span>👍 {selectedGame.likes} Likes</span>
                <span>💬 {selectedGame.comments} Comments</span>
              </div> */}
              </>
            )}
            {isLoading && <Spinner/>}
          </main>
        </div>
      </div>
      <FooterC />
    </div>
  )
}

export default GameDisplay
