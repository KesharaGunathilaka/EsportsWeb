import { useEffect } from 'react';
import HeaderC from '../Components/HeaderC/HeaderC';
import { useState } from 'react';
import axios from "axios";
import { Link,useNavigate } from 'react-router-dom';
import { Button, Spinner } from '@nextui-org/react';
import './Esports.css';
import { jwtDecode } from "jwt-decode";
import FooterC from '../Components/FooterC/FooterC';
import { toast } from "react-toastify";
import Swal from "sweetalert2";


const Esports = () => {

  const token = localStorage.getItem("token");
  const [esports, setEsports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const adminEmail = "admin@gmail.com";
  const navigate = useNavigate();

  let loggedInUserEmail = null;
  if (token) {
    const decodedToken = jwtDecode(token);
    loggedInUserEmail = decodedToken.email; // Assumes email is stored in the token
  }

  const getEsports = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:3000/api/esports/");
      console.log(response.data);
      setEsports(response.data);
      setIsLoading(false);

    } catch (error) {
      console.log(error);
    }
  }

  const deleteEsport = async (id) => {
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
        await axios.delete(`http://localhost:3000/api/esports/${id}`);
        toast.success("Competition Deleted Successfully");
        navigate("/");

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

  useEffect(() => {
    getEsports();

  }, [])

  const previousTournaments = [
    {
      id: 1,
      title: 'PUBG Battlegrounds 2024',
      image: "win1.jpeg",
      winner: 'SONIQS',
      prize: '$700,000',
    },
    {
      id: 2,
      title: 'APEX LEGENDS 2024',
      image: "win2.jpeg",
      winner: 'ALLIANCE',
      prize: '$600,000',
    },
    {
      id: 3,
      title: 'COD Warzone 2024',
      image: "win3.jpg",
      winner: 'TEAM FALCONS',
      prize: '$200,000',
    },
    {
      id: 4,
      title: 'Moblie Legends 2024',
      image: "win4.jpg",
      winner: 'SELANGOR RED GIANTS',
      prize: '$1,000,000',
    },
  ];

  return (
    <div className='bg-background text-slate-200'>
      <HeaderC />
      <div className='mt-3 items-center text-center justify-center '>
        {(loggedInUserEmail === adminEmail) && (
          <Link to="/CreateEsport"><Button className="bg-secondary border-2 border-yellow-500 text-xl font-sidebar text-white button hover:bg-yellow-500" variant="solid">
            Add Competition
          </Button>
          </Link>

        )}
      </div>
      <div className="esports-page">
        <main className="esports-main">
          {isLoading ? ( // Show loading indicator while loading
            <Spinner />
          ) : (
            <div className="competitions-list text-slate-200">
              {esports.map((esport) => (
                <div key={esport.id} className="competition-item">
                  <img src={esport.imageURL} alt={esport.name} />
                  <div className="competition-details font-sidebar text-lg">
                    <h2 className="font-title text-2xl">{esport.name}</h2>
                    <div>Date: {new Date(esport.date).toLocaleDateString()}</div>
                    <div>Location: {esport.location}</div>
                    <div>Participants: {esport.participants} teams</div>
                    <div>Prize Pool: ${esport.prizepool}</div>
                    <p>{esport.details.slice(0, 200)}...</p>
                    {loggedInUserEmail === adminEmail && (
                      <div>
                        <Link to={`/esportedit/${esport._id}`}>
                          <Button className="bg-secondary border-2 mt-3 border-yellow-500 text-xl font-sidebar text-white button hover:bg-yellow-500" variant="solid">
                            Edit Competition
                          </Button>
                        </Link>
                        <Button onClick={() => deleteEsport(esport._id)} className="ml-3 bg-secondary border-2 border-red-600 text-xl font-sidebar text-white button hover:bg-red-600" variant="solid">
                          Delete Competition
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        <section className="previous-tournaments">
          <h1 className='text-3xl mb-4 text-center'>ESPORT WORLD CUP 2024 GAMES AND TOURNAMENTS CHAMPIONS</h1>
          <div className="competitions-list">
            {previousTournaments.map((tournament) => (
              <div key={tournament.id} className="competition-item">
                <div className="competition-details font-sidebar">
                  <h2 className="text-2xl text-center font-bold">{tournament.title}</h2>
                  <img src={tournament.image} alt={tournament.name} />
                  <div className="text-xl font-bold">Winner: {tournament.winner}</div>
                  <div className="text-xl">Prize: {tournament.prize}</div>

                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <FooterC />
    </div>
  );
};

export default Esports;
