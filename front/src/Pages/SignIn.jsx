import { useState } from 'react'
import './SignIn.css';
import HeaderC from '../Components/HeaderC/HeaderC';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import FooterC from '../Components/FooterC/FooterC';
import Backend_URL from '../config';


const SignIn = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const loginUser = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert('Please fill out all inputs');
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(`${Backend_URL}/api/auth`, { email: email, password: password });
      localStorage.setItem("token", response.data.token);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      if (errorMessage === "User not found") {
        toast.error("Email not found");
        setPassword("");
      } else if (errorMessage === "Incorrect Password") {
        toast.error("Incorrect password");
        setPassword("");
      } else {
        toast.error("Invalid Inputs");
      }
      setIsLoading(false);
    }
  }

  return (
    <div>
      <HeaderC />
      <div className="signup-page font-sidebar text-lg">
        <div className="signup-form-container">
          <h2 className="text-2xl mb-4 text-center text-white font-bold">Sign In</h2>
          <form onSubmit={loginUser} className="signup-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Enter your password" required />
            </div>
            {!isLoading && (<button type="submit" className="btn-primary">Sign In</button>)}
            <div><p className='text-white text-center mt-4' >Don&apos;t have an account?{' '} <Link to="/SignUp" className="underline">Sign up </Link> </p></div>
          </form>
        </div>
      </div>
      <FooterC/>
    </div>
  )
}

export default SignIn
