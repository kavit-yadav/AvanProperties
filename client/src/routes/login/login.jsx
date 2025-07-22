import React from 'react';
import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {updateUser} = useContext(AuthContext)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");
    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });

      updateUser(res.data)

      navigate("/"); //navigate to home page
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }

  };
  return (
    <div className='login'>
        <div className='formContainer'>
            <form onSubmit={handleSubmit}>
                <h1>Welcome Back</h1>
                <div className='inputbox'>
                    <input name="username" required minLength={3} 
                        maxLength={20} type="text" placeholder="Username"/>
                    <FaUser className='icon'/>
                </div>
                 <div className='inputbox'>
                    <input name="password" type="password" required placeholder="Password"/>
                    <FaLock className='icon'/>
                </div>
                <button disabled={isLoading}>Login</button>
                  {error && <span>{error}</span>}
                {/*<div className='remforgot'>
                   // <label><input type='checkbox'/>Remember me</label>
                    //<a href='/'>Forgot password?</a>
                //</div>*/}
                <div className='signup'>
                    <Link to="/register">{"Don't"} you have an account?</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login;