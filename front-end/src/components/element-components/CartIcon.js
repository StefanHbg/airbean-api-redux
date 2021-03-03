import { useState, useEffect } from 'react';
import CartModal from './CartModal';
import cartIcon from '../../assets/graphics/bag.svg';

export default function CartIcon({ numInCart, setNumInCart }) {

    const [displayCartModal, setDisplayCartModal] = useState(false);
    const [displayAmountIcon, setDisplayAmountIcon] = useState(false);
    const [amountInCart, setAmountInCart] = useState('');

    // Our use effect listens to changes on the "numInCart" that were passed as a prop from menu.js
    useEffect(() => {
        if ((numInCart !== undefined) && (numInCart !== 0)) {
            setDisplayAmountIcon(true);
            setAmountInCart(numInCart);
        } else if (numInCart === 0) {
            setDisplayAmountIcon(false);
            setAmountInCart(numInCart);

        // when a user refreshes the site and our localStorage is populated 
        // the numInCart will be undefined and we check if the array length is not 0
        // If this is true we want to display the amount icon and update our amountInCart with the amount from the localStorage
        } else if ((numInCart === undefined) && (JSON.parse(localStorage.getItem('myCart'))) !== null && (JSON.parse(localStorage.getItem('myCart')).length !== 0) ) {
            setDisplayAmountIcon(true);
            setAmountInCart(JSON.parse(localStorage.getItem('myCart')).length)
        }
    }, [numInCart])

    // logic for our toggle functionality for the modal
    const toggleModal = () => displayCartModal ? setDisplayCartModal(false) : setDisplayCartModal(true);
    
    return (
        <div>
            <div key={numInCart} className="cart-icon-wrapper" onClick={toggleModal}>
                {displayAmountIcon ? 
                    <p className="cart-icon-amount">{amountInCart}</p> : null
                }
                <div className="cart-icon-container">
                    <img alt="cart-icon-img" src={cartIcon} className="cart-icon"></img>
                </div>
            </div>
            { displayCartModal ? <CartModal setNumInCart={setNumInCart} /> : null }
        </div>
    )
}