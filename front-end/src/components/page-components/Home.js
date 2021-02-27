import React from 'react'
import { useHistory } from "react-router-dom";
import landingPageLogo from '../../assets/graphics/airbean-landing.svg';
import landingPageLeft from '../../assets/graphics/intro-graphic-left.svg';
import landingPageRight from '../../assets/graphics/intro-graphic-right.svg';

export default function Home() {

    const history = useHistory();

    return (
        <div className="page-container">  
            <div className="landing-page">
                <img alt="landing-page-left" src={landingPageLeft}></img>
                <img className="landing-page-logo" alt="landing-page-logo" src={landingPageLogo}></img>
                <img alt="landing-page-right" src={landingPageRight}></img>
            </div>
        </div>
    )
}
