import { useState } from 'react'
import CartModal from './CartModal';

function CartIcon() {

    const [displayCartModal, setDisplayCartModal] = useState(false);

    return (
        <div>
            <p onClick={() => setDisplayCartModal(true)}>CART ICON</p>
            { displayCartModal ? <CartModal closeModal={ () => setDisplayCartModal(false) }/> : null }
        </div>
    )
}

export default CartIcon;
