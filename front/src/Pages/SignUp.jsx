import { useState } from 'react'
import './SignUp.css';
import HeaderC from '../Components/HeaderC/HeaderC';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import FooterC from '../Components/FooterC/FooterC';
import Backend_URL from '../config';

const SignUp = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const regUser = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      toast.error("Please fill out all inputs");
      return;
    }
    try {
      setIsLoading(true);
      await axios.post(`${Backend_URL}/api/users`, { name, email, password });
      toast.success("Successfully Registered");
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      // Display the specific error message from the backend, if available
      const errorMessage = error.response?.data?.message || "An error occurred";
      if (errorMessage === "An account with this email already exists.") {
        toast.error("An account with this email already exists.");
      } else if (error.response && error.response.data && error.response.data.message) {
        toast.error("Registration failed");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <HeaderC />
      <div className="signup-page font-sidebar text-lg">
        <div className="signup-form-container">
          <h2 className="text-2xl mb-4 text-center text-white font-bold">Sign Up</h2>
          <form onSubmit={regUser} className="signup-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="username" name="username" placeholder="Enter your username" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" placeholder="Enter your password" required />
            </div>
            {!isLoading && (<button type="submit" className="btn-primary">Sign Up</button>)}

            <div><p className='text-white text-center mt-4' >Already have an account?{' '} <Link to="/SignIn" className="underline"> Log in </Link> </p></div>
          </form>
        </div>
      </div>
      <FooterC />
    </div>
  )
}

export default SignUp
