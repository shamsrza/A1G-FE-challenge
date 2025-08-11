import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../cartItem/cartItem';
import { toggleStatusTab, clearCart } from '../../stores/cart';
import { useState, useEffect } from 'react';
import { fetchProducts } from '../../api/products';
import { Link } from 'react-router-dom';

import './cartTab.css';

const CartTab = () => {
  const carts = useSelector((store) => store.cart.items);
  const statusTab = useSelector((store) => store.cart.statusTab);
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const handleCloseTabCart = () => {
    dispatch(toggleStatusTab());
  };

  const handleOrder = (e) => {
    if (total > 0.0) {
      e.preventDefault();
      dispatch(clearCart());
      setProducts([]);
      setTotal(0);

      window.location.href = '/success';
    }
    dispatch(toggleStatusTab());
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const items = await fetchProducts();
        setProducts(items);
      } catch (err) {
        console.error(err);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (products.length === 0) return;

    const totalPrice = carts.reduce((sum, cartItem) => {
      const product = products.find(
        (p) => p.id === cartItem.productId && p.stock !== 0
      );
      return sum + (product ? product.price * cartItem.quantity : 0);
    }, 0);

    setTotal(totalPrice.toFixed(2));
  }, [carts, products]);

  return (
    <div className={`my_order_tab ${statusTab === false ? 'open_tab' : ''}`}>
      <div className='my_order_list'>
        <div>
          <button onClick={handleCloseTabCart}>x</button>
          <h2 className='my_order_tab_title'>My Order</h2>
        </div>
        <ul className='list-group'>
          {carts.map((item, key) => (
            <li key={key} className='list-group-item'>
              <CartItem key={key} data={item} />
            </li>
          ))}
        </ul>
      </div>

      <div className='cart_total'>
        <div className='cart_total_desc'>
          <p>Total</p>
          <p>${total}</p>
        </div>

        <Link className='custom_btn' onClick={handleOrder}>
          Order
        </Link>
      </div>
    </div>
  );
};

export default CartTab;
