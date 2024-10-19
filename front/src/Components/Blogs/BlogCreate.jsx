import { useState, useEffect } from 'react'
import HeaderC from '../HeaderC/HeaderC';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';
import FooterC from '../FooterC/FooterC';
import Backend_URL from '../../config';
import Spinner from '../../Pages/Spinner';

const BlogCreate = () => {

    const [name, setName] = useState("")
    const [details, setDetails] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState("")
    const [imageURL, setImageURL] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [imgperc, setImgperc] = useState(0);
    const [isImageUploaded, setIsImageUploaded] = useState(false); // Track image upload status
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            setUsername(decodedToken.name);
            setEmail(decodedToken.email);
        }
    }, [token]);

    useEffect(() => {
        image && uploadFile(image, "imageURL");
    }, [image]);

    const uploadFile = (file, fileType) => {
        setIsImageUploaded(false); // Reset when a new image is being uploaded
        const storage = getStorage(app);
        const folder = fileType === "imageURL" ? "images/" : "videos/";
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, folder + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                fileType === "imageURL" ? setImgperc(Math.round(progress)) : console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                    case 'storage/canceled':
                    case 'storage/unknown':
                        break;
                }
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageURL(downloadURL);
                    setIsImageUploaded(true); // Set to true when image upload is completed
                });
            }
        );
    }

    const Blog = async (e) => {
        e.preventDefault();
        if (name === "" || details === "" || !isImageUploaded) {
            alert('Please fill out all inputs and wait for the image upload to complete');
            return;
        }
        try {
            setIsLoading(true);
            const response = await axios.post(`${Backend_URL}/api/blogs`, {
                name: name,
                details: details,
                category: category,
                imageURL: imageURL,
                user: username,
                email: email 
            });

            toast.success(`Blog Created Successfully`);
            setIsLoading(false);
            navigate("/Blogs");
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    }

    return (
        <div>
            <HeaderC />
            <div className="font-sidebar text-lg bg-[url('/sign4.jpg')] bg-no-repeat bg-center bg-cover bg-fixed h-[100vh] pb-4">
                <div className="signup-form-container max-w-screen-lg">
                    <h2 className="text-3xl mb-4 text-center -ml-20 text-white font-bold">Create Blog</h2>
                    <form onSubmit={Blog} className="signup-form">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-group w-80">
                                <label htmlFor="title">Title</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="username" name="title" placeholder="Title" required />
                            </div>
                            <div className="form-group w-80">
                                <label htmlFor="category">Category</label>
                                <select value={category} onChange={(e) => setCategory(e.target.value)} id="cat" name="Cat" placeholder="Category" className='border rounded-md p-2 w-full h-10 ' required>
                                    <option value="">Select Category</option>
                                    <option value="news">News</option>
                                    <option value="reviews">Reviews</option>
                                    <option value="guides">Guides</option>
                                    <option value="esports">eSports</option>
                                </select>
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
                                rows="8"
                                style={{ width: '100%', resize: 'vertical' }}
                            />
                        </div>

                        <button type="submit" className="btn-primary" disabled={!isImageUploaded || isLoading}>
                            {!isImageUploaded ? <Spinner/> : "Create"}
                        </button>
                    </form>
                </div>
            </div>
            <FooterC />
        </div>
    )
}

export default BlogCreate;
