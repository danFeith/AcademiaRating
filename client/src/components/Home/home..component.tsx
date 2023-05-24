// declare module "*.png";
import React, { useCallback, useEffect, useState } from "react";
import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { getList } from "../../services/api";
import Logo from './Logo.png';
import MascotOwl from './MascotOwl.png';
import './home.component.css';


type Props = {}
type SearchOption = { id: number, name: string }

const HomePage: React.FC<Props> = () => {
    const navigate: NavigateFunction = useNavigate();
    const [options, setOptions] = useState(['קורס', 'אוניברסיטה', 'מרצה', 'תואר'])
    const [chosenOption, setChosenOption] = useState('אוניברסיטה')
    const [searchContent, setSearchContent] = useState('')
    const [filterdOptions, setFilteredOptions] = useState([])
    const [displayFilteredOptions, setDisplayFilteredOptions] = useState([])
    const [isTxtOptionsOpen, setIsTxtOptionsOpen] = useState(false)

    const optionToRequestPathDict: { [Key: string]: string } = {
        'קורס': "courses",
        'תואר': "degrees",
        'מרצה': "lecturers",
        'אוניברסיטה': "institution"

    }

    const getListByOption = async (option: string) => {
        return (await getList(option)).data
    }

    const initSearchOptions = (currentOption: string) => {
        getListByOption(optionToRequestPathDict[currentOption]).then(data => {
            setFilteredOptions(data)
            setDisplayFilteredOptions(data)
        }).catch((err) => {
            alert(err)
        })
    }


    useEffect(() => {
        initSearchOptions(chosenOption)
    }, [])


    useEffect(() => {
        initSearchOptions(chosenOption)
    }, [chosenOption])

    useEffect(() => {
        setDisplayFilteredOptions(filterdOptions.filter((opt: SearchOption) => opt.name.includes(searchContent)))
    }, [searchContent])


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
                <img src={MascotOwl} onClick={() => alert(123)} style={{ width: "40%", height: "100%" }}></img>
            </div>
            <div className="search-div-container">
                <div className="search-container" style={{ borderBottomRightRadius: (isTxtOptionsOpen) ? 0 : '20px' }}>
                    <input type="text" placeholder="חפש/י"
                        style={{ borderBottomRightRadius: (isTxtOptionsOpen) ? 0 : '20px' }}
                        className="search-text" onBlur={() => setIsTxtOptionsOpen(false)} onFocus={() => setIsTxtOptionsOpen(true)}
                        onChange={(e) => setSearchContent(e.target.value)}
                        value={searchContent}></input>
                    <div className="vl"></div>
                    <Dropdown arrowClassName="search-dropdown-arrow" controlClassName='search-dropdown-control'
                        className="search-dropdown" options={options} onChange={(p: Option) => {
                            setChosenOption(p.value);
                        }} value={chosenOption} placeholder="Select an option" />
                </div>
                <div className="search-button-container">
                    <div className="search-button">חפש/י</div>
                </div>
            </div>
            {(isTxtOptionsOpen) ? <div className="text-search-options">
                {
                    displayFilteredOptions.map((opt: SearchOption) => {
                        return <div className="option-row" key={opt.id} onClick={() => { alert(1); }}  >{opt.name}</div>
                    })
                }

            </div> : null}
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