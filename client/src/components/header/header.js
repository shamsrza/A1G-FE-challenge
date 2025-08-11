import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import iconCart from '../../assets/images/shopping.png';
import { useSelector, useDispatch } from 'react-redux';

import './header.css';
import { toggleStatusTab } from '../../stores/cart';

const Header = () => {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const carts = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  useEffect(() => {
    let total = 0;
    carts.forEach((item) => (total += item.quantity));
    setTotalQuantity(total);
  }, [carts]);

  const handleOpenTabCart = () => {
    dispatch(toggleStatusTab({}));
  };
  return (
    <header>
      <Link to='/' className='header-logo-link'>
        Home.
      </Link>
      <div className='header-container' onClick={handleOpenTabCart}>
        <img src={iconCart} alt='' className='cart-img' />
        <span className='cart-notification'>{totalQuantity}</span>
      </div>
    </header>
  );
};
export default Header;
