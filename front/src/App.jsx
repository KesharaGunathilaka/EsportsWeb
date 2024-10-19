import Games from "./Pages/Games"
import Home from "./Pages/Home"
import Blogs from "./Pages/Blogs"
import Esports from "./Pages/Esports"
import SignUp from "./Pages/SignUp"
import SignIn from "./Pages/SignIn"
import BlogCreate from "./Components/Blogs/BlogCreate"
import BlogDisplay from "./Components/Blogs/BlogDisplay"
import BlogEdit from "./Components/Blogs/BlogEdit"
import { Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GameCreate from "./Components/Games/GameCreate"
import GameDisplay from "./Components/Games/GameDisplay"
import GameEdit from "./Components/Games/GameEdit"
import EsportsCreate from "./Components/Esports/EsportsCreate"
import EsportsEdit from "./Components/Esports/EsportsEdit"
import ProtectedRoutes from "./Utils/ProtectedRoutes"
import ContactUs from "./Pages/ContactUs"
import AboutUs from "./Pages/AboutUs"
import NotFound from "./Pages/NotFound"
import ScrollToTop from "./Utils/ScrollToTop"

function App() {

  return (
    <div>
      <ScrollToTop />
      <div>
        <Routes>

          <Route exact path="/" element={<Home />}> </Route>
          <Route path="/Games" element={<Games />}></Route>
          <Route path="/Blogs" element={<Blogs />}></Route>
          <Route path="/Esports" element={<Esports />}></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>
          <Route path="/SignIn" element={<SignIn />}></Route>
          <Route path="/blogdis/:id" element={<BlogDisplay />} />
          <Route path="/CreateBlog" element={<BlogCreate />} />
          <Route path="/blogedit/:id" element={<BlogEdit/>} />
          <Route path="/gamedis/:id" element={<GameDisplay />} />
          <Route path="/ContactUs" element={<ContactUs/>}></Route>
          <Route path="/AboutUs" element={<AboutUs/>}></Route>
          <Route path="*" element={<NotFound/>} /> 
          
          <Route element={<ProtectedRoutes/>}>
          <Route path="/CreateGame" element={<GameCreate />} />
          <Route path="/gameedit/:id" element={<GameEdit/>} />
          <Route path="/CreateEsport" element={<EsportsCreate />} />
          <Route path="/esportedit/:id" element={<EsportsEdit/>} />
          </Route>
                  
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="dark"
        transition:Bounce/>
    </div>

  )
}

export default App
