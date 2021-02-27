import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'; 
import addProducts from '../../redux/actions/addProducts';
import CartIcon from '../element-components/CartIcon';
import graphicsHeader from '../../assets/graphics/graphics-header.svg';
import graphicsFooter from '../../assets/graphics/graphics-footer.svg';

export default function Menu() {

  const dispatch = useDispatch();
  const [menus, setMenus] = useState([]);

  useEffect(() => {
      fetch('http://localhost:5000/api/beans'
      ).then(
        (response) => {
          return response.json();
        }
      ).then(
        (data) => {
          console.log(data.menu);
          setMenus(data.menu);
          localStorage.setItem('myCart', JSON.stringify(data.menu));
        }
      )
    }, []);

    return (
        <div className="menu-container">
          <div className="heading-cart-styling">
            <img src={graphicsHeader}></img>
            <CartIcon />
          </div>
          <h1 className="menu-heading">Meny</h1>
            {menus.map((menu) => (
              <div onClick={() => dispatch(addProducts(menus[menu.id-1]))} key={menu.id}>
                <div className="menu-list">
                  <p className="menu-list-p-1">{menu.title}</p>
                  <p className="menu-list-p-2">{menu.price} kr</p>
                </div>
                <p>{menu.desc}</p>
              </div>
            ))}
            <img src={graphicsFooter}></img>
        </div>
    )
}
