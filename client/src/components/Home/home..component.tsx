// declare module "*.png";
import React, { useState, useRef } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import './home.component.css'
import logo from './logo.jpg'
import TempLogo from './tempLogo'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const options = [
    'קורס', 'two', 'three'
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
                    <TempLogo />
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
                <img src={logo} style={{ width: "80%", height: "100%" }}></img>
            </div>
            <div className="search-container">
                <input type="text" className="search-text" ></input>
                <div className="vl"></div>
                <Dropdown controlClassName='search-dropdown-control' className="search-dropdown" options={options} onChange={() => { }} value={options[0]} placeholder="Select an option" />
            </div>
        </div >

    )
}

export default HomePage;