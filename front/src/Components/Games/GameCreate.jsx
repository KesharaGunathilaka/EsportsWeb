import { useState, useEffect } from 'react'
import HeaderC from '../HeaderC/HeaderC';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {jwtDecode} from "jwt-decode";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';
import FooterC from '../FooterC/FooterC';
import Backend_URL from '../../config';

const GameCreate = () => {

    const [name, setName] = useState("")
    const [genres, setGenres] = useState("")
    const [companies, setCompanies] = useState("")
    const [releasedate, setReleasedate] = useState("")
    const [details, setDetails] = useState("")
    const [image, setImage] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [imageURL, setImageURL] = useState({});
    const [imgperc, setImgperc] = useState(0);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            console.log("Decoded Token:", decodedToken); // Log the decoded token
            setUsername(decodedToken.name);
            setEmail(decodedToken.email);
        }
    }, [token]);

    useEffect(() => {
        image && uploadFile(image, "imageURL");
    }, [image]);

    const uploadFile = (file, fileType) => {
        const storage = getStorage(app);
        const folder = fileType === "imageURL" ? "images/" : "videos/";
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, folder + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                fileType === "imageURL"
                    ? setImgperc(Math.round(progress)) :
                    console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setImageURL(downloadURL);
                });
            }
        );
    }

    
    const Game = async (e) => {
        e.preventDefault();
        if (name === "" || genres === "") {
            alert('Please fill out all inputs');
            return;
        }
        console.log("Submitting blog with user:", username, "and email:", email); // Log username and email before submitting
        try {
            setIsLoading(true);
            const response = await axios.post(`${Backend_URL}/api/games`, { 
                name: name, 
                genres: genres, 
                companies: companies,
                releasedate: releasedate,
                details: details,
                imageURL: imageURL,
                user: username,
                email: email // Send username and email to backend
            });
            
            toast.success(`Game Added Successfully`);
            setIsLoading(false);
            navigate("/Games");
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    }

  return (
    <div>
        <div>
            <HeaderC />
            <div className="font-sidebar text-lg bg-[url('/sign1.jpg')] bg-no-repeat bg-center bg-cover bg-fixed h-[110vh] m-0">
                <div className="signup-form-container max-w-screen-lg">
                    <h2 className="text-3xl mb-4 text-center -ml-20 text-white font-bold">Add Game</h2>
                    <form onSubmit={Game} className="signup-form">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-group w-80">
                            <label htmlFor="title">Title</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="username" name="title" placeholder="Title" required />
                        </div>
                        <div className="form-group w-80">
                            <label htmlFor="image">
                                Upload Image {imgperc > 0 && (<span className="ml-4 text-sm text-gray-300"> Uploading: {imgperc}%</span>)}
                            </label>
                            <input className='bg-white'
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        const file = e.target.files[0];
                                        setImage(file);
                                    }
                                }}
                                id="image"
                                name="image"
                                required
                            />
                        </div>
                       
                        <div className="form-group w-80">
                            <label htmlFor="Genres">Genres</label>
                            <input type="text" value={genres} onChange={(e) => setGenres(e.target.value)} id="username" name="Genres" placeholder="Genres" required />
                        </div>
                         <div className="form-group w-80">
                            <label htmlFor="title">Companies</label>
                            <input type="text" value={companies} onChange={(e) => setCompanies(e.target.value)} id="username" name="Companies" placeholder="Companies" required />
                        </div>
                        <div className="form-group w-80">
                            <label htmlFor="title">Release Date</label>
                            <input type="date" value={releasedate} onChange={(e) => setReleasedate(e.target.value)} id="username" name="Release Date" placeholder="Release Date" required />
                        </div>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <textarea
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                                id="content"
                                name="content"
                                placeholder="Content"
                                required
                                rows="4" 
                                style={{ width: '100%', resize: 'vertical' }} 
                            />
                        </div>

                        {!isLoading && (<button type="submit" className="btn-primary font-bold text-xl">Create</button>)}

                    </form>
                </div>
            </div>
        </div>
    <FooterC/>
    </div>
  )
}

export default GameCreate
