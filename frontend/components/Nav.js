import Link from 'next/link';
import Logout from './Logout';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';
import { useCart } from '../lib/cartState';
import CartCount from './CartCount';

export default function Nav() {
  const user = useUser();
  const { toggleCart } = useCart();

  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <Logout />
          <button type="button" onClick={toggleCart}>
            My Cart
            <CartCount count={user.cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)} />
          </button>
        </>
      )}
      {!user && <Link href="/login">Sign In</Link>}
    </NavStyles>
  );
}
