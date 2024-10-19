import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderC from '../HeaderC/HeaderC';
import { toast } from "react-toastify";
import FooterC from "../FooterC/FooterC";

const GameEdit = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [games, setGames] = useState({
        title: "",
        genres: "",
        companies: "",
        releasedate: "",
        details: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const getGames = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:3000/api/games/${id}`);
            setGames({
                name: response.data.name,
                genres: response.data.genres,
                companies: response.data.companies,
                releasedate: response.data.releasedate,
                details: response.data.details
            });
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message);
        }
    };


    const updateGame = async (e) => {
        e.preventDefault();
        setIsLoading(true);
       try {
          
            const response = await axios.put(`http://localhost:3000/api/games/${id}`, games);

            toast.success(`Game Updated Successfully`);
            setIsLoading(false);
            navigate(`/gamedis/${id}`);
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    }

useEffect(() => {
    getGames();
}, []);


  return (
    <div>
    <HeaderC />
    <div className="font-sidebar  text-lg bg-[url('/sign1.jpg')] bg-no-repeat bg-center bg-cover bg-fixed h-[110vh] m-0">
    <div className="signup-form-container max-w-screen-lg ">
    <h2 className="text-3xl mb-4 text-center -ml-20 text-white font-bold">Edit Game</h2>
            <form onSubmit={updateGame} className="signup-form">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group w-80">
                    <label htmlFor="title">Title</label>
                    <input type="text" value={games.name} onChange={(e) => setGames({ ...games, name: e.target.value })} id="username" name="title" placeholder="Title" required />
                </div>
                <div className="form-group w-80">
                    <label htmlFor="title">Genres</label>
                    <input type="text" value={games.genres} onChange={(e) => setGames({ ...games, genres: e.target.value })} id="username" name="genres" placeholder="genres" required />
                </div>
                <div className="form-group w-80">
                    <label htmlFor="title">Companies</label>
                    <input type="text" value={games.companies} onChange={(e) => setGames({ ...games, companies: e.target.value })} id="username" name="companies" placeholder="companies" />
                </div>
                <div className="form-group w-80">
                    <label htmlFor="title">Title</label>
                    <input type="date" value={games.releasedate} onChange={(e) => setGames({ ...games, releasedate: e.target.value })} id="username" name="releasedate" placeholder="releasedate" />
                </div>
                </div>
                {/*   <div className="form-group w-80">
                        <label htmlFor="image">Upload Image</label>
                        <input className='bg-white'
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    const file = e.target.files[0];

                                }
                            }}
                            id="image"
                            name="image"
                            required
                        />
                    </div>
                    */}
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        value={games.details}
                        onChange={(e) => setGames({ ...games, details: e.target.value })}
                        id="content"
                        name="content"
                        placeholder="Content"
                        rows="8"
                        style={{ width: '100%', resize: 'vertical' }}
                    />
                </div>

                {!isLoading && (<button type="submit" className="btn-primary">Update</button>)}

            </form>
        </div>
    </div>
    <FooterC/>
</div>
)
}

export default GameEdit

