import {useState} from 'react'
import './SignUp.css';
import HeaderC from '../Components/HeaderC/HeaderC';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import FooterC from '../Components/FooterC/FooterC';

const SignUp = () => {

  const[name, setName] = useState("")
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  



  const regUser = async(e) =>{
    e.preventDefault();
    if(name === "" || email === "" || password === ""){
      alert('Please fill out all inputs');
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:3000/api/users",{name:name, email:email, password:password})
      toast.success(`Sucessfully Registered`);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
      
    }
  } 

  
  return (
    <div>
      <HeaderC />
      <div className="signup-page font-sidebar text-lg">
        <div className="signup-form-container">
          <h2 className="text-2xl mb-4 text-center text-white font-bold">Sign Up</h2>
          <form onSubmit={regUser} className="signup-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" value={name} onChange={(e)=>setName(e.target.value)} id="username" name="username" placeholder="Enter your username" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="email" name="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="password" name="password" placeholder="Enter your password" required />
            </div>
            {!isLoading && (<button type="submit" className="btn-primary">Sign Up</button> )}
            
            <div><p className='text-white text-center mt-4' >Already have an account?{' '} <Link to="/SignIn" className="underline"> Log in </Link> </p></div>
          </form>
        </div>
      </div>
      <FooterC/>
    </div>
  )
}

export default SignUp
