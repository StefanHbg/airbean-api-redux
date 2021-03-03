import { useEffect, useState } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux'; 
import addProduct from '../../redux/actions/addProduct';
import deleteProduct from '../../redux/actions/deleteProduct';
import increaseProductQuantity from '../../redux/actions/increaseProductQuantity';
import decreaseProductQuantity from '../../redux/actions/decreaseProductQuantity';

import CartIcon from '../element-components/CartIcon';

// css (även flyttat assets folder till front-end src)
import addIcon from '../../assets/graphics/add.svg';


export default function Menu() {

    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const [menus, setMenus] = useState([]);
    const [numProductsInCart, setNumProductsInCart] = useState();
    const [displayMinusIcon, setDisplayMinusIcon] = useState(false);

    useEffect(() => {
        // Vi måste ha logik som kollar när vi reloadar så ska det jag mappar ur veta vad den har för quantity
        fetch('http://localhost:5000/api/beans')
            .then((response) => response.json())
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
            const myCart = JSON.parse(localStorage.getItem('myCart'));
            dispatch(addProduct(myCart));
            //console.log('menus', menus);
            //console.log('myCart', myCart);
            for (let i = 0; i < myCart.length; i++) {
                for (let j = 0; j < menus.length; j++) {
                    if (myCart[i].id === menus[j].id) {
                        const localStorageQuanity = myCart[i].quantity;
                        menus[j].quantity = localStorageQuanity;
                    } else if (myCart[i] === undefined) {
                        menus[j].quantity--;
                    }
                }
            }
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const myCart = JSON.parse(localStorage.getItem('myCart'));
        if ((localStorage.getItem('myCart') !== null) && (myCart.length !== 0)) {
            //dispatch(addProduct(myCart));
            console.log('menus', menus);
            console.log('myCart', myCart);
            for (let i = 0; i < myCart.length; i++) {
                for (let j = 0; j < menus.length; j++) {
                    if (myCart[i].id === menus[j].id) {
                        const localStorageQuanity = myCart[i].quantity;
                        // console.log('localStorageQuanity', localStorageQuanity);
                        menus[j].quantity = localStorageQuanity;
                    }
                }
            }
        } else {
            let menuArr = Object.assign([], menus);
            for (const obj of menuArr) {
                obj.quantity = 0;
            }
            setMenus(menuArr);
        }
        // eslint-disable-next-line
    }, [products])

    const handleClickedProduct = (id) => {
        let foundProduct = false;
        for (const obj of products) {
            if (obj.id === id) {
                foundProduct = true;
            }
        }
        if (foundProduct) {
            // If our product was found in our redux state, we decrease the quantity to 0 then we delete it.
            dispatch(decreaseProductQuantity(id));
            dispatch(deleteProduct(id));
            // we also delete it from our localStorage.
            const getLocalCart = JSON.parse(localStorage.getItem('myCart'));
            const removedProductArr = JSON.stringify(getLocalCart.filter((obj) => obj.id !== id));
            localStorage.setItem('myCart', removedProductArr);
            setNumProductsInCart(JSON.parse(localStorage.getItem('myCart')).length);
            //setDisplayMinusIcon(false);
        } else {
            // If our product was not found in our redux state, we add it then increase its quantity to 1.
            dispatch(addProduct(menus[id-1]));
            dispatch(increaseProductQuantity(id));
            // we also add it to localStorage.
            if (localStorage.getItem('myCart') === null) {
                localStorage.setItem('myCart', JSON.stringify([menus[id-1]]));
                setNumProductsInCart(JSON.parse(localStorage.getItem('myCart')).length);
            } else {
                localStorage.setItem('myCart', JSON.stringify([...JSON.parse(localStorage.getItem('myCart')), menus[id-1]]));
                setNumProductsInCart(JSON.parse(localStorage.getItem('myCart')).length);
            }
            //setDisplayMinusIcon(true);
        }
    }

    return (
        <div className="menu-container">
            <header className="heading-cart-styling">
                <div className="header-hamburger-container">
                    MENU
                </div>
                <div className="header-cart-icon-container">
                    <CartIcon numInCart={numProductsInCart} />
                </div>
            </header>
            <h1 className="menu-heading">Meny</h1>
            <main className="menu-wrapper">
                {menus.map((menu) => (
                <section className="product-container" key={menu.id}>
                    <div className="add-to-cart-container">
                        <div onClick={() => handleClickedProduct(menu.id)} className="add-to-cart-btn">
                    
                            {(menu.quantity !== 0) ? 
                                <p className="add-to-cart-btn-text remove-from-cart">-</p>
                            :
                                <img alt="add-icon-svg" src={addIcon} className="add-to-cart-btn-text" />
                            }
                        </div>
                    </div>
                    <div className="menu-list-container">
                        <div className="menu-list">
                            <p className="menu-list-title">{menu.title}</p>
                            <div className="menu-list-divider-container">
                                <hr className="menu-list-divider"/>
                            </div>
                            <p className="menu-list-price">{menu.price} kr</p>
                        </div>
                        <p className="menu-list-description">{menu.desc}</p>
                    </div>
                </section>
                ))}
            </main>
        </div>
    )
}


/*
Vi vill lägga ett nytt state i vår redux. ModalOpen -> true/false

- i vår menu.js comp så vill vi hämta vårt state value ModalOpen från redux som först ska vara false.
- i vår useEffect i menu.js så vill vi spara in den local i menu.js via useState.
- när man klickar på cartIcon så ska den togglas till true.
- detta ska in i menu.js -> {localStateModalOpen ? <bgOverlay /> : null} 
- när den är true och om man klickar sen på <bgOverlay /> så ska ModalOpen bli false och den ska stängas. 
- Vi måste nog skicka ner props till CartIcon om ModalOpen -> true/false

*/