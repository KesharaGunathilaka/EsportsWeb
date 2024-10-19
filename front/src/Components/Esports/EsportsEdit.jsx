import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderC from '../HeaderC/HeaderC';
import { toast } from "react-toastify";
import FooterC from "../FooterC/FooterC";

const EsportsEdit = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [esports, setEsports] = useState({
        name: "",
        date: "",
        location: "",
        participants: "",
        prizepool: "",
        details: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const getEsports = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:3000/api/esports/${id}`);
            setEsports({
                name: response.data.name,
                date: response.data.date,
                location: response.data.location,
                participants: response.data.participants,
                prizepool: response.data.prizepool,
                details: response.data.details
            });
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message);
        }
    };


    const updateEsport = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {

            const response = await axios.put(`http://localhost:3000/api/esports/${id}`, esports);

            toast.success(`Competition Updated Successfully`);
            setIsLoading(false);
            navigate(`/esports`);
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getEsports();
    }, []);



    return (
        <div>
            <HeaderC />
            <div className="font-sidebar text-lg bg-[url('/sign1.jpg')] bg-no-repeat bg-center bg-cover bg-fixed h-[110vh] m-0">
                <div className="signup-form-container max-w-screen-lg">
                <h2 className="text-3xl mb-4 text-center -ml-20 text-white font-bold">Edit Competition</h2>
                    <form onSubmit={updateEsport} className="signup-form">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-group w-80">
                                <label htmlFor="title">Name</label>
                                <input type="text" value={esports.name} onChange={(e) => setEsports({ ...esports, name: e.target.value })} id="username" name="title" placeholder="Title" required />
                            </div>
                            <div className="form-group w-80">
                                <label htmlFor="title">Date</label>
                                <input type="date" value={esports.date} onChange={(e) => setEsports({ ...esports, date: e.target.value })} id="username" name="date" placeholder="date" required />
                            </div>
                            <div className="form-group w-80">
                                <label htmlFor="title">Location</label>
                                <input type="text" value={esports.location} onChange={(e) => setEsports({ ...esports, location: e.target.value })} id="username" name="location" placeholder="location" />
                            </div>
                            <div className="form-group w-80">
                                <label htmlFor="title">Participants</label>
                                <input type="text" value={esports.participants} onChange={(e) => setEsports({ ...esports, participants: e.target.value })} id="username" name="participants" placeholder="participants" />
                            </div>
                            <div className="form-group w-80">
                                <label htmlFor="title">Prizepool</label>
                                <input type="text" value={esports.prizepool} onChange={(e) => setEsports({ ...esports, prizepool: e.target.value })} id="username" name="prizepool" placeholder="prizepool" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Details</label>
                            <textarea
                                value={esports.details}
                                onChange={(e) => setEsports({ ...esports, details: e.target.value })}
                                id="content"
                                name="content"
                                placeholder="Content"
                                rows="4"
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

export default EsportsEdit
