// declare module "*.png";
import React, { useState, useRef } from "react";
import './login.component.css'
import logo from './logo.jpg'



const Login = () => {

    return (

        <div id="login-page">
            <div className="login-container">
                <div className="login-card">
                    <div className="title">Welcome back</div>
                    <div className="sub-title"> Welcome back! Please enter your details </div>

                    <label>Username:</label>
                    <input type="text" id="username" name="username" />
                    <label>Password:</label>
                    <input type="password" id="pwd" name="pwd" />
                    <div className="login-options">
                        <input type="checkbox" />
                        <label>Remember for 30 days</label>
                        <div className="forgot-password-container">
                            <a href="#">Forgot password</a>
                        </div>
                    </div>
                    <div className="button-container">
                        <button type="button" onClick={() => alert(2)} className="signin-button">Sign in</button>
                        <div className="signup-link">Don't have an account? <span><a href="#">Sign up</a></span></div>
                    </div>
                </div>
            </div>
            <div className="logo-container">
                <img src={logo} />
            </div>
        </div>

    )
}

export default Login