import { useHistory } from 'react-router-dom';
import landingPageLogo from '../../assets/graphics/airbean-landing.svg';
import landingPageLeft from '../../assets/graphics/intro-graphic-left.svg';
import landingPageRight from '../../assets/graphics/intro-graphic-right.svg';

export default function Home() {

    const history = useHistory();

    return (
        <div onClick={() => history.push('/menu')} className="page-container">  
            <div className="landing-page">
                <img className="svg-left" alt="landing-page-left" src={landingPageLeft}></img>
                <img alt="landing-page-logo" className="landing-page-logo" src={landingPageLogo}></img>
                <img className="svg-right" alt="landing-page-right" src={landingPageRight}></img>
            </div>
        </div>
    )
}
