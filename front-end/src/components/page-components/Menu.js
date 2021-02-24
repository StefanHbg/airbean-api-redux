import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'; 
import addProducts from '../../redux/actions/addProducts';
import CartIcon from '../element-components/CartIcon';

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
        <div>
          <h1>Meny</h1>
          <CartIcon />
            {menus.map((menu) => (
              <div onClick={() => dispatch(addProducts(menus[menu.id-1]))} key={menu.id}>
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
