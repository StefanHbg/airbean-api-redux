import React, { useState, useEffect } from 'react';
// redux
import { useDispatch } from 'react-redux';
import increaseProductQuantity from '../../redux/actions/increaseProductQuantity';
import decreaseProductQuantity from '../../redux/actions/decreaseProductQuantity';
import deleteProduct from '../../redux/actions/deleteProduct';
import increaseArrow from '../../assets/graphics/arrow-up.svg'
import decreaseArrow from '../../assets/graphics/arrow-down.svg'

import { useHistory } from 'react-router-dom';


function calcTotalPrice(array) {
    if (array === null) return 0;
    let price = 0;
    for (const product of array) {
        price += product.price;
        price *= product.quantity;
    }
    return price;
}

export default function CartModal() {

    const [localData, setLocalData] = useState([]);
    const [totalPrice, setTotalPrice] = useState('');
    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        const myCart = JSON.parse(localStorage.getItem('myCart'));
        setLocalData(myCart);
        setTotalPrice(calcTotalPrice(myCart));
    }, [])

    const handleIncreaseQuantity = (id) => {
        // loopa igenom localData och increaseProductQuantity på den och gör samma på den i localstorage
        for (const obj of localData) {
            if (obj.id === id) {
                obj.quantity++;
                dispatch(increaseProductQuantity(id));
            }
        }
        localStorage.setItem('myCart', JSON.stringify(localData));
        const myCart = JSON.parse(localStorage.getItem('myCart'));
        setLocalData(myCart);  
        setTotalPrice(calcTotalPrice(myCart));  
    }

    const handleDecreaseQuantity = (id) => {
        // If quantity is 0 then remove it from array
        for (const obj of localData) {
            if ((obj.id === id) && (obj.quantity !== 1)) {
                console.log('inne uppe');
                console.log(obj.quantity);
                obj.quantity--;
                dispatch(decreaseProductQuantity(id));
                localStorage.setItem('myCart', JSON.stringify(localData));
                const myCart = JSON.parse(localStorage.getItem('myCart'));
                setLocalData(myCart);  
                setTotalPrice(calcTotalPrice(myCart));
            } else if ((obj.id === id) && (obj.quantity === 1)) {
                console.log('inne');
                const index = localData.indexOf(obj);
                localData.splice(index, 1);
                dispatch(deleteProduct(id));
                localStorage.setItem('myCart', JSON.stringify(localData));
                setTotalPrice(calcTotalPrice(JSON.parse(localStorage.getItem('myCart'))));
            }
        }
    }


    return (
        <div className="modal-container">
            <h1 className="modal-heading">Din beställning</h1>
            <div>
                <div className="modal-products-container">
                    {((localData === null) || (localData === undefined)) ? null : 
                        <div>
                            {localData.map((data) => (
                                <div className="product-item" key={data.id}>
                                    <div className="product-menu-item">
                                        <div className="product-menu-item-container">
                                            <h3 className="product-item-title">{data.title}</h3>
                                            <div className="menu-list-divider-container">
                                                <hr className="menu-list-divider"/>
                                            </div>
                                        </div>
                                        <p className="product-item-price">{data.price} kr</p>
                                    </div>
                                    <div className="amount-arrows">
                                        <img src={increaseArrow} alt="arrow-up" className="increase-up-arrow" onClick={() => handleIncreaseQuantity(data.id)} />
                                        <p>{data.quantity}</p>
                                        <img src={decreaseArrow} alt="arrow-down" className="decrease-down-arrow" onClick={() => handleDecreaseQuantity(data.id)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    } 
                </div>
                <div className="total-amount-container">
                    <h3 className="total-label">Total</h3>
                    <div className="menu-list-divider-container">
                        <hr className="menu-list-divider"/>
                    </div>
                    <p className="total-price">{totalPrice} kr</p>
                </div>
                <p className="tax-shipping-label">inkl moms + drönarleverans</p>
                <div className="modal-btn-container">
                    <button onClick={() => history.push(`/status`)} className="modal-btn">Take my money!</button>
                </div>
            </div>
        </div>
    )
}
