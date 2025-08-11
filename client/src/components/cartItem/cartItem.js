import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../../api/products';
import { useDispatch } from 'react-redux';
import { changeQuantity } from '../../stores/cart';
import './cartItem.css';

const CartItem = (props) => {
  const { productId, quantity } = props.data;
  const [products, setProducts] = useState([]);
  const [detail, setDetail] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const items = await fetchProducts();
        setProducts(items);
      } catch (err) {
        console.log(err);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (!products || products.length === 0) return;
    const findDetail = products.filter(
      (product) => product.id === productId
    )[0];
    setDetail(findDetail);
  }, [productId, products]);

  // Check stock availability
  const isOutOfStock = detail?.stock === 0;
  const hasReachedMaxStock = quantity >= (detail?.stock || 0);
  const canDecrease = quantity > 0;

  const handleMinusQuantity = () => {
    if (canDecrease) {
      dispatch(
        changeQuantity({
          productId: productId,
          quantity: quantity - 1,
        })
      );
    }
  };

  const handlePlusQuantity = () => {
    if (!hasReachedMaxStock) {
      dispatch(
        changeQuantity({
          productId: productId,
          quantity: quantity + 1,
        })
      );
    }
  };

  return (
    <div
      // style={{ position: 'relative' }}
      className={`cart_item_container ${isOutOfStock ? 'out-of-stock' : ''}`}
    >
      {isOutOfStock && <div className='stock_overlay'></div>}
      <div className='cart_item'>
        <div className='cart_item_image'>
          <img src={detail.image} alt={detail.name} />
        </div>

        <div className='cart_item_details'>
          <h3 className='cart_item_name'>{detail.name}</h3>
          <p className='cart_item_price'>
            ${(detail.price * quantity).toFixed(2)}
          </p>
        </div>

        <div className='cart_item_btns'>
          <p className='quantity-display'>{isOutOfStock ? '0' : quantity}</p>
          <button
            onClick={handleMinusQuantity}
            disabled={!canDecrease}
            className={!canDecrease ? 'disabled' : ''}
          >
            -
          </button>
          <button
            onClick={handlePlusQuantity}
            disabled={hasReachedMaxStock}
            className={hasReachedMaxStock ? 'disabled' : ''}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
