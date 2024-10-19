import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderC from '../HeaderC/HeaderC';
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import FooterC from "../FooterC/FooterC";
import Backend_URL from "../../config";

const BlogEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState({
        name: "",
        details: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const adminEmail = "admin@gmail.com";

    const getBlogs = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${Backend_URL}/api/blogs/${id}`);
            setBlogs({
                name: response.data.name,
                details: response.data.details
            });
            checkAuthorization(response.data.email);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message);
        }
    };

    const checkAuthorization = (creatorEmail) => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            const loggedInUserEmail = decodedToken.email;

           
            if (loggedInUserEmail === adminEmail || loggedInUserEmail === creatorEmail) {
                setIsAuthorized(true);
            } else {
                
                if (!isAuthorized) {
                    toast.error("You can't edit this blog.");
                    navigate("/SignUp");
                }
            }
        } else {
            
            if (!isAuthorized) {
                toast.error("You need to log in first.");
                navigate("/SignIn");
            }
        }
    };

    const updateBlog = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.put(`${Backend_URL}/api/blogs/${id}`, blogs);
            toast.success(`Blog Updated Successfully`);
            setIsLoading(false);
            navigate(`/blogdis/${id}`);
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getBlogs();
    }, []);

    return (
        <div>
            <HeaderC />
            <div className="font-sidebar text-lg bg-[url('/sign4.jpg')] bg-no-repeat bg-center bg-cover bg-fixed h-[95vh] pb-4">
                <div className="signup-form-container max-w-screen-lg">
                <h2 className="text-3xl mb-4 text-center -ml-20 text-white font-bold">Edit Blog</h2>
                    {isAuthorized ? (
                        <form onSubmit={updateBlog} className="signup-form">
                            <div className="form-group w-80">
                                <label htmlFor="title">Title</label>
                                <input type="text" value={blogs.name} onChange={(e) => setBlogs({ ...blogs, name: e.target.value })} id="username" name="title" placeholder="Title" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="content">Content</label>
                                <textarea
                                    value={blogs.details}
                                    onChange={(e) => setBlogs({ ...blogs, details: e.target.value })}
                                    id="content"
                                    name="content"
                                    placeholder="Content"
                                    required
                                    rows="8"
                                    style={{ width: '100%', resize: 'vertical' }}
                                />
                            </div>

                            {!isLoading && (<button type="submit" className="btn-primary">Update</button>)}
                        </form>
                    ) : (
                        <p className="text-red-500">You do not have permission to edit this blog.</p>
                    )}
                </div>
            </div>
            <FooterC/>
        </div>
    )
}

export default BlogEdit;
