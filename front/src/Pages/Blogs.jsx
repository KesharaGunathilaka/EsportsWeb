import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderC from '../Components/HeaderC/HeaderC';
import './Blogs.css';
import axios from "axios";
import BlogC from '../Components/Blogs/BlogC';
import { Button } from '@nextui-org/react';
import FooterC from '../Components/FooterC/FooterC';
import Spinner from './Spinner';
import Backend_URL from '../config';

const Blogs = () => {
  const token = localStorage.getItem("token");
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 4;

  const getBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${Backend_URL}/api/blogs/`);
      console.log(response.data);
      setBlogs(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const handleBlogClick = (blogId) => {
    navigate(`/blogdis/${blogId}`);
  };

  const filteredBlogs = blogs
    .filter((blog) => blog.name.toLowerCase().includes(searchQuery))
    .filter((blog) => {
      if (selectedCategory === "") return true;
      if (!blog.category) return false;
      const categoryArray = blog.category.split(',').map(category => category.trim().toLowerCase());
      return categoryArray.includes(selectedCategory.toLowerCase());
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to top when page changes
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to page 1
    window.scrollTo(0, 0); // Scroll to top when category changes
  };

  return (
    <div>
      <HeaderC />
      <div className="blog-page bg-background text-slate-200">
        <div className='block lg:hidden mx-auto mt-4'>
          <div className='flex flex-col mb-3 items-center'>
            {token ? (

              <Button className="bg-secondary border-2 border-red-600 text-xl font-sidebar text-white button hover:bg-red-600" variant="solid">
                <Link to="/CreateBlog">
                  Add Blog
                </Link>
              </Button>

            ) : null}
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Blogs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            />
          </div>
        </div>
        <aside className="hidden lg:block sidebar font-sidebar bg-side bg-background">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Blogs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            />
          </div>
          <div className='flex flex-col items-center'>
            {token ? (
              <Link to="/CreateBlog">
                <Button className="bg-secondary border-2 border-red-600 text-xl font-sidebar text-white button hover:bg-red-600" variant="solid">
                  Add Blog
                </Button>
              </Link>
            ) : null}
          </div>
          <div className="hidden lg:block categories text-lg text-slate-400">
            <h3>Categories</h3>
            <ul>
              <li
                onClick={() => handleCategorySelect("")}
                className={selectedCategory === "" ? "selected-category" : ""}
              >
                All Categories
              </li>
              <li
                onClick={() => handleCategorySelect("News")}
                className={selectedCategory === "News" ? "selected-category" : ""}
              >
                News
              </li>
              <li
                onClick={() => handleCategorySelect("Reviews")}
                className={selectedCategory === "Reviews" ? "selected-category" : ""}
              >
                Reviews
              </li>
              <li
                onClick={() => handleCategorySelect("Guides")}
                className={selectedCategory === "Guides" ? "selected-category" : ""}
              >
                Guides
              </li>
              <li
                onClick={() => handleCategorySelect("eSports")}
                className={selectedCategory === "eSports" ? "selected-category" : ""}
              >
                eSports
              </li>
            </ul>
          </div>
        </aside>
        <main className="blog-main bg-background">
          <div className="posts-list my-1">
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                {currentBlogs.map((blog, index) => (
                  <BlogC key={index} blog={blog} onClick={() => handleBlogClick(blog._id)} />
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
          <h3 className='text-lg'>Upcoming Events</h3>
          <ul>
            <li className='hover:text-red-600'><a href="https://www.nzgdc.com/" target="_blank" rel="noopener noreferrer">New Zealand Games Developers Conference 2024</a></li>
            <li className='hover:text-red-600'><a href="https://1upstate.com/home/" target="_blank" rel="noopener noreferrer">1UpState 2024</a></li>
            <li className='hover:text-red-600'><a href="https://hgconf.com/" target="_blank" rel="noopener noreferrer">HIT Games Conference Berlin 2024</a></li>
            <li className='hover:text-red-600'><a href="https://gic.gd/" target="_blank" rel="noopener noreferrer">Game Industry Conference (GIC) 2024</a></li>
            <li className='hover:text-red-600'><a href="https://www.gamesoundcon.com/" target="_blank" rel="noopener noreferrer">GameSoundCon 2024</a></li>
            <li className='hover:text-red-600'><a href="https://www.aiandgamesconference.com/" target="_blank" rel="noopener noreferrer">AI and Games Conference 2024</a></li>
          </ul>
        </aside>
      </div>
      <FooterC />
    </div>
  );
};

export default Blogs;
