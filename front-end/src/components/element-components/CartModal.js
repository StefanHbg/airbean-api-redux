import React, { useState, useEffect } from 'react';
import CartIcon from '../element-components/CartIcon';

export default function CartModal({ closeModal }) {

    const [localData, setLocalData] = useState([]);
    
    useEffect(() => {
        setLocalData(JSON.parse(localStorage.getItem('myCart')));
    }, [])

    return (
        <div>
            <h1>Din beställning</h1>
            <i onClick={() => closeModal()}>X</i>
            <div>
                {localData.map((data) => (
                    <div key={data.id}>
                        <div>
                            <h3>{data.title}</h3>
                            <p>{data.price}</p>
                        </div>
                        <div>
                            <hr/>
                        </div>
                        <div>
                            antal
                        </div>
                    </div>
                ))}
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
