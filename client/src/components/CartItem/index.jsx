import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../utils/redux/freelancersSlice';
import { idbPromise } from '../../utils/helpers';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const removeItem = () => {
    dispatch(removeFromCart(item));
    idbPromise('cart', 'delete', { ...item });
  };

  return (
    <div className="cart-item">
      <div>
        <img src={item.image} alt={item.name} />
      </div>
      <div>
        <div>{item.name}</div>
        <div>${item.price}</div>
        <div>
          <span>Qty: {item.purchaseQuantity}</span>
          <span
            role="img"
            aria-label="trash"
            onClick={removeItem}
            style={{ cursor: 'pointer' }}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
