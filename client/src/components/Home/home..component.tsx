// declare module "*.png";
import React, { useState, useRef } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import './home.component.css'
import MascotOwl from './MascotOwl.png'
import Logo from './Logo.png'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import ReactComponent from './Logo black.svg';

const options = [
    'קורס', 'אוניברסיטה', 'מרצה'
];


type Props = {}

const HomePage: React.FC<Props> = () => {
    const navigate: NavigateFunction = useNavigate();

    return (

        <div id="home-page">
            <div className="top-bar">
                <div className="link">החזון שלנו</div>
                <div className="link">עמוד בית</div>
                <div className="logo">
                    <img src={Logo} style={{ width: "30%", height: "60%" }}></img>
                </div>
            </div>
            <div className="title">
                רוצים להשפיע?
            </div>
            <div className="sub-title">
                <span>
                    שתפו אותנו בחוויה הסטודנטיאלית שלכם,
                </span>
                <span>
                    אנחנו נעשה את השאר.
                </span>
            </div>
            <div className="home-img">
                <img src={MascotOwl} style={{ width: "40%", height: "100%" }}></img>
            </div>
            <div className="search-div-container">
                <div className="search-container">
                    <input type="text" placeholder="חפש/י" className="search-text" ></input>
                    <div className="vl"></div>
                    <Dropdown arrowClassName="search-dropdown-arrow" controlClassName='search-dropdown-control' className="search-dropdown" options={options} onChange={() => { }} value={options[0]} placeholder="Select an option" />
                </div>
                <div className="search-button-container">
                    <div className="search-button">חפש/י</div>
                </div>
            </div>
            <div className="sub-sub-title">
                <span>
                    אם אתם מחפשים את הקורס המתאים לכם או מרצה איכותי שיכול לעזור לכם לצמוח ולהתפתח,
                </span>
                <span>
                    אתם במקום הנכון. הצטרפו לקהילת החברים שלנו ותוכלו לדרג ולהמליץ על קורסים ומרצים מהניסיון
                </span>
                <span>
                    שלכם. הצטרפו עכשיו ותהיו חלק מהמהפכה!
                </span>
            </div>
        </div >

    )
}

export default HomePage;