import CloseNav from './CloseNav';
import { Link, useLocation } from "react-router-dom";

export default function Menu({ closeMenu }) {

    const location = useLocation();

    // our logic that checks if we click on the same page that we already are on.
    // if this is the case (true) we need to close our menu modal because it doesn't happen by itself. 
    const handleClick = (e) => {
        if ((e.target.textContent === 'Meny') && (location.pathname === '/menu')) {
            closeMenu();
        } else if ((e.target.textContent === 'Vårt kaffe') && (location.pathname === '/about')) {
            closeMenu();
        }
    }

    return (
        <div className="menu-modal-wrapper">
            <CloseNav closeMenu={closeMenu}/>
            <div className="menu-modal">
                <Link to='/menu' className="nav-link" onClick={(e) => handleClick(e)}>Meny</Link>
                <hr className="link-divider" />
                <Link to='/about' className="nav-link" onClick={(e) => handleClick(e)}>Vårt kaffe</Link>
                <hr className="link-divider" />
            </div>
        </div>
    )
}