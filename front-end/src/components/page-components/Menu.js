import { useEffect, useState } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux'; 
import addProduct from '../../redux/actions/addProduct';
import deleteProduct from '../../redux/actions/deleteProduct';
import increaseProductQuantity from '../../redux/actions/increaseProductQuantity';
import decreaseProductQuantity from '../../redux/actions/decreaseProductQuantity';

import CartIcon from '../element-components/CartIcon';

export default function Menu() {

    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const [menus, setMenus] = useState([]);
    const [numProductsInCart, setNumProductsInCart] = useState();

    useEffect(() => {
        fetch('http://localhost:5000/api/beans')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data.menu);
                for (const obj of data.menu) {
                    obj.quantity = 0;
                }
                setMenus(data.menu);
            }
        )
        // när vi reloadar ska vi kolla om det finns nått i localstorage 
        // om det finns är det de vi vill lägga till i vår redux 
        if (localStorage.getItem('myCart') !== null) {
            dispatch(addProduct(JSON.parse(localStorage.getItem('myCart')))); 
        }
        // eslint-disable-next-line
    }, []);

    const handleClickedProduct = (id) => {
        let foundProduct = false;
        for (const obj of products) {
            if (obj.id === id) {
                foundProduct = true;
            }
        }
        if (foundProduct) {
            // If our product was found in our redux state, we decrease the quantity to 0 then we delete it.
            // we also delete it from our localStorage.
            dispatch(decreaseProductQuantity(id));
            dispatch(deleteProduct(id));
            const getLocalCart = JSON.parse(localStorage.getItem('myCart'));
            const removedProductArr = JSON.stringify(getLocalCart.filter((obj) => obj.id !== id));
            localStorage.setItem('myCart', removedProductArr);
            setNumProductsInCart(JSON.parse(localStorage.getItem('myCart')).length);
        } else {
            // If our product was not found in our redux state, we add it then increase its quantity to 1.
            // we also add it to localStorage.
            dispatch(addProduct(menus[id-1]));
            dispatch(increaseProductQuantity(id));
            if (localStorage.getItem('myCart') === null) {
                localStorage.setItem('myCart', JSON.stringify([menus[id-1]]));
                setNumProductsInCart(JSON.parse(localStorage.getItem('myCart')).length);
            } else {
                localStorage.setItem('myCart', JSON.stringify([...JSON.parse(localStorage.getItem('myCart')), menus[id-1]]));
                setNumProductsInCart(JSON.parse(localStorage.getItem('myCart')).length);
            }
        }
    }

    return (
            <div>
            <h1>Meny</h1>
            <CartIcon numInCart={numProductsInCart} />
                {menus.map((menu) => (
                <div key={menu.id} style={{border: '1px solid red'}}>
                    <div>
                        <i onClick={() => handleClickedProduct(menu.id)}>+</i>
                    </div>
                    <div>
                        <p>{menu.title}</p>
                        <p>{menu.price}</p>
                    </div>
                    <p>{menu.desc}</p>
                </div>
                ))}
            </div>
    )
}
