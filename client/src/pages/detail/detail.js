import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../../api/products';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, changeQuantity } from '../../stores/cart';
import './detail.css';
import CartItem from '../../components/cartItem/cartItem';

const Detail = () => {
  const dispatch = useDispatch();
  const carts = useSelector((store) => store.cart.items);

  const { id, slug, productId } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detail, setDetail] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const items = await fetchProducts();
        setProducts(items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (!products || products.length === 0) return;

    const findDetail = products.filter((product) => product.slug === slug);
    if (findDetail.length > 0) {
      setDetail(findDetail[0]);
    } else {
      setError('Product not found');
    }
  }, [slug, products]);

  if (loading) return <div>Loading product...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!detail) return <div>Product not found</div>;

  const quantityInCart =
    carts.find((item) => item.productId === detail.id)?.quantity || 0;

  // Calculate remaining stock after accounting for items already in cart
  const remainingStock = detail.stock - quantityInCart;

  // Check if user is trying to add more than what's available
  const exceedsRemainingStock = quantity > remainingStock;
  const isOutOfStock = detail.stock === 0;
  const canDecrease = quantity > 1;

  const handleMinusQuantity = () => {
    setQuantity(Math.max(1, quantity - 1));
  };

  const handlePlusQuantity = () => {
    // Only allow increasing if we don't exceed remaining stock
    if (detail && quantity < remainingStock) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    // Only add to cart if quantity doesn't exceed remaining stock
    if (detail && !exceedsRemainingStock && remainingStock > 0) {
      dispatch(
        addToCart({
          productId: detail.id || detail.productId,
          name: detail.name,
          price: detail.price,
          image: detail.image,
          stock: detail.stock,
          slug: detail.slug,
          quantity: quantity,
        })
      );
    }
  };

  return (
    <div className='product_detail'>
      <div className='product_detail_grid'>
        <div>
          {detail.image ? (
            <img src={detail.image} alt={detail.name || 'Product image'} />
          ) : (
            <div>No image available</div>
          )}
        </div>
        <div className='product_detail_description'>
          <h1>{detail.name || 'Product Name'}</h1>

          <div>
            <h6>Description:</h6>
            <p>
              {detail.description ||
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, consequuntur omnis repellat architecto nisi fugit deserunt hic! Nobis, illo commodi?'}
            </p>
          </div>
          <p className='product_detail_price'>
            ${Number(detail.price || 0).toFixed(2)}
          </p>

          <div className='quantity_btns'>
            <div className='quantity_btn_div'>
              <button
                onClick={handleMinusQuantity}
                disabled={!canDecrease || isOutOfStock}
                className={!canDecrease || isOutOfStock ? 'disabled' : ''}
              >
                -
              </button>
              <p className='quantity-display'>
                {isOutOfStock ? '0' : quantity}
              </p>
              <button
                onClick={handlePlusQuantity}
                disabled={quantity >= remainingStock || isOutOfStock}
                className={
                  quantity >= remainingStock || isOutOfStock ? 'disabled' : ''
                }
              >
                +
              </button>
            </div>
            <button
              className={`btn btn-outline-primary ${
                isOutOfStock || exceedsRemainingStock ? 'disabled' : ''
              }`}
              onClick={handleAddToCart}
              disabled={isOutOfStock || exceedsRemainingStock}
            >
              {isOutOfStock ? 'Out of Stock' : 'Add To Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
