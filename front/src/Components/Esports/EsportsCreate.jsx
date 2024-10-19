import { useState,useEffect } from 'react'
import HeaderC from '../HeaderC/HeaderC';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {jwtDecode} from "jwt-decode";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';
import FooterC from '../FooterC/FooterC';

const EsportsCreate = () => {

    const [name, setName] = useState("")
    const [date, setDate] = useState("")
    const [location, setLocation] = useState("")
    const [participants, setParticipants] = useState("")
    const [prizepool, setPrizepool] = useState("")
    const [details, setDetails] = useState("")
    const [image, setImage] = useState("")
    const [imageURL, setImageURL] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [imgperc, setImgperc] = useState(0);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    
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
    
    const Esport = async (e) => {
        e.preventDefault();
        if (name === "") {
            alert('Please fill out all inputs');
            return;
        }
        console.log("Submitting blog with user:", username, "and email:", email); // Log username and email before submitting
        try {
            setIsLoading(true);
            const response = await axios.post("http://localhost:3000/api/esports", { 
                name: name, 
                date: date, 
                location: location,
                participants: participants,
                prizepool: prizepool,
                details: details,
                user: username,
                imageURL: imageURL,
                email: email // Send username and email to backend
            });
            
            toast.success(`Competition Added Successfully`);
            setIsLoading(false);
            navigate("/Esports");
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
            <h2 className="text-3xl mb-4 text-center -ml-20 text-white font-bold">Add Competition</h2>
                <form onSubmit={Esport} className="signup-form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group w-80">
                        <label htmlFor="title">Name</label>
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
                        <label htmlFor="Genres">Date</label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} id="username" name="date" placeholder="" required />
                    </div>
                     <div className="form-group w-80">
                        <label htmlFor="title">Location</label>
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} id="username" name="location" placeholder="Location" required />
                    </div>
                    <div className="form-group w-80">
                        <label htmlFor="title">Participants</label>
                        <input type="text" value={participants} onChange={(e) => setParticipants(e.target.value)} id="username" name="Participants" placeholder="Participants" required />
                    </div>
                    <div className="form-group w-80">
                        <label htmlFor="title">Prizepool</label>
                        <input type="text" value={prizepool} onChange={(e) => setPrizepool(e.target.value)} id="username" name="Prizepool" placeholder="Prizepool" required />
                    </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="content">Details</label>
                        <textarea
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            id="content"
                            name="content"
                            placeholder="Details"
                            required
                            rows="4" 
                            style={{ width: '100%', resize: 'vertical' }} 
                        />
                    </div>

                    {!isLoading && (<button type="submit" className="btn-primary">Create</button>)}

                </form>
            </div>
        </div>
    </div>
<FooterC/>
</div>
)
}

export default EsportsCreate
