import { Link } from "react-router-dom";

const FooterC = () => {
  return (
    <footer className="bg-secondary font-sidebar text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Description */}
          <div>
            <h3 className="text-2xl text-red-600 font-bold mb-2">KNIGHTS Gaming Community</h3>
            <p>
              Knights Gaming Community (KGC) is your ultimate hub for all things gaming.
              Whether you&apos;re looking to join intense tournaments, connect with fellow gamers, or explore the latest in the gaming world,
              we ensure that your gaming experience is both thrilling and seamless.
              Discover our curated events, manage your team, and stay up-to-date with the hottest gaming trends.
              Start leveling up your gaming journey with KGC today.
            </p>
          </div>
          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="ml-3 text-xl font-semibold mb-2">Navigate</h4>
              <ul className="flex flex-col text-start">
                <li>
                  <Link to="/" className="hover:text-red-600">HOME</Link>
                </li>
                <li>
                  <Link to="/Games" className="hover:text-red-600">GAMES</Link>
                </li>
                <li>
                  <Link to="/Blogs" className="hover:text-red-600">BLOGS</Link>
                </li>
                <li>
                  <Link to="/Esports" className="hover:text-red-600">ESPORTS</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold ml-6 mb-2">About</h4>
              <ul className="flex flex-col text-start">
                <li>
                  <Link to="/AboutUs" className="hover:text-red-600">ABOUT US</Link>
                </li>
                <li>
                  <Link to="/ContactUs" className="hover:text-red-600">CONTACT US</Link>
                </li>
              </ul>
            </div>
          </div>
          {/* Call to Action */}
          <div className="mt-4 md:mt-0">
            <h4 className="text-xl font-semibold mb-2">Are you a GAMER?</h4>
            <p className="mb-4">
              Join us to connect with a vibrant community of gamers, host epic tournaments, and share your content with a passionate audience. 
              Together, let&apos;s make gaming experiences unforgettable!
            </p>
            <Link to="/SignUp">
              <a href="#_" className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
                <span className="w-full h-full bg-gradient-to-br from-[#FF4500] to-[#D63031] group-hover:from-[#FF5733] group-hover:to-[#C0392B] absolute"></span>
                <span className="relative px-4 py-2 transition-all ease-out bg-button rounded-md group-hover:bg-opacity-0 duration-400">
                  <span className="relative text-white">JOIN US</span>
                </span>
              </a>
            </Link>
          </div>
        </div>
        <hr className="border-t border-red-800 pt-2" />
        <div className="flex flex-col justify-between items-center mt-2">
          {/* Copyright Information */}
          <div className="flex-col text-red-500 text-center mt-2">
            <p>All rights reserved</p>
            <p>Copyrights &copy;2024 KGC.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterC;
