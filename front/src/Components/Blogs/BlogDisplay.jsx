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


const BlogDisplay = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const adminEmail = "admin@gmail.com";

  let loggedInUserEmail = null;
  if (token) {
    const decodedToken = jwtDecode(token);
    loggedInUserEmail = decodedToken.email; // Assumes email is stored in the token
  }

  const getBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${Backend_URL}/api/blogs/`);
      setBlogs(response.data);
      setSelectedBlog(response.data.find(blog => blog._id === id));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, [id]);

  const handleBlogClick = (blogId) => {
    navigate(`/blogdis/${blogId}`);
  };

  const deleteBlog = async (id) => {
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
        await axios.delete(`${Backend_URL}/api/blogs/${id}`);
        toast.success("Blog Deleted Successfully");
        navigate("/Blogs");

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
            <h2 className="text-xl font-bold mb-6 mt-6 font-title">Other Blogs</h2>
            <ul className="space-y-4 font-sidebar">
              {blogs
                .slice()
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((blog) => (
                  <li key={blog._id} className="block">
                    <button
                      className={` hover:underline ${blog._id === id ? "font-bold text-red-600" : ""}`}
                      onClick={() => handleBlogClick(blog._id)}
                    >
                      {blog.name}
                    </button>
                  </li>
                ))}
            </ul>
          </aside>

          {/* Main Content Area */}
          <main className="w-full lg:w-5/6 text-center lg:text-start p-8">
            {selectedBlog && (
              <>
                <h1 className="text-3xl font-title font-bold mb-6">{selectedBlog.name}</h1>

                <p className=" mb-4 ">By {selectedBlog.user} | updated at {new Date(selectedBlog.updatedAt).toLocaleDateString()}</p>



                {(loggedInUserEmail === selectedBlog.email || loggedInUserEmail === adminEmail) && (
                  <div className="flex space-x-4 mb-4">
                    <Link to={`/blogedit/${selectedBlog._id}`} >
                      <Button className="bg-secondary border-2 border-yellow-500 text-xl font-sidebar text-white button hover:bg-yellow-500" variant="solid">
                        Edit Blog
                      </Button>
                    </Link>
                    <Button onClick={() => deleteBlog(selectedBlog._id)} className="bg-secondary border-2 border-red-600 text-xl font-sidebar text-white button hover:bg-red-600" variant="solid">
                      Delete Blog
                    </Button>
                  </div>
                )}

                <img
                  src={selectedBlog.imageURL}
                  alt={selectedBlog.name}
                  className="w-full h-auto mb-4"
                />
                <pre className="text-gray-300 text-lg font-sidebar mt-6 whitespace-pre-wrap">
                  {selectedBlog.details}
                </pre>
                {/* <div className="post-stats">
                <span>👍 {selectedBlog.likes} Likes</span>
                <span>💬 {selectedBlog.comments} Comments</span>
              </div> */}
              </>
            )}
            {isLoading && <Spinner />}
          </main>
        </div>
      </div>
      <FooterC />
    </div>
  );
};

export default BlogDisplay;
