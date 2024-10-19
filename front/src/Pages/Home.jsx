import { useEffect, useState } from 'react';
import HeaderC from '../Components/HeaderC/HeaderC';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import './Home.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import FooterC from '../Components/FooterC/FooterC';
import Spinner from './Spinner';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:3000/api/blogs/");
      console.log(response.data);
      setBlogs(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false); // Ensure loading state is turned off even on error
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const handleBlogClick = (blogId) => {
    navigate(`/blogdis/${blogId}`);
  };

  return (
    <div>
      <HeaderC />
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade]}
        spaceBetween={5}
        effect="fade"
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide><img src="slide1.jpg" alt="Slide 1" /></SwiperSlide>
        <SwiperSlide><img src="slide2.jpg" alt="Slide 2" /></SwiperSlide>
        <SwiperSlide><img src="slide3.jpeg" alt="Slide 3" /></SwiperSlide>
        <SwiperSlide><img src="slide4.jpg" alt="Slide 4" /></SwiperSlide>
        <SwiperSlide><img src="slide5.jpeg" alt="Slide 5" /></SwiperSlide>
      </Swiper>
      <div className='bg-background font-title text-white'>
        <div className="streams-section">
          <h1 className="text-xl mt-4 mb-6">Upcoming Games</h1>
          <div className="streams-container gap-x-4">
            {[
              "https://www.youtube.com/embed/vovkzbtYBC8",
              "https://www.youtube.com/embed/7z7kqwuf0a8",
              "https://www.youtube.com/embed/kMN-x9goE7M",
              "https://www.youtube.com/embed/u83VdXAVq08"
            ].map((url, index) => (
              <div className="stream-item" key={index}>
                <iframe
                  width="100%"
                  height="200"
                  src={url + "?si=EX6mnrHOoicL41qi"}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        </div>

        <div className="news-section pb-8">
          <h1 className="text-xl mt-4 mb-6">Latest Blogs</h1>
          <div className="news-container">
            {isLoading ? (
              <Spinner />
            ) : (
              blogs
                .slice() // Copy the array to avoid mutating the original
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by date (descending)
                .slice(0, 3) // Take the first 3 blogs
                .map((blog) => (
                  <div
                    key={blog._id}
                    className="news-item cursor-pointer hover:border hover:border-white"
                    onClick={() => handleBlogClick(blog._id)}
                  >
                    <img src={blog.imageURL} alt={blog.title} />
                    <h3>{blog.name}</h3>
                    <p>{blog.details.slice(0, 50)}...</p>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
      <FooterC />
    </div>
  );
}

export default Home;
