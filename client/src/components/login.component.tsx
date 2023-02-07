// declare module "*.png";
import React, { useState, useRef } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import './login.component.css'
import logo from './logo.jpg'
import authService from '../services/auth.service'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup"

type Props = {}

const Login: React.FC<Props> = () => {
    const navigate: NavigateFunction = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = (formValue: { username: string; password: string }) => {
        const { username, password } = formValue;
        console.log(username)
        console.log(password)

        setMessage("");
        setLoading(true);

        authService.login(username, password).then(
            (res) => {
                navigate("/profile");
                window.location.reload();
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setLoading(false);
                setMessage(resMessage);
            }
        );
    };

    return (

        <div id="login-page">
            <div className="login-container">
                <div className="login-card">
                    <div className="login-fields">
                        <div className="title">Welcome back</div>
                        <div className="sub-title"> Welcome back! Please enter your details </div>

                        <label>Username:</label>
                        <input onChange={(e) => setUsername(e.target.value)} type="text" id="username" name="username" />

                        <label>Password:</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" id="pwd" name="pwd" />

                    </div>
                    <div className="login-options">
                        <input type="checkbox" />
                        <label>Remember for 30 days</label>
                        <div className="forgot-password-container">
                            <a href="#">Forgot password</a>
                        </div>
                    </div>
                    <div className="button-container">
                        <button type="button" onClick={() => handleLogin({ username, password })} className="signin-button">Sign in</button>
                        <div className="signup-link">Don't have an account? <span><a href="#">Sign up</a></span></div>
                    </div>
                    {(loading) ? <div className="lds-ring"><div></div></div> : null}
                    {(message != "") ? <div className="loading-message">{message}</div> : null}
                </div>
            </div>
            <div className="logo-container">
                <img src={logo} />
            </div>
        </div >

    )
}

export default Login