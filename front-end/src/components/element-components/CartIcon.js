import { useState } from 'react';
import CartModal from './CartModal';

export default function CartIcon({ numInCart }) {

    const [displayCartModal, setDisplayCartModal] = useState(false);

    const toggleModal = () => displayCartModal ? setDisplayCartModal(false) : setDisplayCartModal(true)
    
    return (
        <div>
            <p>{numInCart}</p>
            <p onClick={toggleModal}>CART ICON</p>
            { displayCartModal ? <CartModal /> : null }
        </div>
    )
}