import { Link } from 'react-router-dom';
import './productCard.css';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../stores/cart';

const ProductCard = (props) => {
  const carts = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const { id, name, price, image, slug, stock } = props.data;

  const cartItem = carts.find((item) => item.productId === id);
  const currentQuantityInCart = cartItem ? cartItem.quantity : 0;

  // Stock checks
  const isOutOfStock = stock === 0;
  const hasReachedMaxStock = currentQuantityInCart >= stock && !isOutOfStock;
  const isOutOfStockItemAlreadyInCart = isOutOfStock && cartItem; // Check if out-of-stock item is already in cart

  const handleAddToCart = () => {
    if (isOutOfStock) {
      if (!isOutOfStockItemAlreadyInCart) {
        dispatch(
          addToCart({
            productId: id,
            name: name,
            price: price,
            image: image,
            slug: slug,
            stock: stock,
            quantity: 1, // Always add only 1 for out-of-stock items
            isOutOfStock: true, // Flag for cart visibility
          })
        );
      }
    } else {
      if (!hasReachedMaxStock) {
        dispatch(
          addToCart({
            productId: id,
            name: name,
            price: price,
            image: image,
            slug: slug,
            stock: stock,
            quantity: 1,
            isOutOfStock: false,
          })
        );
      }
    }
  };

  const getButtonText = () => {
    if (isOutOfStock) {
      return isOutOfStockItemAlreadyInCart ? 'Out of Stock' : 'Add To Cart';
    }
    if (hasReachedMaxStock) {
      return 'Out of Stock';
    }
    return 'Add To Cart';
  };

  const shouldDisableButton = () => {
    // Disable if:
    // 1. Out-of-stock item is already in cart, OR
    // 2. In-stock item has reached max stock
    return isOutOfStockItemAlreadyInCart || hasReachedMaxStock;
  };

  return (
    <div className='card product_card'>
      <Link to={slug} className='product_card_img'>
        <img src={image} className='card-img-top' alt='' />
      </Link>
      <div className='card-body product_card_body'>
        <h5 className='card-title'>{name}</h5>
        <div className='product_card_desc'>
          <p className='card-text' style={{ margin: 0 }}>
            ${price.toFixed(2)}
          </p>
          <button
            onClick={handleAddToCart}
            disabled={shouldDisableButton()}
            className={`btn btn-primary ${
              shouldDisableButton() ? 'disabled' : ''
            } ${isOutOfStock ? 'out-of-stock-btn' : ''}`}
          >
            {getButtonText()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
