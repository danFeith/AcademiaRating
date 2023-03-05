// declare module "*.png";
import React, { useState, useRef } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import './home.component.css'
import { Props } from "../../types/types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faSearch } from '@fortawesome/free-solid-svg-icons'

const HomePage: React.FC<Props> = () => {
    const navigate: NavigateFunction = useNavigate();

    return (

        <div id="home-page">
            <div className="top-bar">
                <div className="register-button">הרשמה</div>
                <div className="login-button" onClick={() => navigate("/login")}>התחברות</div>
            </div>
            <div className="opener">
                <div className="title">למצוא את המסלול הנכון בשבילי</div>
                <div className="search-bar">
                    <div className="right-side">
                        <FontAwesomeIcon className="search-icon" icon={faSearch} size="2x" color="rgba(0, 0, 0, 0.35)" />
                        <input className="search-input" placeholder="חפש" type="text"></input>
                    </div>
                    <div className="vl"></div>
                    <div className="left-side">
                        מוסד לימודים
                        <FontAwesomeIcon className="search-icon" icon={faCaretDown} size="1x" />
                    </div>
                </div>
            </div>
            <div className="info">
                <p className="info-txt">
                    הקהילה שלנו נועדה כדי לעזור לכם לבחור את הדרך הנכונה. אם אתם מחפשים את הקורס המתאים לכם או מרצה איכותי שיכול לעזור לכם לצמוח ולהתפתח, אתם במקום הנכון. הצטרפו לקהילת החברים שלנו ותוכלו לדרג ולהמליץ על קורסים ומרצים מהניסיון שלכם. הצטרפו עכשיו ותהיו חלק מהמהפכה!
                </p>
            </div>
            <div className="cards-container">
                <div className="card">
                    <p className="card-text">
                        מידע על מוסדות החינוך, חוות דעת  על קורסים ומרצים
                    </p>
                </div>
                <div className="vl"></div>
                <div className="card">
                    <p className="card-text">
                        הביקורות שלכם תמיד נשארות אנונימיות
                    </p>
                </div>
                <div className="vl"></div>
                <div className="card">
                    <p className="card-text">
                        ערכו תגובות, דווחו על מידע שגוי ודרגו את התגובות שאהבתם
                        הביקורות שלכם תמיד נשארות אנונימיות
                    </p>
                </div>
            </div>
            <div className="join-container">
                <div className="join-button">
                    הצטרפו עכשיו
                </div>
            </div>
        </div >

    )

}
export default HomePage;