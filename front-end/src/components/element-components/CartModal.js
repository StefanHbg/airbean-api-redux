import React, { useState, useEffect } from 'react';
// redux
import { useDispatch } from 'react-redux';
import increaseProductQuantity from '../../redux/actions/increaseProductQuantity';
import decreaseProductQuantity from '../../redux/actions/decreaseProductQuantity';

export default function CartModal() {

    const [localData, setLocalData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        setLocalData(JSON.parse(localStorage.getItem('myCart')));
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
        setLocalData(JSON.parse(localStorage.getItem('myCart')));    
    }

    const handleDecreaseQuantity = (id) => {
        for (const obj of localData) {
            if (obj.id === id) {
                obj.quantity--;
                dispatch(decreaseProductQuantity(id));
            }
        }
        localStorage.setItem('myCart', JSON.stringify(localData));
        setLocalData(JSON.parse(localStorage.getItem('myCart')));
    }

    return (
        <div>
            <h1>Din beställning</h1>
            <div>
                {((localData === null) || (localData === undefined)) ? null : 
                    <div>
                        {localData.map((data) => (
                            <div key={data.id} style={productItem}>
                                <div>
                                    <h3>{data.title}</h3>
                                    <p>{data.price}</p>
                                </div>
                                <div>
                                    <hr/>
                                </div>
                                <div>
                                    <i onClick={() => handleIncreaseQuantity(data.id)}>↑</i>
                                    <p>{data.quantity}</p>
                                    <i onClick={() => handleDecreaseQuantity(data.id)}>↓</i>
                                </div>
                            </div>
                        ))}
                    </div>
                } 
                <div>
                    <h3>Total</h3>
                    <p>200KR</p>
                </div>
                <p>inkl moms + drönarleverans</p>
                <button>Take my money!</button>
            </div>
        </div>
    )
}

const productItem = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px'
}