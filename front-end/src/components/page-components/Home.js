import React from 'react'
import landingPageLogo from '../../assets/graphics/airbean-landing.svg';
import landingPageLeft from '../../assets/graphics/intro-graphic-left.svg';
import landingPageRight from '../../assets/graphics/intro-graphic-right.svg';

export default function Home() {

    return (
        <div className="page-container">  
            <div className="landing-page">
                <img alt="landing-page-left" src={landingPageLeft}></img>
                <img alt="landing-page-logo" className="landing-page-logo" src={landingPageLogo}></img>
                <img alt="landing-page-right" src={landingPageRight}></img>
            </div>
        </div>
    )
}
